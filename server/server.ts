// ─── BharatSetu OTP Auth Server ─────────────────────────────────
// Real SMS OTP via Twilio / Fast2SMS / MSG91
// Run: npm run server
// ─────────────────────────────────────────────────────────────────

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.VITE_OTP_SERVER_PORT || 5000;

// ─── Config ──────────────────────────────────────────────────────
const SMS_PROVIDER = process.env.SMS_PROVIDER || 'twilio'; // 'twilio' | 'fast2sms' | 'console'
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;
const MAX_SENDS_PER_PHONE = 3; // per 10 min window

// Twilio config
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER || '';

// Fast2SMS config (popular Indian SMS gateway — cheaper for India)
const FAST2SMS_KEY = process.env.FAST2SMS_API_KEY || '';

// ─── In-memory OTP store (use Redis/DB in production) ────────────
interface OTPRecord {
  hash: string;
  phone: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
}

interface SendTracker {
  count: number;
  windowStart: number;
}

const otpStore = new Map<string, OTPRecord>();
const sendTracker = new Map<string, SendTracker>();

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Rate limiting: 20 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ─── Helpers ─────────────────────────────────────────────────────
function generateOTP(): string {
  // Cryptographically secure 6-digit OTP
  return crypto.randomInt(100000, 999999).toString();
}

function hashOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

function validatePhone(phone: string): boolean {
  // Indian 10-digit mobile number
  return /^[6-9]\d{9}$/.test(phone);
}

function checkSendLimit(phone: string): boolean {
  const now = Date.now();
  const tracker = sendTracker.get(phone);

  if (!tracker || (now - tracker.windowStart) > 10 * 60 * 1000) {
    // New window
    sendTracker.set(phone, { count: 1, windowStart: now });
    return true;
  }

  if (tracker.count >= MAX_SENDS_PER_PHONE) {
    return false;
  }

  tracker.count++;
  return true;
}

// ─── SMS Senders ─────────────────────────────────────────────────
async function sendSMS(phone: string, otp: string): Promise<boolean> {
  const message = `Your BharatSetu verification code is: ${otp}. Valid for 10 minutes. Do not share this code.`;

  switch (SMS_PROVIDER) {
    case 'twilio':
      return sendViaTwilio(phone, message);
    case 'fast2sms':
      return sendViaFast2SMS(phone, otp);
    case 'console':
    default:
      return sendViaConsole(phone, otp);
  }
}

async function sendViaTwilio(phone: string, message: string): Promise<boolean> {
  if (!TWILIO_SID || !TWILIO_AUTH || !TWILIO_PHONE) {
    console.error('❌ Twilio credentials not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER');
    console.log('💡 Falling back to console mode...');
    return false;
  }

  try {
    // Dynamic import to avoid requiring twilio when not in use
    const twilio = await import('twilio');
    const client = twilio.default(TWILIO_SID, TWILIO_AUTH);

    await client.messages.create({
      body: message,
      from: TWILIO_PHONE,
      to: `+91${phone}`,
    });

    console.log(`✅ SMS sent to +91${phone} via Twilio`);
    return true;
  } catch (err: any) {
    console.error(`❌ Twilio error:`, err.message);
    return false;
  }
}

async function sendViaFast2SMS(phone: string, otp: string): Promise<boolean> {
  if (!FAST2SMS_KEY) {
    console.error('❌ Fast2SMS API key not configured. Set FAST2SMS_API_KEY');
    return false;
  }

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': FAST2SMS_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'otp',
        variables_values: otp,
        numbers: phone,
      }),
    });

    const data = await response.json();
    if (data.return) {
      console.log(`✅ SMS sent to +91${phone} via Fast2SMS`);
      return true;
    } else {
      console.error(`❌ Fast2SMS error:`, data.message);
      return false;
    }
  } catch (err: any) {
    console.error(`❌ Fast2SMS error:`, err.message);
    return false;
  }
}

async function sendViaConsole(phone: string, otp: string): Promise<boolean> {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║         📱 OTP (Console Mode)               ║');
  console.log(`║  Phone: +91 ${phone}                     ║`);
  console.log(`║  OTP:   ${otp}                              ║`);
  console.log(`║  Valid:  10 minutes                          ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  return true;
}

// ─── Cleanup expired OTPs every 5 minutes ────────────────────────
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of otpStore) {
    if (now > record.expiresAt) {
      otpStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ═══════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════

// ─── POST /api/auth/send-otp ─────────────────────────────────────
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phone_number } = req.body;

    // Validate
    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required',
      });
    }

    const phone = phone_number.toString().replace(/\D/g, '').slice(-10);

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Indian mobile number. Must be 10 digits starting with 6-9.',
      });
    }

    // Rate limit per phone
    if (!checkSendLimit(phone)) {
      return res.status(429).json({
        success: false,
        error: 'Too many OTP requests. Please wait 10 minutes before trying again.',
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const sessionId = crypto.randomUUID();

    // Store hashed OTP
    otpStore.set(sessionId, {
      hash: otpHash,
      phone,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
      attempts: 0,
      verified: false,
    });

    // Send SMS
    const sent = await sendSMS(phone, otp);

    if (!sent && SMS_PROVIDER !== 'console') {
      // Fallback to console if SMS fails
      console.log(`⚠️ SMS provider failed, falling back to console for +91${phone}`);
      await sendViaConsole(phone, otp);
    }

    return res.json({
      success: true,
      session_id: sessionId,
      message: `OTP sent to +91${phone.slice(0, 3)}****${phone.slice(7)}`,
      expires_in: OTP_EXPIRY_MS / 1000,
    });

  } catch (err: any) {
    console.error('Send OTP error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send OTP. Please try again.',
    });
  }
});

// ─── POST /api/auth/verify-otp ───────────────────────────────────
app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { session_id, otp } = req.body;

    if (!session_id || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and OTP are required',
      });
    }

    const record = otpStore.get(session_id);

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired session. Please request a new OTP.',
      });
    }

    // Check expiry
    if (Date.now() > record.expiresAt) {
      otpStore.delete(session_id);
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new one.',
      });
    }

    // Check max attempts
    if (record.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(session_id);
      return res.status(429).json({
        success: false,
        error: 'Too many incorrect attempts. Please request a new OTP.',
      });
    }

    // Verify OTP
    const inputHash = hashOTP(otp.toString().trim());

    if (inputHash !== record.hash) {
      record.attempts++;
      const remaining = MAX_ATTEMPTS - record.attempts;
      return res.status(401).json({
        success: false,
        error: `Incorrect OTP. ${remaining} attempt(s) remaining.`,
        attempts_remaining: remaining,
      });
    }

    // ✅ OTP verified!
    record.verified = true;

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');

    // Clean up used OTP
    otpStore.delete(session_id);

    return res.json({
      success: true,
      message: 'Phone number verified successfully!',
      token,
      phone: `+91${record.phone}`,
      user: {
        phone: record.phone,
        verified: true,
        created_at: new Date().toISOString(),
      },
    });

  } catch (err: any) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({
      success: false,
      error: 'Verification failed. Please try again.',
    });
  }
});

// ─── GET /api/health ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'BharatSetu OTP Auth',
    sms_provider: SMS_PROVIDER,
    uptime: process.uptime(),
    active_sessions: otpStore.size,
  });
});

// ─── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════════╗');
  console.log('  ║   🚀 BharatSetu OTP Auth Server                 ║');
  console.log(`  ║   Port:     ${PORT}                                ║`);
  console.log(`  ║   Provider: ${SMS_PROVIDER.padEnd(36)}║`);
  console.log('  ║   Health:   /api/health                         ║');
  console.log('  ╚══════════════════════════════════════════════════╝');
  console.log('');

  if (SMS_PROVIDER === 'console') {
    console.log('  ⚠️  Running in CONSOLE mode — OTPs print here, not sent via SMS');
    console.log('  💡 Set SMS_PROVIDER=twilio or SMS_PROVIDER=fast2sms in .env for real SMS');
    console.log('');
  }
});

export default app;

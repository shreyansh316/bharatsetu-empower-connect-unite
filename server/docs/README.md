# BharatSetu OTP Authentication System

This is a production-ready, real-world SMS OTP authentication system built for the BharatSetu platform.

## Features

- 📱 **Real SMS Delivery**: Integrates with Twilio or Fast2SMS.
- 🔒 **Secure Hash Storage**: OTPs are hashed using SHA-256 before being stored in memory.
- ⏱️ **Rate Limiting**: Limits OTP requests (max 3 per 10 minutes per phone).
- 🚫 **Brute-Force Protection**: Max 5 incorrect attempts before the OTP is invalidated.
- ⏳ **Expiry**: OTPs expire strictly after 10 minutes.
- 🖥️ **Console Mode**: Test locally without spending SMS credits.

## Quick Start (Local Development)

1. Open a terminal in the `server` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Start the server (runs in console mode by default):
   ```bash
   npm run server
   ```

The server will run on `http://localhost:5000`.

## Testing the API

You can test the API using the provided bash script:

```bash
bash TEST_API.sh
```

Or using `curl`:

**1. Send OTP**
```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone_number":"9876543210"}'
```

**2. Verify OTP**
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"session_id":"YOUR_SESSION_ID","otp":"123456"}'
```

## Going to Production (Real SMS)

To send real SMS messages to users' phones, you need an SMS provider.

### Option 1: Twilio (Global)
1. Sign up at [Twilio](https://www.twilio.com/try-twilio).
2. Get your Account SID, Auth Token, and a Phone Number.
3. Edit your `.env` file:
   ```env
   SMS_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   ```

### Option 2: Fast2SMS (India only - Cheaper)
1. Sign up at [Fast2SMS](https://www.fast2sms.com/).
2. Get your API Key.
3. Edit your `.env` file:
   ```env
   SMS_PROVIDER=fast2sms
   FAST2SMS_API_KEY=your_api_key
   ```

## Architecture Notes

- **State Management**: Currently uses an in-memory `Map` for OTPs. If deploying across multiple server instances (load balancing), you MUST replace this with Redis.
- **CORS**: Ensure `CORS_ORIGIN` matches your frontend URL in production.

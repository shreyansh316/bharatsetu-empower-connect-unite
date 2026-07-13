# OTP Server Setup Guide

Follow these steps to get the real SMS OTP system running on your local machine and connected to your frontend.

## Step 1: Start the Backend Server

The backend handles generating OTPs, rate-limiting, and talking to the SMS providers.

1. Open a new terminal window.
2. Navigate to the server folder:
   ```bash
   cd server
   ```
3. Install the required Node.js packages:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - On Windows: `copy .env.example .env`
   - On Mac/Linux: `cp .env.example .env`
5. Start the server:
   ```bash
   npm run server
   ```

*You should see a message saying "BharatSetu OTP Auth Server" is running on Port 5000 in Console Mode.*

## Step 2: Test the Connection

Before touching the frontend, let's make sure the backend is working.

In another terminal, run:
```bash
curl http://localhost:5000/api/health
```
You should get a JSON response with `"status": "ok"`.

## Step 3: Use the Frontend

The React frontend component `src/components/auth/PhoneOTPLogin.tsx` is already configured to point to `http://localhost:5000`.

1. Ensure your Vite frontend is running (`npm run dev` in the root folder).
2. Go to your login page in the browser (e.g., `http://localhost:5173/login`).
3. Enter a 10-digit phone number (e.g., `9876543210`) and click "Send OTP".
4. **Look at your backend terminal!** Since you are in `console` mode, the 6-digit OTP will be printed in the terminal instead of sent via SMS.
5. Enter that 6-digit code into the frontend UI.
6. You should see a success message and be redirected!

## Step 4: Enable Real SMS

Once you've confirmed it works in console mode, you can connect a real SMS gateway.

1. Create a free account at [Twilio](https://www.twilio.com/).
2. Get your free trial phone number, Account SID, and Auth Token.
3. Open `server/.env` in your editor.
4. Change `SMS_PROVIDER=console` to `SMS_PROVIDER=twilio`.
5. Fill in the Twilio credentials.
6. Restart your backend server (`Ctrl+C` then `npm run server`).
7. Try logging in again on the frontend—this time, you will receive a real SMS!

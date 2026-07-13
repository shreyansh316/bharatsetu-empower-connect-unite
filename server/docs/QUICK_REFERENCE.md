# Quick Reference & Troubleshooting

## Common Commands

**Start the Server (Dev Mode)**
```bash
cd server
npm run server
```

**Test API Health**
```bash
curl http://localhost:5000/api/health
```

**Run Automated Tests**
```bash
cd server
bash TEST_API.sh
```

**Run with Docker**
```bash
cd server
docker-compose up -d
```

## Troubleshooting

### "Connection Refused" on the Frontend
- **Issue**: The frontend is trying to talk to the backend, but the backend is not running.
- **Fix**: Open a terminal, go to the `server/` directory, and run `npm run server`. Leave this terminal open.

### "Too many requests. Please wait 10 minutes"
- **Issue**: You've hit the rate limit (3 OTPs per 10 minutes for the same phone number).
- **Fix**: Use a different phone number for testing, or restart the server (which clears the in-memory state).

### "OTP is Invalid" but you typed it correctly
- **Issue**: The session might have expired (10 minutes) or you might have requested a *second* OTP but entered the *first* one.
- **Fix**: Wait for the timer to run out, click "Change Number", and start fresh.

### Twilio: "Unable to create record: The 'To' number is not a valid phone number"
- **Issue**: Twilio requires phone numbers in E.164 format (e.g., `+919876543210`). The server code prepends `+91` automatically, so just enter a 10-digit number.
- **Fix**: If you are testing from outside India, you need to change the `+91` hardcoding in `server.ts` to your country code.

### Twilio: "Trial accounts cannot send messages to unverified numbers"
- **Issue**: You are using a free Twilio trial.
- **Fix**: You must verify your own personal phone number in the Twilio Console under "Verified Caller IDs", and then only send OTPs to that specific number during testing. To send to anyone, you must upgrade your Twilio account.

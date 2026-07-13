#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🧪 Testing BharatSetu OTP API..."
echo "==================================="

# 1. Check Health
echo -n "1. Checking API Health... "
HEALTH_RESP=$(curl -s http://localhost:5000/api/health)
if [[ $HEALTH_RESP == *"\"status\":\"ok\""* ]]; then
  echo -e "${GREEN}SUCCESS${NC}"
  echo "$HEALTH_RESP"
else
  echo -e "${RED}FAILED${NC} - Is the server running on port 5000?"
  exit 1
fi

echo "-----------------------------------"

# 2. Send OTP
PHONE="9876543210"
echo -n "2. Sending OTP to +91 $PHONE... "
SEND_RESP=$(curl -s -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"phone_number\":\"$PHONE\"}")

if [[ $SEND_RESP == *"\"success\":true"* ]]; then
  echo -e "${GREEN}SUCCESS${NC}"
  SESSION_ID=$(echo $SEND_RESP | grep -o '"session_id":"[^"]*' | grep -o '[^"]*$')
  echo "Session ID: $SESSION_ID"
else
  echo -e "${RED}FAILED${NC}"
  echo "$SEND_RESP"
  exit 1
fi

echo "-----------------------------------"

# 3. Prompt for Verify
echo "Check your server console (or SMS if configured) for the OTP."
read -p "Enter the 6-digit OTP to verify: " OTP_CODE

echo -n "3. Verifying OTP... "
VERIFY_RESP=$(curl -s -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d "{\"session_id\":\"$SESSION_ID\",\"otp\":\"$OTP_CODE\"}")

if [[ $VERIFY_RESP == *"\"success\":true"* ]]; then
  echo -e "${GREEN}SUCCESS${NC}"
  echo "Login verified!"
else
  echo -e "${RED}FAILED${NC}"
  echo "$VERIFY_RESP"
fi

echo "==================================="

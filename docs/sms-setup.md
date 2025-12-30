# SMS Notifications Setup (Termii)

## Overview

Termii is Nigeria's leading SMS gateway provider, perfect for sending SMS alerts for:
- Child check-in/checkout notifications
- Emergency SOS alerts
- High-severity incident alerts near user location
- Trip safety notifications

## Setup Steps

### 1. Create Termii Account

1. Go to [https://termii.com](https://termii.com)
2. Click "Get Started" or "Sign Up"
3. Complete registration form
4. Verify your email address
5. Log in to your dashboard

### 2. Get API Credentials

1. Navigate to **API Settings** in your dashboard
2. Copy your **API Key**
3. Create a **Sender ID** (e.g., "SafeGuard" or "SafeGuardNG")
   - Must be 11 characters or less
   - Alphanumeric only
   - Subject to approval (usually 24-48 hours)

### 3. Add to Environment Variables

Add to your `.env.local`:

```env
TERMII_API_KEY=your_api_key_here
TERMII_SENDER_ID=SafeGuard
```

### 4. Test API Connection

```bash
curl -X POST https://api.ng.termii.com/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "2348012345678",
    "from": "SafeGuard",
    "sms": "Test message from SafeGuard Nigeria",
    "type": "plain",
    "api_key": "YOUR_API_KEY",
    "channel": "generic"
  }'
```

## Implementation

### Create SMS Service

Create `lib/services/sms.ts`:

```typescript
export async function sendSMS(to: string, message: string) {
  const response = await fetch('https://api.ng.termii.com/api/sms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      from: process.env.TERMII_SENDER_ID,
      sms: message,
      type: 'plain',
      api_key: process.env.TERMII_API_KEY,
      channel: 'generic',
    }),
  });
  
  return response.json();
}
```

### Usage Examples

```typescript
// Child check-in notification
await sendSMS(
  parentPhone,
  `SafeGuard: ${childName} arrived safely at ${schoolName} at ${time}`
);

// Emergency SOS
await sendSMS(
  emergencyContact,
  `EMERGENCY: ${userName} has triggered SOS at ${location}. Location: ${mapLink}`
);

// Incident alert
await sendSMS(
  userPhone,
  `SafeGuard ALERT: High severity ${incidentType} reported 2km from your location in ${area}`
);
```

## Pricing (as of 2024)

- **Rate**: ₦2.50 - ₦4.00 per SMS (depending on volume)
- **Free tier**: Usually 10-20 test messages
- **Top-up**: Pay-as-you-go or monthly plans

## Best Practices

1. **Rate Limiting**: Don't spam users with too many SMS
2. **Time Windows**: Only send between 7 AM - 9 PM
3. **Opt-in**: Users must consent to SMS notifications
4. **Templates**: Use pre-approved templates for faster delivery
5. **Character Limit**: Keep messages under 160 characters

## Notification Types to Send via SMS

### High Priority (Always Send)
- ✅ Child check-in/checkout
- ✅ Emergency SOS alerts
- ✅ Critical severity incidents nearby

### Medium Priority (User Preference)
- ⚠️ High severity incidents
- ⚠️ Trip safety alerts
- ⚠️ Subscription renewals

### Low Priority (In-app Only)
- ℹ️ Low/medium severity incidents
- ℹ️ General safety tips
- ℹ️ Feature announcements

## Testing

Test SMS notifications in development:

```typescript
// Use a test phone number in .env.local
TERMII_TEST_PHONE=+2348012345678

// Send test notification
await sendSMS(
  process.env.TERMII_TEST_PHONE!,
  'Test notification from SafeGuard Nigeria'
);
```

## Troubleshooting

**SMS not received?**
- Verify phone number format (+234...)
- Check Sender ID is approved
- Verify API key is correct
- Check account balance

**Delivery failures?**
- Some networks block certain sender IDs
- Use "generic" channel for better delivery
- Avoid special characters in messages

## Next Steps

1. Set up Termii account
2. Get Sender ID approved
3. Top up account (start with ₦5,000)
4. Implement SMS service
5. Test with your phone number
6. Enable user SMS preferences

# Paystack Integration Setup

## Overview

Paystack is Nigeria's leading payment gateway, perfect for handling subscription payments with support for:
- Credit/Debit Cards (Visa, Mastercard, Verve)
- Bank Transfers
- USSD
- Mobile Money
- Recurring subscriptions

## Setup Steps

### 1. Create Paystack Account

1. Go to [https://paystack.com](https://paystack.com)
2. Click "Get Started" or "Sign Up"
3. Complete registration with business details
4. Verify your email and phone
5. Complete KYC (Know Your Customer) verification

### 2. Get API Keys

1. Log in to your Paystack dashboard
2. Navigate to **Settings** → **API Keys & Webhooks**
3. You'll see two keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 3. Add to Environment Variables

```env
# .env.local
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
```

**Important:**
- Use `pk_test_` and `sk_test_` for development
- Use `pk_live_` and `sk_live_` for production
- Never commit secret keys to version control

### 4. Set Up Webhook URL

1. In Paystack Dashboard → **Settings** → **API Keys & Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/webhooks/paystack`
3. Copy the webhook secret (for signature verification)
4. Add events to listen for:
   - `charge.success`
   - `subscription.create`
   - `subscription.disable`
   - `subscription.not_renew`

### 5. Enable Recurring Payments

1. Go to **Settings** → **Preferences**
2. Enable "Subscriptions"
3. Configure payment retry settings
4. Set up email notifications

## Implementation

### Client-Side Payment

Already implemented in `/subscribe/[tier]/page.tsx`:

```typescript
const handler = window.PaystackPop.setup({
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  email: userEmail,
  amount: amount * 100, // Convert to kobo
  currency: 'NGN',
  ref: `sub_${Date.now()}`,
  metadata: {
    tier: 'family',
    cycle: 'monthly',
  },
  callback: function(response) {
    // Payment successful
    verifyPayment(response.reference);
  },
  onClose: function() {
    // Payment cancelled
  },
});

handler.openIframe();
```

### Server-Side Verification

Create `app/api/payments/verify/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { reference } = await req.json();

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (data.status && data.data.status === 'success') {
    // Payment verified
    // Update user subscription in database
    return NextResponse.json({ success: true, data: data.data });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}
```

### Webhook Handler

Already created at `/api/webhooks/paystack/route.ts`:

```typescript
// Verifies Paystack signature
const hash = crypto
  .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
  .update(body)
  .digest('hex');

if (hash !== paystackSignature) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
}

// Process events
switch (event.event) {
  case 'charge.success':
    await updateUserSubscription(event.data);
    break;
}
```

## Subscription Plans

### Create Plans in Paystack

1. Go to **Payments** → **Plans**
2. Create 3 plans:

**Family Plan:**
- Name: SafeGuard Family
- Amount: ₦2,500
- Interval: Monthly or Yearly
- Currency: NGN

**Premium Plan:**
- Name: SafeGuard Premium
- Amount: ₦5,000
- Interval: Monthly or Yearly
- Currency: NGN

3. Note the plan IDs for each

### Use in Code

```typescript
// Initialize subscription
const response = await fetch('https://api.paystack.co/transaction/initialize', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: userEmail,
    amount: amount * 100,
    plan: 'PLN_familyplanid', // Plan ID from Paystack
    metadata: {
      tier: 'family',
      user_id: userId,
    },
  }),
});
```

## Testing

### Test Cards

Paystack provides test cards for different scenarios:

**Successful Payment:**
- Card: `4084084084084081`
- CVV: `408`
- Expiry: Any future date
- PIN: `0000`

**Insufficient Funds:**
- Card: `5060666666666666666`
- CVV: Any 3 digits
- Expiry: Any future date
- PIN: `1111`

**Declined:**
- Card: `5078606060606060606`

### Test Payment Flow

1. Navigate to `/pricing`
2. Select Family or Premium plan
3. Click "Subscribe Now"
4. On payment page, click "Pay" button
5. Use test card above
6. Complete payment
7. Webhook should receive `charge.success` event
8. User subscription should be updated

## Pricing

### Transaction Fees

- **Nigeria-issued cards**: 1.5% capped at ₦2,000
- **International cards**: 3.9%
- **Bank transfers**: Free

### Settlement Time

- **T+1**: Next business day
- Available balance shows in your dashboard

## Security Best Practices

1. **Never expose secret key** to frontend
2. **Always verify payments** on server-side
3. **Validate webhook signatures** before processing
4. **Use HTTPS** for all API calls
5. **Store minimal card data** (let Paystack handle it)

## Production Checklist

- [ ] Complete KYC verification
- [ ] Switch to live API keys
- [ ] Update webhook URL to production domain
- [ ] Test with real card (small amount)
- [ ] Set up billing alerts
- [ ] Enable 2FA on Paystack account
- [ ] Configure settlement account
- [ ] Set up email notifications

## Common Issues

### Payment fails immediately
- Check API keys are correct
- Ensure amount is in kobo (*100)
- Verify user email is valid

### Webhook not received
- Check webhook URL is accessible (HTTPS)
- Verify signature validation logic
- Check Paystack dashboard logs

### Subscription not renewed
- Check card has sufficient funds
- Verify retry settings in Paystack
- Check email notifications enabled

## Support

- **Documentation**: https://paystack.com/docs
- **Support Email**: support@paystack.com
- **Phone**: +234 1 888 8881
- **Community**: https://support.paystack.com

## Next Steps

1. Create Paystack account
2. Get test API keys
3. Add to `.env.local`
4. Test payment flow with test card
5. Verify webhook receives events
6. Complete KYC for live mode
7. Switch to live keys for production

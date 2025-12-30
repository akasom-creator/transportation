import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Paystack webhook handler
export async function POST(req: NextRequest) {
    try {
        // Verify Paystack signature
        const paystackSignature = req.headers.get('x-paystack-signature');
        const body = await req.text();

        const hash = crypto
            .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
            .update(body)
            .digest('hex');

        if (hash !== paystackSignature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(body);

        // Handle different event types
        switch (event.event) {
            case 'charge.success':
                await handleSuccessfulCharge(event.data);
                break;

            case 'subscription.create':
                await handleSubscriptionCreate(event.data);
                break;

            case 'subscription.disable':
                await handleSubscriptionDisable(event.data);
                break;

            case 'subscription.not_renew':
                await handleSubscriptionNotRenew(event.data);
                break;

            default:
                console.log('Unhandled event:', event.event);
        }

        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

async function handleSuccessfulCharge(data: any) {
    console.log('Successful charge:', data);

    // In production:
    // 1. Verify payment amount matches expected
    // 2. Update user subscription in database
    // 3. Send confirmation email
    // 4. Create invoice record
    // 5. Send SMS notification

    const { reference, amount, customer, metadata } = data;

    // Example: Update database
    // await supabase
    //   .from('users')
    //   .update({
    //     subscription_tier: metadata.tier,
    //     subscription_status: 'active',
    //     subscription_start: new Date(),
    //     subscription_end: new Date(Date.now() + (metadata.cycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
    //   })
    //   .eq('email', customer.email);
}

async function handleSubscriptionCreate(data: any) {
    console.log('Subscription created:', data);
    // Update user subscription status
}

async function handleSubscriptionDisable(data: any) {
    console.log('Subscription disabled:', data);
    // Downgrade user to free tier
}

async function handleSubscriptionNotRenew(data: any) {
    console.log('Subscription will not renew:', data);
    // Send reminder email
}

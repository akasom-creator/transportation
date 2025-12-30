'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SUBSCRIPTION_TIERS } from '@/lib/constants';
import { CreditCard, Lock, Shield } from 'lucide-react';

export default function SubscribePage({ params }: { params: { tier: string } }) {
  const searchParams = useSearchParams();
  const cycle = searchParams.get('cycle') || 'monthly';
  const tier = SUBSCRIPTION_TIERS.find(t => t.value === params.tier);

  if (!tier || tier.value === 'free') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">Invalid subscription tier</p>
            <Button className="mt-4" onClick={() => window.location.href = '/pricing'}>
              View Pricing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const monthlyPrice = tier.price;
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);
  const amount = cycle === 'monthly' ? monthlyPrice : yearlyPrice;

  const handlePayment = () => {
    // In production, initialize Paystack payment
    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!paystackPublicKey || paystackPublicKey.includes('your_paystack')) {
      alert('Paystack is not configured. Please add your public key to .env.local');
      return;
    }

    // Initialize Paystack
    // @ts-ignore
    const handler = window.PaystackPop?.setup({
      key: paystackPublicKey,
      email: 'user@example.com', // Get from auth context
      amount: amount * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: `sub_${Date.now()}`,
      metadata: {
        tier: tier.value,
        cycle: cycle,
        custom_fields: [
          {
            display_name: 'Subscription Tier',
            variable_name: 'tier',
            value: tier.label,
          },
          {
            display_name: 'Billing Cycle',
            variable_name: 'cycle',
            value: cycle,
          },
        ],
      },
      callback: function (response: any) {
        console.log('Payment successful:', response);
        // Verify payment on backend
        window.location.href = `/payment/success?reference=${response.reference}`;
      },
      onClose: function () {
        console.log('Payment cancelled');
      },
    });

    handler?.openIframe();
  };

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Complete Your Subscription
          </h1>
          <Button variant="outline" onClick={() => window.location.href = '/pricing'}>
            Back to Pricing
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tier.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Billing:</span>
                    <Badge variant="info">{cycle === 'monthly' ? 'Monthly' : 'Yearly'}</Badge>
                  </div>
                  {cycle === 'yearly' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                      <span className="text-success-600 font-medium">20% off</span>
                    </div>
                  )}
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₦{amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Billed {cycle === 'monthly' ? 'monthly' : 'annually'}. Auto-renews until cancelled.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.value === 'family' && (
                    <>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ Up to 3 family members</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ School check-in alerts</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ Live bus tracking</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ SMS notifications</li>
                    </>
                  )}
                  {tier.value === 'premium' && (
                    <>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ Unlimited family members</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ Advanced analytics</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ Priority 24/7 support</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ API access</li>
                      <li className="text-sm text-gray-700 dark:text-gray-300">✓ Historical data (90 days)</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="mb-6">
                    <img
                      src="/paystack-logo.png"
                      alt="Paystack"
                      className="h-12 mx-auto mb-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Secure payment powered by Paystack
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <span>💳 Cards</span>
                      <span>🏦 Bank Transfer</span>
                      <span>📱 USSD</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Pay ₦{amount.toLocaleString()}
                  </Button>

                  <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Secured by 256-bit SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="mt-6 border-success-200 bg-success-50 dark:bg-success-900/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    7-Day Money-Back Guarantee
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Not satisfied? Get a full refund within 7 days, no questions asked.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

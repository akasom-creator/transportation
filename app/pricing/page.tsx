'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SUBSCRIPTION_TIERS } from '@/lib/constants';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      ...SUBSCRIPTION_TIERS[0],
      icon: <Shield className="w-12 h-12 text-gray-600" />,
      color: 'gray',
      features: [
        'Basic incident reporting',
        'View community incidents',
        'Emergency SOS button',
        'Safety alerts in your area',
        'Public incident map access',
      ],
    },
    {
      ...SUBSCRIPTION_TIERS[1],
      icon: <Zap className="w-12 h-12 text-primary-600" />,
      color: 'primary',
      popular: true,
      features: [
        'Everything in Free',
        'Up to 3 family members tracking',
        'School check-in notifications',
        'Live bus tracking',
        'SMS alerts for check-ins',
        'Priority incident reporting',
        'Family location sharing',
      ],
    },
    {
      ...SUBSCRIPTION_TIERS[2],
      icon: <Crown className="w-12 h-12 text-warning-600" />,
      color: 'warning',
      features: [
        'Everything in Family',
        'Unlimited family members',
        'Advanced analytics dashboard',
        'Custom danger zones',
        'Priority support (24/7)',
        'API access',
        'Export all data',
        'School admin dashboard',
        'Historical tracking (90 days)',
      ],
    },
  ];

  const handleSubscribe = (tierId: string, price: number) => {
    if (tierId === 'free') {
      window.location.href = '/auth/register';
      return;
    }

    // In production, initiate Paystack payment
    console.log(`Initiating payment for ${tierId}: ₦${price}`);
    // Redirect to payment page
    window.location.href = `/subscribe/${tierId}?cycle=${billingCycle}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SafeGuard Nigeria
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Choose your plan</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Protect What Matters Most
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your family's safety needs
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
              <Badge variant="success" size="sm" className="ml-2">
                Save 20%
              </Badge>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => {
            const monthlyPrice = tier.price;
            const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
            const displayPrice = billingCycle === 'monthly' ? monthlyPrice : yearlyPrice;

            return (
              <motion.div
                key={tier.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative ${
                    (tier as any).popular
                      ? 'border-2 border-primary-500 shadow-xl scale-105'
                      : ''
                  }`}
                >
                  {(tier as any).popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge variant="success" className="px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pt-8">
                    <div className="flex justify-center mb-4">{tier.icon}</div>
                    <CardTitle className="text-2xl">{tier.label}</CardTitle>
                    <div className="mt-4">
                      {tier.value === 'free' ? (
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">
                          Free
                        </p>
                      ) : (
                        <>
                          <p className="text-4xl font-bold text-gray-900 dark:text-white">
                            ₦{displayPrice.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </p>
                          {billingCycle === 'yearly' && (
                            <p className="text-xs text-success-600 mt-1">
                              ₦{Math.round((monthlyPrice * 12 - yearlyPrice) / 12).toLocaleString()}/mo saved
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-success-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={(tier as any).popular ? 'primary' : 'outline'}
                      onClick={() => handleSubscribe(tier.value, displayPrice)}
                    >
                      {tier.value === 'free' ? 'Get Started' : 'Subscribe Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I cancel anytime?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We accept all major payment methods via Paystack: Cards (Visa, Mastercard), Bank Transfer, USSD, and Mobile Money.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is my payment information secure?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Absolutely! We use Paystack, a PCI-DSS compliant payment processor. We never store your card details on our servers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I upgrade or downgrade my plan?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades will apply at your next billing cycle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

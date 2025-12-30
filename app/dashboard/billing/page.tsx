'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Download, Calendar, CheckCircle, Shield } from 'lucide-react';

export default function BillingPage() {
  const [currentPlan] = useState({
    tier: 'Family',
    status: 'active',
    amount: 2500,
    cycle: 'monthly',
    nextBillingDate: '2024-02-08',
    paymentMethod: 'Visa ending in 4242',
  });

  const [billingHistory] = useState([
    {
      id: '1',
      date: '2024-01-08',
      amount: 2500,
      status: 'paid',
      invoice: 'INV-2024-001',
    },
    {
      id: '2',
      date: '2023-12-08',
      amount: 2500,
      status: 'paid',
      invoice: 'INV-2023-012',
    },
    {
      id: '3',
      date: '2023-11-08',
      amount: 2500,
      status: 'paid',
      invoice: 'INV-2023-011',
    },
  ]);

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      console.log('Cancelling subscription...');
      // In production: call API to cancel subscription
    }
  };

  const handleUpgrade = () => {
    window.location.href = '/pricing';
  };

  const downloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
    // In production: generate and download PDF invoice
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <CreditCard className="w-7 h-7 mr-2 text-primary-600" />
              Billing & Subscription
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your subscription and payment methods
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'}>
            <Shield className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Current Plan</CardTitle>
              <Badge variant="success">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentPlan.tier} Plan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  ₦{currentPlan.amount.toLocaleString()}/{currentPlan.cycle}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Next billing: {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {currentPlan.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-3">
                <Button onClick={handleUpgrade} className="w-full">
                  Upgrade to Premium
                </Button>
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {currentPlan.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expires 12/2025
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Invoice
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                        ₦{item.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={item.status === 'paid' ? 'success' : 'default'} size="sm">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {item.invoice}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadInvoice(item.invoice)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

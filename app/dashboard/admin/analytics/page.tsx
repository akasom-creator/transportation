'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  School,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Shield
} from 'lucide-react';
import { CountUp } from '@/components/animations/CountUp';

export default function AdminAnalyticsPage() {
  const stats = [
    { label: 'Total Users', value: 1234, change: '+12%', trend: 'up', icon: Users },
    { label: 'Total Incidents', value: 856, change: '-8%', trend: 'down', icon: AlertTriangle },
    { label: 'Active Subscriptions', value: 432, change: '+24%', trend: 'up', icon: DollarSign },
    { label: 'Schools Protected', value: 23, change: '+15%', trend: 'up', icon: School },
  ];

  const userGrowth = [
    { month: 'Jan', users: 450 },
    { month: 'Feb', users: 520 },
    { month: 'Mar', users: 680 },
    { month: 'Apr', users: 890 },
    { month: 'May', users: 1050 },
    { month: 'Jun', users: 1234 },
  ];

  const subscriptionBreakdown = [
    { tier: 'Free', count: 802, percentage: 65, color: 'bg-gray-400' },
    { tier: 'Family', count: 320, percentage: 26, color: 'bg-primary-500' },
    { tier: 'Premium', count: 112, percentage: 9, color: 'bg-success-500' },
  ];

  const incidentsByType = [
    { type: 'Robbery', count: 245, severity: 'high' },
    { type: 'Accident', count: 189, severity: 'medium' },
    { type: 'Suspicious Activity', count: 156, severity: 'low' },
    { type: 'Violence', count: 98, severity: 'critical' },
    { type: 'Other', count: 168, severity: 'low' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Activity className="w-7 h-7 mr-2 text-primary-600" />
              Platform Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive platform statistics and insights
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/admin'}>
            <Shield className="w-5 h-5 mr-2" />
            Admin Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-5 h-5 text-success-600" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-danger-600" />
                  )}
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  <CountUp end={stat.value} />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {stat.label}
                </p>
                <p className={`text-xs font-medium ${
                  stat.trend === 'up' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userGrowth.map((data, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{data.month}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {data.users} users
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${(data.users / 1234) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscription Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptionBreakdown.map((sub, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {sub.tier}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {sub.count} ({sub.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`${sub.color} h-3 rounded-full transition-all`}
                        style={{ width: `${sub.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      1,234 users
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incidents by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Count
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Severity
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incidentsByType.map((incident, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                        {incident.type}
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                        {incident.count}
                      </td>
                      <td className="py-4 px-4">
                        <Badge severity={incident.severity as any}>
                          {incident.severity}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                        {Math.round((incident.count / 856) * 100)}%
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

'use client';

import React, { useState } from 'react';
import { Card, CardContent,CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockAllUsers, mockIncidents } from '@/lib/mockData';
import { User, Incident } from '@/types';
import { CountUp } from '@/components/animations/CountUp';
import {
  Shield,
  Users,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Eye,
  BarChart3,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const totalUsers = mockAllUsers.length;
  const activeIncidents = mockIncidents.filter((i: Incident) => !i.verified).length;
  const verifiedIncidents = mockIncidents.filter((i: Incident) => i.verified).length;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      change: '+12%',
      icon: <Users className="w-5 h-5" />,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900/20',
    },
    {
      label: 'Active Incidents',
      value: activeIncidents,
      change: '-8%',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-danger-600',
      bgColor: 'bg-danger-100 dark:bg-danger-900/20',
    },
    {
      label: 'Verified Reports',
      value: verifiedIncidents,
      change: '+24%',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900/20',
    },
    {
      label: 'Online Users',
      value: 5,
      change: 'Live',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100 dark:bg-warning-900/20',
    },
  ];

  const quickActions = [
    {
      title: 'Live User Tracking',
      description: 'Monitor real-time user locations',
      icon: <MapPin className="w-6 h-6" />,
      href: '/dashboard/admin/live-tracking',
      color: 'bg-primary-500',
    },
    {
      title: 'User Management',
      description: 'Manage users and subscriptions',
      icon: <Users className="w-6 h-6" />,
      href: '/dashboard/admin/users',
      color: 'bg-purple-500',
    },
    {
      title: 'Incident Moderation',
      description: 'Verify and moderate incidents',
      icon: <AlertTriangle className="w-6 h-6" />,
      href: '/dashboard/admin/incidents',
      color: 'bg-danger-500',
    },
    {
      title: 'Analytics',
      description: 'View platform statistics',
      icon: <BarChart3 className="w-6 h-6" />,
      href: '/dashboard/admin/analytics',
      color: 'bg-success-500',
    },
  ];

  const recentUsers = mockAllUsers.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Shield className="w-7 h-7 mr-2 text-primary-600" />
              Super Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Platform monitoring and management
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${stat.change.includes('+') ? 'text-success-600' : stat.change.includes('-') ? 'text-danger-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    <CountUp end={stat.value} />
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <div className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:shadow-lg transition cursor-pointer group">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition`}>
                            {action.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.map((user: User, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {user.full_name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="info" size="sm">
                          {user.role.replace('_', ' ')}
                        </Badge>
                        <Badge variant="success" size="sm">
                          {user.subscription_tier}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = '/dashboard/admin/users'}>
                  View All Users
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Server Status</span>
                      <span className="text-success-600 font-medium">Operational</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-success-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Database</span>
                      <span className="text-success-600 font-medium">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-success-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">API Response</span>
                      <span className="text-warning-600 font-medium">125ms</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-warning-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Free</span>
                    </div>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Family</span>
                    </div>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-success-500"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Premium</span>
                    </div>
                    <span className="text-sm font-medium">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Incidents</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{mockIncidents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">High Severity</span>
                  <span className="text-sm font-bold text-danger-600">
                    {mockIncidents.filter((i: Incident) => i.severity === 'high' || i.severity === 'critical').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">15 min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

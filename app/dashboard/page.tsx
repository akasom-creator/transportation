'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CountUp } from '@/components/animations/CountUp';
import { NavigationMenu } from '@/components/navigation/NavigationMenu';
import {
  Shield,
  MapPin,
  Users,
  Bell,
  TrendingUp,
  AlertTriangle,
  School,
  Bus,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Active Incidents', value: 12, icon: <AlertTriangle className="w-5 h-5" />, color: 'text-danger-600' },
    { label: 'Safe Zones', value: 45, icon: <Shield className="w-5 h-5" />, color: 'text-success-600' },
    { label: 'Active Users', value: 1234, icon: <Users className="w-5 h-5" />, color: 'text-primary-600' },
    { label: 'Schools Protected', value: 23, icon: <School className="w-5 h-5" />, color: 'text-warning-600' },
  ];

  const recentIncidents = [
    {
      id: '1',
      type: 'robbery',
      title: 'Armed Robbery Reported',
      location: 'Lekki Phase 1, Lagos',
      severity: 'high' as const,
      time: '15 minutes ago',
    },
    {
      id: '2',
      type: 'accident',
      title: 'Traffic Accident',
      location: 'Third Mainland Bridge',
      severity: 'medium' as const,
      time: '1 hour ago',
    },
    {
      id: '3',
      type: 'suspicious_activity',
      title: 'Suspicious Activity',
      location: 'Victoria Island',
      severity: 'low' as const,
      time: '2 hours ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigationMenu currentPath="/dashboard" />
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your safety overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard/notifications'}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </span>
            </button>
            <Button onClick={() => window.location.href = '/dashboard/incidents'}>
              <MapPin className="w-5 h-5 mr-2" />
              View Incident Map
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      <CountUp end={stat.value} />
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Incidents */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-danger-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{incident.title}</h3>
                        <Badge severity={incident.severity}>{incident.severity}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {incident.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{incident.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = '/dashboard/incidents'}>
                View Incident Map
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="danger" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/dashboard/report'}
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Report Incident
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/dashboard/route-safety'}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Check Route Safety
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/dashboard/sos'}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Emergency SOS
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.78)}`}
                        className="text-success-600"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">78</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Your area is relatively safe. Stay vigilant!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

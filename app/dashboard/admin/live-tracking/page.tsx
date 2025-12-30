'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CountUp } from '@/components/animations/CountUp';
import { LiveUserTracker } from '@/components/admin/LiveUserTracker';
import { mockLiveUsers, mockAllUsers } from '@/lib/mockData';
import { User } from '@/types';
import {
  Users,
  MapPin,
  Shield,
  AlertTriangle,
  Eye,
  UserCheck,
  Activity,
  TrendingUp,
} from 'lucide-react';

export default function AdminLiveTrackingPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const activeUsers = mockLiveUsers;
  const totalUsers = mockAllUsers.length;
  const onlineCount = activeUsers.length;

  // Filter users by role
  const filteredUsers = roleFilter === 'all' 
    ? activeUsers 
    : activeUsers.filter(u => u.user.role === roleFilter);

  const selectedUser = selectedUserId 
    ? activeUsers.find(u => u.user.id === selectedUserId)
    : null;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: <Users className="w-5 h-5" />,
      color: 'text-primary-600',
    },
    {
      label: 'Online Now',
      value: onlineCount,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-success-600',
    },
    {
      label: 'Location Sharing',
      value: onlineCount,
      icon: <MapPin className="w-5 h-5" />,
      color: 'text-warning-600',
    },
    {
      label: 'Active Trips',
      value: 2,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-danger-600',
    },
  ];

  const roleColors: Record<string, string> = {
    parent: 'bg-blue-500',
    school_admin: 'bg-purple-500',
    security: 'bg-yellow-500',
    traveler: 'bg-green-500',
    super_admin: 'bg-red-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Eye className="w-7 h-7 mr-2 text-primary-600" />
              Live User Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time monitoring of active users
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
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
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Live Location Map</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="success">
                      <Activity className="w-3 h-3 mr-1" />
                      {filteredUsers.length} online
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <LiveUserTracker
                    users={filteredUsers}
                    onUserClick={setSelectedUserId}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    User Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All Roles</option>
                    <option value="parent">Parents</option>
                    <option value="school_admin">School Admins</option>
                    <option value="security">Security</option>
                    <option value="traveler">Travelers</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Selected User */}
            {selectedUser && (
              <Card>
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {selectedUser.user.full_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedUser.user.email}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="info">
                        {selectedUser.user.role.replace('_', ' ')}
                      </Badge>
                      <Badge variant="success">
                        {selectedUser.user.subscription_tier}
                      </Badge>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                        <span className="text-gray-900 dark:text-white">{selectedUser.user.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                        <span className="text-gray-900 dark:text-white">±{selectedUser.location.accuracy}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
                        <span className="text-gray-900 dark:text-white">
                          {new Date(selectedUser.location.updated_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Full Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Role Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(roleColors).map(([role, color]) => (
                    <div key={role} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${color}`} />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {role.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

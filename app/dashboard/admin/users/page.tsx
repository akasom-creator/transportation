'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockAllUsers } from '@/lib/mockData';
import { User } from '@/types';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Shield,
  Ban,
  CheckCircle,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockAllUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesTier = tierFilter === 'all' || user.subscription_tier === tierFilter;
    return matchesSearch && matchesRole && matchesTier;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Users className="w-7 h-7 mr-2 text-primary-600" />
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all platform users
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
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div>
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
                  <option value="super_admin">Super Admins</option>
                </select>
              </div>

              {/* Tier Filter */}
              <div>
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="all">All Tiers</option>
                  <option value="free">Free</option>
                  <option value="family">Family</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold">{filteredUsers.length}</span> of <span className="font-semibold">{users.length}</span> users
              </p>
              <Button variant="outline" onClick={() => { setSearchTerm(''); setRoleFilter('all'); setTierFilter('all'); }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Tier</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Location Sharing</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Joined</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.full_name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="info" size="sm">
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={user.subscription_tier === 'premium' ? 'success' : user.subscription_tier === 'family' ? 'info' : 'default'}
                          size="sm"
                        >
                          {user.subscription_tier}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {user.location_sharing_enabled ? (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="default" size="sm">Disabled</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm(`Reset password for ${user.full_name}?`)) {
                                alert(`✅ Password reset email sent to ${user.email}`);
                              }
                            }}
                          >
                            Reset Password
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (confirm(`Suspend user ${user.full_name}?`)) {
                                alert(`✅ User suspended successfully`);
                              }
                            }}
                          >
                            Suspend
                          </Button>
                        </div>
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

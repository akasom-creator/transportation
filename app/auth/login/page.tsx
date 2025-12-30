'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockUsers, mockLogin } from '@/lib/mockAuth';
import { Shield, Mail, Lock, User, School, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = mockLogin(email, password);

    if (result.success) {
      window.location.href = result.redirectTo || '/dashboard';
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const quickLogin = (userType: keyof typeof mockUsers) => {
    const user = mockUsers[userType];
    const result = mockLogin(user.email, user.password);
    if (result.success) {
      window.location.href = result.redirectTo || '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/icon.svg" alt="SafeGuard Nigeria" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SafeGuard Nigeria
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg p-3">
                  <p className="text-sm text-danger-600 dark:text-danger-400">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                    Or use demo account
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('parent')}
                  className="flex flex-col items-center py-4 h-auto"
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs">Parent</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('school')}
                  className="flex flex-col items-center py-4 h-auto"
                >
                  <School className="w-5 h-5 mb-1" />
                  <span className="text-xs">School Admin</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('admin')}
                  className="flex flex-col items-center py-4 h-auto"
                >
                  <Shield className="w-5 h-5 mb-1" />
                  <span className="text-xs">Super Admin</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('user')}
                  className="flex flex-col items-center py-4 h-auto"
                >
                  <Users className="w-5 h-5 mb-1" />
                  <span className="text-xs">Regular User</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

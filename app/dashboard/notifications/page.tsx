'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { mockNotifications } from '@/lib/mockNotifications';
import { Notification } from '@/types';
import { Bell, CheckCheck, Trash2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'incident':
        if (notification.data?.incident_id) {
          window.location.href = `/dashboard/incidents`;
        }
        break;
      case 'checkin':
      case 'checkout':
        window.location.href = `/dashboard/children`;
        break;
      case 'sos':
        window.location.href = `/dashboard/incidents`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Bell className="w-7 h-7 mr-2 text-primary-600" />
              Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => (window.location.href = '/dashboard')}>
            <Shield className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Actions */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  All ({notifications.length})
                </Button>
                <Button
                  variant={filter === 'unread' ? 'primary' : 'outline'}
                  onClick={() => setFilter('unread')}
                  size="sm"
                >
                  Unread ({unreadCount})
                </Button>
              </div>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                  >
                    <CheckCheck className="w-4 h-4 mr-1" />
                    Mark all as read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleClearAll}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {filter === 'unread' ? 'Unread Notifications' : 'All Notifications'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No notifications
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === 'unread'
                    ? "You're all caught up!"
                    : 'No notifications yet'}
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onClick={handleNotificationClick}
                  />
                ))}
              </AnimatePresence>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings Link */}
        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => (window.location.href = '/dashboard/settings')}>
            Manage notification preferences
          </Button>
        </div>
      </main>
    </div>
  );
}

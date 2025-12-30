'use client';

import React from 'react';
import { Notification } from '@/types';
import { formatTimeAgo } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  MapPin,
  CreditCard,
  Bell,
} from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onClick?: (notification: Notification) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onClick,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'incident':
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      case 'checkin':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'checkout':
        return <CheckCircle className="w-5 h-5 text-warning-600" />;
      case 'sos':
        return <AlertCircle className="w-5 h-5 text-danger-700" />;
      case 'alert':
        return <MapPin className="w-5 h-5 text-warning-600" />;
      case 'subscription':
        return <CreditCard className="w-5 h-5 text-primary-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition ${
        !notification.read
          ? 'bg-primary-50 dark:bg-primary-900/10 hover:bg-primary-100 dark:hover:bg-primary-900/20'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
      onClick={() => onClick?.(notification)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {notification.title}
            </h4>
            {!notification.read && (
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {formatTimeAgo(notification.created_at)}
            </span>
            {!notification.read && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notification.id);
                }}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

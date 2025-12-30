'use client';

import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
}

export function NotificationBell({ unreadCount, onClick }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-danger-600 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </motion.div>
      )}
    </button>
  );
}

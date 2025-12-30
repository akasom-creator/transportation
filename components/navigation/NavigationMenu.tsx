'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Shield,
  MapPin,
  Bell,
  Users,
  School,
  Bus,
  CreditCard,
  AlertTriangle,
  Navigation,
  BarChart3,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { getMockUser, mockLogout } from '@/lib/mockAuth';

interface NavigationMenuProps {
  currentPath?: string;
}

export function NavigationMenu({ currentPath = '/dashboard' }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const user = getMockUser();

  const menuItems = [
    {
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      href: '/dashboard',
      roles: ['all'],
    },
    {
      label: 'Incident Map',
      icon: <MapPin className="w-5 h-5" />,
      href: '/dashboard/incidents',
      roles: ['all'],
    },
    {
      label: 'Route Safety',
      icon: <Navigation className="w-5 h-5" />,
      href: '/dashboard/route-safety',
      roles: ['all'],
    },
    {
      label: 'Report Incident',
      icon: <AlertTriangle className="w-5 h-5" />,
      href: '/dashboard/report',
      roles: ['all'],
    },
    {
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      href: '/dashboard/notifications',
      roles: ['all'],
    },
    {
      label: 'My Children',
      icon: <School className="w-5 h-5" />,
      href: '/dashboard/children',
      roles: ['parent'],
    },
    {
      label: 'Bus Tracking',
      icon: <Bus className="w-5 h-5" />,
      href: '/dashboard/buses',
      roles: ['parent', 'user'],
    },
    {
      label: 'School Check-in',
      icon: <School className="w-5 h-5" />,
      href: '/dashboard/school/checkin',
      roles: ['school_admin'],
    },
    {
      label: 'School Buses',
      icon: <Bus className="w-5 h-5" />,
      href: '/dashboard/school/buses',
      roles: ['school_admin'],
    },
    {
      label: 'Subscription',
      icon: <CreditCard className="w-5 h-5" />,
      href: '/dashboard/billing',
      roles: ['all'],
    },
  ];

  const visibleItems = menuItems.filter(item => {
    if (item.roles.includes('all')) return true;
    if (user?.role && item.roles.includes(user.role)) return true;
    return false;
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 overflow-y-auto"
          >
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-8">
                <img src="/icon.svg" alt="SafeGuard" className="w-8 h-8" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  SafeGuard
                </span>
              </div>

              {/* User Info */}
              {user && (
                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {user.full_name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="space-y-1">
                {visibleItems.map((item, index) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link key={index} href={item.href}>
                      <div
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition ${
                          isActive
                            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-1">
                <Link href="/onboarding">
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Tutorial</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    mockLogout();
                    window.location.href = '/auth/login';
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

// Compact breadcrumb navigation for pages
export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

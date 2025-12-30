'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Bell, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface RouteSafetyWatcherProps {
  routePath: [number, number][]; // Array of [lat, lng]
  origin: string;
  destination: string;
}

export function RouteSafetyWatcher({ routePath, origin, destination }: RouteSafetyWatcherProps) {
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [monitoringStatus, setMonitoringStatus] = useState<'searching' | 'active' | 'alert'>('active');

  // Simulating real-time incident monitoring
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate a new high-severity incident appearing on the route
      const newAlert = {
        id: Math.random().toString(),
        type: 'kidnapping',
        severity: 'critical',
        message: 'CRITICAL ALERT: New kidnapping attempt reported 2.5km ahead on your current route!',
        time: new Date().toLocaleTimeString(),
      };
      
      setActiveAlerts(prev => [newAlert, ...prev]);
      setMonitoringStatus('alert');
      
      // Request browser notification if possible
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('CRITICAL SAFETY ALERT', {
          body: newAlert.message,
          icon: '/icon.svg',
        });
      }
    }, 15000); // 15 seconds into the "trip"

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-6">
      <AnimatePresence>
        {activeAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4"
          >
            <Card className="border-2 border-danger-600 bg-danger-50 dark:bg-danger-900/20 shadow-2xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-danger-600 rounded-full animate-pulse">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-bold text-danger-700 dark:text-danger-400">
                        Incident Detected Ahead!
                      </h3>
                      <span className="text-xs font-medium text-danger-600">
                        {activeAlerts[0].time}
                      </span>
                    </div>
                    <p className="text-danger-800 dark:text-danger-200 font-medium mb-3">
                      {activeAlerts[0].message}
                    </p>
                    <div className="flex gap-3">
                      <Button variant="danger" className="flex-1 shadow-lg shadow-danger-500/50">
                        <Navigation className="w-4 h-4 mr-2" />
                        Reroute Now
                      </Button>
                      <Button variant="outline" className="border-danger-300 text-danger-700 hover:bg-danger-100 dark:border-danger-800 dark:text-danger-300" onClick={() => setActiveAlerts([])}>
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        className={`flex items-center justify-between px-6 py-3 rounded-full shadow-lg border ${
          monitoringStatus === 'alert' 
            ? 'bg-danger-600 border-danger-500 text-white' 
            : 'bg-primary-600 border-primary-500 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          {monitoringStatus === 'alert' ? (
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          ) : (
            <Shield className="w-5 h-5 animate-pulse" />
          )}
          <span className="text-sm font-bold">
            {monitoringStatus === 'active' ? 'Live Safety Monitoring Active' : 'CRITICAL INCIDENT DETECTED'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-80 bg-white/10 px-3 py-1 rounded-full">
          <Navigation className="w-3 h-3" />
          {origin} → {destination}
        </div>
      </motion.div>
    </div>
  );
}

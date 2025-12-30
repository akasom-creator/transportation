'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Phone, MapPin, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PanicButtonProps {
  onActivate?: () => void;
  emergencyContacts?: Array<{ name: string; phone: string }>;
}

export function PanicButton({ onActivate, emergencyContacts = [] }: PanicButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [canCancel, setCanCancel] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPressed && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isPressed && countdown === 0) {
      activateSOS();
    }

    return () => clearTimeout(timer);
  }, [isPressed, countdown]);

  const handlePress = () => {
    setIsPressed(true);
    setCountdown(5);
  };

  const handleCancel = () => {
    if (canCancel) {
      setIsPressed(false);
      setCountdown(5);
    }
  };

  const activateSOS = () => {
    setIsActive(true);
    setCanCancel(false);

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // In production: Send emergency alert
        console.log('🚨 SOS ACTIVATED', {
          location,
          timestamp: new Date().toISOString(),
          contacts: emergencyContacts,
        });

        // Simulate sending alerts
        sendEmergencyAlerts(location);

        // Global Broadcast Event for Simulation
        const sosEvent = new CustomEvent('safeguard-sos', {
          detail: {
            location,
            timestamp: new Date().toISOString(),
            senderName: 'CurrentUser', // In reality, get from auth context
            senderPhone: '+234 801 222 3333'
          }
        });
        window.dispatchEvent(sosEvent);

        // Trigger Calling UI Simulation
        const callingEvent = new CustomEvent('safeguard-start-calling', {
          detail: {
            contacts: emergencyContacts
          }
        });
        window.dispatchEvent(callingEvent);
      });
    }

    onActivate?.();
  };

  const sendEmergencyAlerts = (location: { lat: number; lng: number }) => {
    // In production:
    // 1. Send SMS to emergency contacts
    // 2. Alert nearby users
    // 3. Share live location
    // 4. Record audio/video if enabled
    // 5. Call emergency services if configured

    alert(
      `🚨 EMERGENCY SOS ACTIVATED!\n\n` +
      `✓ Location shared with emergency contacts\n` +
      `✓ Nearby users alerted\n` +
      `✓ Live location tracking enabled\n\n` +
      `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}\n\n` +
      `Help is on the way!`
    );
  };

  return (
    <>
      {/* Main Panic Button */}
      {!isPressed && !isActive && (
        <motion.button
          onClick={handlePress}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-danger-500 to-danger-700 shadow-2xl hover:shadow-3xl transition-all group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 rounded-full bg-danger-400 animate-ping opacity-75"></div>
          <div className="relative flex flex-col items-center justify-center h-full text-white">
            <AlertTriangle className="w-12 h-12 mb-2 group-hover:scale-110 transition" />
            <span className="text-sm font-bold">EMERGENCY</span>
            <span className="text-xs">Press for SOS</span>
          </div>
        </motion.button>
      )}

      {/* Countdown Modal */}
      <AnimatePresence>
        {isPressed && !isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          >
            <Card className="max-w-md w-full">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
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
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - countdown / 5)}`}
                        className="text-danger-600 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-danger-600">{countdown}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Activating SOS Alert
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Emergency contacts will be notified in {countdown} seconds
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Sharing your live location</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Alerting {emergencyContacts.length || 3} contacts</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Notifying nearby users</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleCancel}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active SOS State */}
      {isActive && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="border-danger-500 shadow-2xl animate-pulse">
            <CardContent className="pt-4 pb-4 px-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-danger-600 rounded-full animate-ping"></div>
                <div>
                  <p className="font-bold text-danger-600">SOS ACTIVE</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Location sharing enabled
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

// Compact version for dashboard
export function CompactPanicButton() {
  return (
    <Button
      variant="danger"
      size="lg"
      className="w-full relative overflow-hidden group"
      onClick={() => {
        // In production: Open full panic button modal
        if (confirm('Activate Emergency SOS? This will alert your emergency contacts with your location.')) {
          alert('🚨 SOS Activated! Emergency contacts notified with your location.');
        }
      }}
    >
      <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
      <span>Emergency SOS</span>
      <div className="absolute inset-0 bg-danger-400 opacity-0 group-hover:opacity-20 transition"></div>
    </Button>
  );
}

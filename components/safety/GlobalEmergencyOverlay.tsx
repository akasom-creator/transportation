'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function Badge({ children, variant, className }: any) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${className} ${variant === 'danger' ? 'bg-danger-600 text-white' : 'bg-gray-800 text-white'}`}>
      {children}
    </span>
  );
}

export function GlobalEmergencyOverlay() {
  const [activeSOS, setActiveSOS] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleSOS = (event: any) => {
      setActiveSOS({ ...event.detail, alertType: 'sos' });
    };

    const handleCommunityAlert = (event: any) => {
      setActiveSOS({ ...event.detail, alertType: 'incident' });
      // Play a slightly different alert sound for community alerts
    };

    const handleStorageChange = () => {
      const lastAlert = localStorage.getItem('safeguard_last_alert');
      if (lastAlert) {
        // Redo fetch to see if it's a new verified incident
        const incidents = JSON.parse(localStorage.getItem('safeguard_incidents') || '[]');
        const latestInfo = JSON.parse(lastAlert);
        const incident = incidents.find((i: any) => i.id === latestInfo.id && i.verified);
        if (incident) {
           setActiveSOS({ ...incident, alertType: 'incident' });
        }
      }
    };

    window.addEventListener('safeguard-sos', handleSOS);
    window.addEventListener('safeguard-community-alert', handleCommunityAlert);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('safeguard-sos', handleSOS);
      window.removeEventListener('safeguard-community-alert', handleCommunityAlert);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {activeSOS && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 pointer-events-auto"
            onClick={() => setActiveSOS(null)}
          />

          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            className="w-full max-w-lg pointer-events-auto transform-gpu"
          >
            <Card className={`border-4 ${activeSOS.alertType === 'sos' ? 'border-danger-600' : 'border-primary-600'} bg-white dark:bg-gray-900 shadow-2xl ${activeSOS.alertType === 'sos' ? 'shadow-danger-900/40' : 'shadow-primary-900/40'} overflow-hidden`}>
              <div className={`${activeSOS.alertType === 'sos' ? 'bg-danger-600' : 'bg-primary-600'} p-5 flex items-center justify-between text-white`}>
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-full">
                    <AlertTriangle className={`w-6 h-6 ${activeSOS.alertType === 'sos' ? 'text-danger-600' : 'text-primary-600'} animate-bounce`} />
                  </div>
                  <span className="font-extrabold tracking-tighter text-xl uppercase italic">
                    {activeSOS.alertType === 'sos' ? 'Immediate Emergency SOS' : 'Verified Community Alert'}
                  </span>
                </div>
                <button onClick={() => setActiveSOS(null)} className="p-1 hover:bg-white/10 rounded-full transition">
                  <X className="w-7 h-7" />
                </button>
              </div>
              <CardContent className="p-8">
                <div className="mb-6 text-center">
                  <Badge variant={activeSOS.alertType === 'sos' ? 'danger' : 'primary'} className="mb-4 px-4 py-1 text-xs">
                    {activeSOS.alertType === 'sos' ? 'PRIORITY ALERT' : 'SAFEGUARD VERIFIED'}
                  </Badge>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    {activeSOS.alertType === 'sos' ? activeSOS.senderName : activeSOS.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-bold mb-4">
                    {activeSOS.alertType === 'sos' 
                      ? 'User is in immediate danger and has activated SOS!' 
                      : activeSOS.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Location</p>
                      <div className="flex items-center gap-1 font-mono text-xs">
                        <MapPin className={`w-3 h-3 ${activeSOS.alertType === 'sos' ? 'text-danger-500' : 'text-primary-500'}`} />
                        {activeSOS.alertType === 'sos' 
                          ? `${activeSOS.location.lat.toFixed(4)}, ${activeSOS.location.lng.toFixed(4)}`
                          : `${activeSOS.latitude.toFixed(4)}, ${activeSOS.longitude.toFixed(4)}`}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Time</p>
                      <p className="font-mono text-xs font-bold">
                        {activeSOS.alertType === 'sos' 
                          ? new Date(activeSOS.timestamp).toLocaleTimeString()
                          : new Date(activeSOS.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant={activeSOS.alertType === 'sos' ? 'danger' : 'primary'} 
                    className={`w-full h-14 text-lg font-black shadow-lg ${activeSOS.alertType === 'sos' ? 'shadow-danger-500/50' : 'shadow-primary-500/50'}`} 
                    onClick={() => {
                      const lat = activeSOS.alertType === 'sos' ? activeSOS.location.lat : activeSOS.latitude;
                      const lng = activeSOS.alertType === 'sos' ? activeSOS.location.lng : activeSOS.longitude;
                      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                    }}
                  >
                    <Navigation className="w-5 h-5 mr-3" />
                    {activeSOS.alertType === 'sos' ? 'OPEN MAP TO HELP' : 'LOCATE ON MAP'}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setActiveSOS(null)}>
                      Acknowledge
                    </Button>
                    <Button variant="outline" className="flex-1 border-primary-500 text-primary-600">
                      Notify Security
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Navigation({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

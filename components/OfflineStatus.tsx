'use client';

import React from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineStatus() {
  const { isOnline, isSyncing } = useOfflineSync();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {(!isOnline || isSyncing) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border ${
            isSyncing 
              ? 'bg-primary-600 text-white border-primary-500' 
              : 'bg-danger-600 text-white border-danger-500'
          }`}
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Syncing updates...</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">Offline Mode</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

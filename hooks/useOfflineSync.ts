'use client';

import { useEffect, useState } from 'react';
import { getPendingIncidents, updateOfflineIncidentStatus, removeIncidentFromOutbox } from '@/lib/offlineStore';

export function useOfflineSync() {
    const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            syncOfflineData();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial sync check if online
        if (isOnline) {
            syncOfflineData();
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const syncOfflineData = async () => {
        if (isSyncing) return;

        const pending = await getPendingIncidents();
        if (pending.length === 0) return;

        setIsSyncing(true);
        console.log(`📡 Starting sync for ${pending.length} pending incidents...`);

        for (const incident of pending) {
            try {
                await updateOfflineIncidentStatus(incident.tempId, 'syncing');

                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                console.log(`✅ Synced incident: ${incident.title}`);
                await removeIncidentFromOutbox(incident.tempId);
            } catch (error) {
                console.error(`❌ Failed to sync incident ${incident.tempId}:`, error);
                await updateOfflineIncidentStatus(incident.tempId, 'failed');
            }
        }

        setIsSyncing(false);
    };

    return { isOnline, isSyncing, syncOfflineData };
}

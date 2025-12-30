import { Incident } from '@/types';
import { mockIncidents } from './mockData';

const INCIDENTS_KEY = 'safeguard_incidents';

export const getPersistentIncidents = (): Incident[] => {
    if (typeof window === 'undefined') return mockIncidents;
    const stored = localStorage.getItem(INCIDENTS_KEY);
    if (!stored) {
        localStorage.setItem(INCIDENTS_KEY, JSON.stringify(mockIncidents));
        return mockIncidents;
    }
    return JSON.parse(stored);
};

export const savePersistentIncident = (incident: Incident) => {
    const incidents = getPersistentIncidents();
    const updated = [incident, ...incidents];
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage')); // Trigger update in other tabs
};

export const updatePersistentIncident = (id: string, updates: Partial<Incident>) => {
    const incidents = getPersistentIncidents();
    const updated = incidents.map(i => i.id === id ? { ...i, ...updates } : i);
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(updated));

    // If verified, trigger global broadcast event
    const updatedIncident = updated.find(i => i.id === id);
    if (updates.verified && updatedIncident) {
        const event = new CustomEvent('safeguard-community-alert', { detail: updatedIncident });
        window.dispatchEvent(event);

        // Also notify other tabs through storage event
        localStorage.setItem('safeguard_last_alert', JSON.stringify({
            id: updatedIncident.id,
            timestamp: Date.now()
        }));
    }
};

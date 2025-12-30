import { Incident } from '@/types';

const DB_NAME = 'safeguard-nigeria-db';
const DB_VERSION = 1;
const STORE_NAME = 'incident-outbox';

export interface OfflineIncident extends Omit<Incident, 'id' | 'created_at' | 'updated_at'> {
    tempId: string;
    status: 'pending' | 'syncing' | 'failed';
    createdAt: string;
}

export async function initDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'tempId' });
            }
        };
    });
}

export async function saveIncidentOffline(incident: OfflineIncident) {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(incident);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function getPendingIncidents(): Promise<OfflineIncident[]> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

export async function removeIncidentFromOutbox(tempId: string) {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(tempId);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function updateOfflineIncidentStatus(tempId: string, status: OfflineIncident['status']) {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(tempId);

        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
                data.status = status;
                const updateRequest = store.put(data);
                updateRequest.onsuccess = () => resolve();
                updateRequest.onerror = () => reject(updateRequest.error);
            } else {
                reject(new Error('Incident not found'));
            }
        };
        getRequest.onerror = () => reject(getRequest.error);
    });
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: string | Date): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDate(date: string | Date, formatStr: string = "PPP"): string {
    return format(new Date(date), formatStr);
}

export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

export function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)}km`;
}

export function getSeverityColor(severity: string): string {
    switch (severity) {
        case 'low':
            return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
        case 'medium':
            return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
        case 'high':
            return 'text-red-600 bg-red-50 dark:bg-red-900/20';
        case 'critical':
            return 'text-red-700 bg-red-100 dark:bg-red-900/40';
        default:
            return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
}

export function getIncidentTypeIcon(type: string): string {
    const icons: Record<string, string> = {
        robbery: '💰',
        kidnapping: '🚨',
        accident: '🚗',
        violence: '⚔️',
        suspicious_activity: '👀',
        harassment: '⚠️',
        other: '📍',
    };
    return icons[type] || '📍';
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

export function generateShareToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

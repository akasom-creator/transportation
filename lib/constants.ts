import { IncidentType, IncidentSeverity, SubscriptionTier } from '@/types';

export const INCIDENT_TYPES: { value: IncidentType; label: string }[] = [
    { value: 'robbery', label: 'Robbery' },
    { value: 'kidnapping', label: 'Kidnapping' },
    { value: 'accident', label: 'Accident' },
    { value: 'violence', label: 'Violence' },
    { value: 'suspicious_activity', label: 'Suspicious Activity' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'other', label: 'Other' },
];

export const SEVERITY_LEVELS: { value: IncidentSeverity; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
];

export const SUBSCRIPTION_TIERS: {
    value: SubscriptionTier;
    label: string;
    price: number;
    features: string[];
}[] = [
        {
            value: 'free',
            label: 'Free',
            price: 0,
            features: [
                'View community incidents',
                'Basic incident reporting',
                'Safety alerts for your area',
                'Access to safety statistics',
            ],
        },
        {
            value: 'family',
            label: 'Family Plan',
            price: 2500,
            features: [
                'Everything in Free',
                'Real-time safety alerts',
                'Safe route recommendations',
                'Family location sharing',
                '1 child school tracking',
                'Priority notifications',
            ],
        },
        {
            value: 'premium',
            label: 'Premium',
            price: 5000,
            features: [
                'Everything in Family',
                'Up to 3 children tracking',
                'Bus tracking',
                'Trip tracking & sharing',
                'Emergency SOS alerts',
                'Priority support',
                'Advanced analytics',
            ],
        },
    ];

export const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const MAJOR_ROUTES = [
    'Lagos-Ibadan',
    'Abuja-Kaduna',
    'Benin-Ore',
    'Port Harcourt-Aba',
    'Enugu-Onitsha',
    'Kano-Kaduna',
    'Lagos-Benin',
    'Abuja-Lokoja',
];

export const EMERGENCY_CONTACTS = {
    police: '112',
    ambulance: '112',
    fire: '112',
    nema: '0800-123-0000',
};

export const MAPBOX_STYLES = {
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
    streets: 'mapbox://styles/mapbox/streets-v12',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
};

export const DEFAULT_CENTER: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria
export const DEFAULT_ZOOM = 11;

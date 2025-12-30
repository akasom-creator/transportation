export type UserRole = 'parent' | 'school_admin' | 'security' | 'traveler' | 'super_admin';

export type IncidentType =
    | 'robbery'
    | 'kidnapping'
    | 'accident'
    | 'violence'
    | 'suspicious_activity'
    | 'harassment'
    | 'other';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export type SubscriptionTier = 'free' | 'family' | 'premium';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    full_name: string;
    phone: string;
    subscription_tier: SubscriptionTier;
    location_sharing_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface Incident {
    id: string;
    user_id: string;
    type: IncidentType;
    severity: IncidentSeverity;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    address?: string;
    images?: string[];
    verified: boolean;
    anonymous: boolean;
    created_at: string;
    updated_at: string;
}

export interface School {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    admin_user_id: string;
    phone: string;
    email: string;
    verified: boolean;
    subscription_tier: SubscriptionTier;
    created_at: string;
}

export interface Student {
    id: string;
    school_id: string;
    first_name: string;
    last_name: string;
    grade: string;
    parent_user_ids: string[];
    pickup_authorized_users: string[];
    photo_url?: string;
    created_at: string;
}

export interface CheckIn {
    id: string;
    student_id: string;
    school_id: string;
    check_in_time?: string;
    check_out_time?: string;
    checked_in_by?: string;
    checked_out_by?: string;
    pickup_person?: string;
    notes?: string;
    created_at: string;
}

export interface BusTracking {
    id: string;
    school_id: string;
    bus_number: string;
    driver_name: string;
    latitude: number;
    longitude: number;
    status: 'active' | 'inactive';
    student_ids: string[];
    route: string;
    last_updated: string;
}

export interface UserLocation {
    id: string;
    user_id: string;
    latitude: number;
    longitude: number;
    accuracy?: number;
    updated_at: string;
}

export interface Trip {
    id: string;
    user_id: string;
    origin: string;
    destination: string;
    start_latitude: number;
    start_longitude: number;
    end_latitude: number;
    end_longitude: number;
    status: 'planned' | 'active' | 'completed' | 'emergency';
    started_at?: string;
    completed_at?: string;
    share_token?: string;
    created_at: string;
}

export interface TransportCompany {
    id: string;
    name: string;
    phone: string;
    email?: string;
    routes: string[];
    rating: number;
    total_reviews: number;
    verified: boolean;
    incidents_count: number;
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: 'incident' | 'checkin' | 'checkout' | 'sos' | 'alert' | 'subscription';
    read: boolean;
    data?: any;
    created_at: string;
}

export interface Subscription {
    id: string;
    user_id: string;
    tier: SubscriptionTier;
    status: 'active' | 'inactive' | 'cancelled';
    start_date: string;
    end_date?: string;
    auto_renew: boolean;
    payment_reference?: string;
}

export interface SafetyScore {
    location: string;
    score: number; // 0-100
    total_incidents: number;
    recent_incidents: number;
    severity_breakdown: {
        low: number;
        medium: number;
        high: number;
        critical: number;
    };
}

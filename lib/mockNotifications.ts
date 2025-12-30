import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
    {
        id: '1',
        user_id: 'user1',
        title: 'New Incident Alert',
        message: 'High severity robbery reported 2km from your location in Lekki Phase 1',
        type: 'incident',
        read: false,
        data: { incident_id: '1', severity: 'high' },
        created_at: new Date(Date.now() - 300000).toISOString(), // 5 min ago
    },
    {
        id: '2',
        user_id: 'user1',
        title: 'Child Check-in Successful',
        message: 'Sarah arrived safely at school at 7:45 AM',
        type: 'checkin',
        read: false,
        data: { student_id: 'student1', school_id: 'school1' },
        created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
    {
        id: '3',
        user_id: 'user1',
        title: 'Emergency SOS Alert',
        message: 'SOS signal detected from John Doe in Victoria Island',
        type: 'sos',
        read: true,
        data: { latitude: 6.4281, longitude: 3.4219 },
        created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    },
    {
        id: '4',
        user_id: 'user1',
        title: 'Child Pickup Time',
        message: 'Sarah is ready for pickup. Bus 5 arriving in 15 minutes',
        type: 'checkout',
        read: true,
        data: { student_id: 'student1', bus_id: 'bus5' },
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
        id: '5',
        user_id: 'user1',
        title: 'Safety Alert',
        message: 'Multiple incidents reported on your usual route. Consider alternative',
        type: 'alert',
        read: true,
        data: { route: 'Lekki-VI', incident_count: 3 },
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
        id: '6',
        user_id: 'user1',
        title: 'Subscription Renewed',
        message: 'Your Premium subscription has been renewed for another month',
        type: 'subscription',
        read: true,
        data: { tier: 'premium', amount: 5000 },
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    },
];

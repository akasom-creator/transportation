import { BusTracking } from '@/types';

export const mockBusTracking: BusTracking[] = [
    {
        id: 'bus1',
        school_id: 'school1',
        bus_number: 'Bus 5',
        driver_name: 'Mr. Ibrahim',
        latitude: 6.5054,
        longitude: 3.3567,
        status: 'active',
        student_ids: ['student1', 'student2'],
        route: 'Lekki - Victoria Island Route',
        last_updated: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 min ago
    },
    {
        id: 'bus2',
        school_id: 'school1',
        bus_number: 'Bus 3',
        driver_name: 'Mrs. Amina',
        latitude: 6.4543,
        longitude: 3.3890,
        status: 'active',
        student_ids: ['student3'],
        route: 'Ikoyi - Lekki Route',
        last_updated: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
    },
    {
        id: 'bus3',
        school_id: 'school1',
        bus_number: 'Bus 7',
        driver_name: 'Mr. Ade',
        latitude: 6.4474,
        longitude: 3.4700,
        status: 'inactive',
        student_ids: [],
        route: 'Ajah - Lekki Route',
        last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    },
];

// Simulated route points for animation
export const busRoutePoints = {
    bus1: [
        { lat: 6.5054, lng: 3.3567 },
        { lat: 6.4890, lng: 3.3720 },
        { lat: 6.4750, lng: 3.3850 },
        { lat: 6.4600, lng: 3.4100 },
        { lat: 6.4474, lng: 3.4700 }, // School destination
    ],
    bus2: [
        { lat: 6.4543, lng: 3.3890 },
        { lat: 6.4520, lng: 3.4120 },
        { lat: 6.4490, lng: 3.4350 },
        { lat: 6.4474, lng: 3.4700 }, // School destination
    ],
};

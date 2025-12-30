import { Student, CheckIn, School } from '@/types';

export const mockSchools: School[] = [
    {
        id: 'school1',
        name: 'Premium International School',
        address: '45 Admiralty Way, Lekki Phase 1',
        latitude: 6.4474,
        longitude: 3.4700,
        admin_user_id: 'user2',
        phone: '+234 901 234 5678',
        email: 'admin@premiumschool.ng',
        verified: true,
        subscription_tier: 'premium',
        created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'school2',
        name: 'Greenwood Academy',
        address: '12 Orchid Road, Lekki',
        latitude: 6.4543,
        longitude: 3.4615,
        admin_user_id: 'user7',
        phone: '+234 902 345 6789',
        email: 'info@greenwood.ng',
        verified: true,
        subscription_tier: 'family',
        created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const mockStudents: Student[] = [
    {
        id: 'student1',
        school_id: 'school1',
        first_name: 'Sarah',
        last_name: 'Doe',
        grade: 'Grade 5',
        parent_user_ids: ['user1'],
        pickup_authorized_users: ['John Doe', 'Jane Doe', 'Uncle Mike'],
        photo_url: '/avatars/student1.jpg',
        created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'student2',
        school_id: 'school1',
        first_name: 'Michael',
        last_name: 'Johnson',
        grade: 'Grade 3',
        parent_user_ids: ['user5'],
        pickup_authorized_users: ['David Brown', 'Lisa Johnson'],
        photo_url: '/avatars/student2.jpg',
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'student3',
        school_id: 'school1',
        first_name: 'Emily',
        last_name: 'Williams',
        grade: 'Grade 4',
        parent_user_ids: ['user4'],
        pickup_authorized_users: ['Sarah Williams', 'Tom Williams'],
        photo_url: '/avatars/student3.jpg',
        created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const mockCheckIns: CheckIn[] = [
    {
        id: 'checkin1',
        student_id: 'student1',
        school_id: 'school1',
        check_in_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        checked_in_by: 'School Bus Driver',
        notes: 'Arrived via school bus',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'checkin2',
        student_id: 'student2',
        school_id: 'school1',
        check_in_time: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
        checked_in_by: 'Parent Drop-off',
        notes: 'Dropped by mother',
        created_at: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'checkin3',
        student_id: 'student3',
        school_id: 'school1',
        check_in_time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        check_out_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
        checked_in_by: 'School Bus',
        checked_out_by: 'Uncle Tom',
        pickup_person: 'Tom Williams',
        notes: 'Regular pickup',
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'checkin4',
        student_id: 'student1',
        school_id: 'school1',
        check_in_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        check_out_time: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        checked_in_by: 'School Bus',
        checked_out_by: 'Mother',
        pickup_person: 'Jane Doe',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
];

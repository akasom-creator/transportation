export const mockUsers = {
    // Parent account - can see children dashboard
    parent: {
        email: 'parent@demo.com',
        password: 'demo123',
        role: 'parent',
        name: 'John Doe',
        redirectTo: '/dashboard/children',
    },
    // School admin - can see school check-in dashboard
    school: {
        email: 'school@demo.com',
        password: 'demo123',
        role: 'school_admin',
        name: 'School Admin',
        redirectTo: '/dashboard/school/checkin',
    },
    // Super admin - can see admin dashboard
    admin: {
        email: 'admin@demo.com',
        password: 'demo123',
        role: 'super_admin',
        name: 'Super Admin',
        redirectTo: '/dashboard/admin',
    },
    // Regular user - sees main dashboard
    user: {
        email: 'user@demo.com',
        password: 'demo123',
        role: 'user',
        name: 'Demo User',
        redirectTo: '/dashboard',
    },
};

export function mockLogin(email: string, password: string) {
    const user = Object.values(mockUsers).find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        // Store in localStorage for mock auth
        if (typeof window !== 'undefined') {
            localStorage.setItem('mockUser', JSON.stringify(user));
        }
        return { success: true, user, redirectTo: user.redirectTo };
    }

    return { success: false, error: 'Invalid credentials' };
}

export function mockLogout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('mockUser');
    }
}

export function getMockUser() {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('mockUser');
        if (stored) {
            return JSON.parse(stored);
        }
    }
    return null;
}

# Mock Authentication - Demo Accounts

## Quick Access

For easy testing, use these one-click demo accounts:

### Parent Account
- **Email**: `parent@demo.com`
- **Password**: `demo123`
- **Access**: Children dashboard, bus tracking, notifications
- **Route**: `/dashboard/children`

### School Admin Account
- **Email**: `school@demo.com`
- **Password**: `demo123`
- **Access**: Student check-in dashboard, attendance tracking
- **Route**: `/dashboard/school/checkin`

### Super Admin Account
- **Email**: `admin@demo.com`
- **Password**: `demo123`
- **Access**: Live user tracking, user management, incident moderation
- **Route**: `/dashboard/admin`

### Regular User Account
- **Email**: `user@demo.com`
- **Password**: `demo123`
- **Access**: Main dashboard, incidents, notifications
- **Route**: `/dashboard`

## How to Login

### Option 1: Quick Login Buttons
1. Go to `/auth/login`
2. Click the role button you want to test:
   - **Parent** button → Children dashboard
   - **School Admin** button → Check-in dashboard
   - **Super Admin** button → Admin dashboard
   - **Regular User** button → Main dashboard

### Option 2: Manual Login
1. Go to `/auth/login`
2. Enter email and password from above
3. Click "Sign In"

## Features by Role

### Parent Dashboard
- View all children (Sarah Doe - Grade 5)
- Check today's attendance
- View QR codes for check-in
- Track school bus location
- See authorized pickup persons

### School Admin Dashboard
- See all students (3 total)
- View present students (2 currently)
- Check out students
- View checked-out students (1)
- Track absence

### Super Admin Dashboard
- Live user tracking map (5 active users)
- User management (7 total users)
- Incident moderation (8 incidents)
- Platform statistics
- System monitoring

### Regular User Dashboard
- View incident map
- Report incidents
- See notifications (6 unread)
- Safety scores
- Community alerts

## How It Works

Mock authentication uses `localStorage` to store the logged-in user:

```typescript
// Login
localStorage.setItem('mockUser', JSON.stringify(user));

// Get current user
const user = JSON.parse(localStorage.getItem('mockUser'));

// Logout
localStorage.removeItem('mockUser');
```

## Testing Different Flows

### Test Parent Flow
1. Login as **parent@demo.com**
2. See 1 child (Sarah)
3. Click "View QR Code"
4. Go to Bus Tracking
5. See Bus 5 with Sarah on board

### Test School Admin Flow
1. Login as **school@demo.com**
2. See 3 students total
3. See 2 present, 1 checked out
4. Click "Check Out" on a student
5. See count update

### Test Super Admin Flow
1. Login as **admin@demo.com**
2. See live map with 5 users
3. Go to User Management
4. Filter by role
5. Go to Incident Moderation
6. Verify incidents

## Production Notes

In production, replace with real authentication:
- Supabase Auth for user management
- JWT tokens for sessions
- Row Level Security (RLS) for data access
- Password hashing (bcrypt)
- Email verification
- 2FA support

For now, this mock system lets you test all dashboards instantly!

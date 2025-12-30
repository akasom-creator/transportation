# SafeGuard Nigeria

A comprehensive safety platform for Nigeria combining community incident reporting, real-time alerts, school safety tracking, traveler protection, and super admin monitoring.

![SafeGuard Nigeria](https://via.placeholder.com/800x400?text=SafeGuard+Nigeria)

## 🚀 Features

### For Everyone
- 📍 **Live Incident Mapping** - Real-time incident visualization with danger zones
- 🚨 **Safety Alerts** - Location-based notifications for your area
- 🗺️ **Safe Route Recommendations** - AI-powered route safety scoring
- 📊 **Safety Statistics** - Community safety metrics and trends

### For Parents
- 👨‍👩‍👧 **Family Location Sharing** - Track family members in real-time
- 🎒 **School Check-in Tracking** - Automated notifications when children arrive/leave
- 🚌 **Bus Tracking** - Live bus location updates
- 🆘 **Emergency SOS** - One-tap alerts to emergency contacts

### For Schools
- ✅ **Student Check-in System** - QR code and manual check-in/out
- 📱 **Parent Notifications** - Automated SMS/push for attendance
- 🚍 **Fleet Tracking** - Real-time bus location for all routes
- 📈 **Analytics Dashboard** - Attendance and safety metrics

### For Travelers
- 🛣️ **Route Safety Checker** - Check incident history along your route
- 🚗 **Trip Tracking** - Share live location with family during trips
- 🏢 **Verified Transport Companies** - Directory with safety ratings
- ⏰ **Safe Travel Times** - Recommendations based on incident data

### For Super Admins
- 👥 **Live User Tracking** - Real-time map of all users (with privacy controls)
- ✔️ **Incident Verification** - Moderate and verify reported incidents
- 📊 **Analytics Dashboard** - Platform-wide metrics and heat maps
- 👤 **User Management** - Manage subscriptions, ban users, view logs

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL + PostGIS)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Real-time subscriptions
- **Maps**: Mapbox GL JS
- **Payments**: Paystack
- **SMS**: Termii
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Mapbox API key
- Paystack account (for payments)
- Termii account (for SMS)

### Setup

1. **Clone and install dependencies**
```bash
git clone https://github.com/yourusername/safeguard-nigeria.git
cd safeguard-nigeria
npm install
```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the database migration:
     ```bash
     # Copy the SQL from supabase/migrations/001_initial_schema.sql
     # Paste and run in Supabase SQL Editor
     ```

3. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
PAYSTACK_SECRET_KEY=your_paystack_secret
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
TERMII_API_KEY=your_termii_api_key
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🗄️ Database Schema

Key tables:
- `users` - Extended user profiles with roles
- `incidents` - Incident reports with geospatial data
- `schools` - School information
- `students` - Student profiles linked to parents
- `check_ins` - School attendance records
- `bus_tracking` - Live bus locations
- `user_locations` - Real-time user positions (opt-in)
- `trips` - Travel tracking records
- `notifications` - In-app notifications
- `subscriptions` - Payment and tier management

See `supabase/migrations/001_initial_schema.sql` for full schema.

## 🔐 Authentication & Roles

User roles:
- `parent` - Access to family and school features
- `school_admin` - Manage school, students, and tracking
- `security` - Estate/community security personnel
- `traveler` - Access to travel safety features
- `super_admin` - Full platform access and monitoring

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Custom Domain
Configure your domain in Vercel settings and update `NEXT_PUBLIC_APP_URL`.

## 📱 Features Roadmap

- [x] Incident reporting and mapping
- [x] School check-in system
- [x] Super admin dashboard
- [x] Live user tracking
- [x] Payment integration
- [x] PWA support & Offline mode with sync
- [x] Dynamic Safety Routing & Incident Overrides
- [x] High-Intensity SOS Emergency System
- [ ] AI-powered incident prediction
- [ ] Integration with NEMA/Police APIs
- [ ] Advanced analytics with ML

## 💰 Subscription Tiers

| Feature | Free | Family (₦2,500/mo) | Premium (₦5,000/mo) |
|---------|------|-------------|---------|
| Incident viewing | ✅ | ✅ | ✅ |
| Incident reporting | ✅ | ✅ | ✅ |
| Safety alerts | ✅ | ✅ | ✅ |
| Family location sharing | ❌ | ✅ | ✅ |
| School tracking | ❌ | 1 child | 3 children |
| Bus tracking | ❌ | ✅ | ✅ |
| Trip tracking | ❌ | ❌ | ✅ |
| Emergency SOS | ❌ | ❌ | ✅ |
| Priority support | ❌ | ❌ | ✅ |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and Supabase
- Maps powered by Mapbox
- Payments by Paystack
- SMS by Termii

## 📞 Support

For support, email support@safeguardnigeria.com or join our Slack channel.

---

**Made with ❤️ for a safer Nigeria**
"# transportation" 

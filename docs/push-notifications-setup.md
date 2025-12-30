# Push Notifications Setup (Firebase Cloud Messaging)

## Overview

Firebase Cloud Messaging (FCM) enables real-time push notifications for:
- Instant incident alerts
- Child safety notifications
- Emergency broadcasts
- In-app updates

## Setup Steps

### 1. Create Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add project"
3. Name it "SafeGuard Nigeria"
4. Enable Google Analytics (optional)
5. Create project

### 2. Add Web App

1. In Firebase console, click the web icon (</>)
2. Register app as "SafeGuard Web"
3. Copy the Firebase config object
4. Click "Continue to console"

### 3. Enable Cloud Messaging

1. Go to **Project Settings** → **Cloud Messaging**
2. Under **Web configuration**, click "Generate key pair"
3. Copy the **VAPID key**
4. Copy **Server Key** (for backend)

### 4. Add to Environment Variables

```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key

# Server-side only (.env)
FIREBASE_SERVER_KEY=your_server_key
```

## Implementation

### 1. Install Firebase

```bash
npm install firebase
```

### 2. Create Firebase Config

Create `lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
```

### 3. Create Service Worker

Create `public/firebase-messaging-sw.js`:

```javascript
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

### 4. Request Permission & Get Token

Create `lib/notifications/push.ts`:

```typescript
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      
      // Save token to database for this user
      await saveTokenToDatabase(token);
      
      return token;
    }
  } catch (error) {
    console.error('Error getting notification permission:', error);
  }
}

export function listenForMessages(callback: (payload: any) => void) {
  return onMessage(messaging, callback);
}

async function saveTokenToDatabase(token: string) {
  // Save to Supabase users table
  await fetch('/api/notifications/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
}
```

### 5. Send Notifications (Backend)

Create `app/api/notifications/send/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { tokens, title, body, data } = await req.json();

  const message = {
    notification: { title, body },
    data,
    tokens, // Array of FCM tokens
  };

  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
    },
    body: JSON.stringify(message),
  });

  return NextResponse.json(await response.json());
}
```

## Usage Examples

### Client-Side (Request Permission)

```typescript
'use client';

import { useEffect } from 'react';
import { requestNotificationPermission, listenForMessages } from '@/lib/notifications/push';

export function useNotifications() {
  useEffect(() => {
    // Request permission on mount
    requestNotificationPermission();

    // Listen for foreground messages
    const unsubscribe = listenForMessages((payload) => {
      console.log('Received message:', payload);
      // Show in-app notification
      showToast(payload.notification.title, payload.notification.body);
    });

    return () => unsubscribe();
  }, []);
}
```

### Server-Side (Send Notification)

```typescript
// Send to specific user
await fetch('/api/notifications/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tokens: [userFcmToken],
    title: 'Child Check-in',
    body: `${childName} arrived safely at school`,
    data: {
      type: 'checkin',
      student_id: studentId,
    },
  }),
});

// Broadcast to all users in area
const nearbyUsers = await getUsersNearLocation(lat, lng, radius);
const tokens = nearbyUsers.map(u => u.fcm_token).filter(Boolean);

await fetch('/api/notifications/send', {
  method: 'POST',
  body: JSON.stringify({
    tokens,
    title: 'Safety Alert',
    body: `High severity incident reported in ${area}`,
    data: { type: 'incident', incident_id: incidentId },
  }),
});
```

## Notification Types

### Critical (Immediate)
- 🚨 Emergency SOS alerts
- 🚨 Critical incidents nearby
- 🚨 Child emergency

### High Priority
- ⚠️ High severity incidents
- ⚠️ Child pickup time
- ⚠️ Trip safety alerts

### Normal Priority
- ℹ️ Check-in confirmations
- ℹ️ General safety updates
- ℹ️ Subscription reminders

## Testing

1. Open your app in browser
2. Click "Allow" when prompted for notifications
3. Check browser console for FCM token
4. Use Firebase Console → Cloud Messaging → Send test message
5. Verify notification appears

## Best Practices

1. **Permission**: Only request after explaining value
2. **Frequency**: Don't spam (max 3-5/day)
3. **Relevance**: Only send relevant notifications
4. **Clear**: Make title and body actionable
5. **Data**: Include action data in payload

## Troubleshooting

**Permission denied?**
- Clear site data and try again
- Check browser supports notifications
- Ensure HTTPS (required for FCM)

**Token not generated?**
- Verify VAPID key is correct
- Check Firebase config
- Ensure service worker is registered

**Notifications not received?**
- Check user has granted permission
- Verify FCM token is saved
- Test with Firebase Console first
- Check browser notification settings

## Cost

FCM is **completely free** with unlimited messages! 🎉

## Next Steps

1. Create Firebase project
2. Add web app and get credentials
3. Implement permission request
4. Test with Firebase Console
5. Integrate with your backend
6. Add user notification preferences

'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { User, UserLocation } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface LiveUserTrackerProps {
  users: ({ user: User; location: UserLocation })[];
  onUserClick?: (userId: string) => void;
  center?: [number, number];
  zoom?: number;
}

export function LiveUserTracker({
  users = [],
  onUserClick,
  center = [3.3792, 6.5244],
  zoom = 11,
}: LiveUserTrackerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || token.includes('your_mapbox')) {
      console.warn('Mapbox token not configured');
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: center,
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update user markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const currentUserIds = new Set(users.map(u => u.user.id));

    // Remove markers for users no longer in the list
    Object.keys(markersRef.current).forEach(userId => {
      if (!currentUserIds.has(userId)) {
        markersRef.current[userId].remove();
        delete markersRef.current[userId];
      }
    });

    // Add or update markers for current users
    users.forEach(({ user, location }) => {
      const roleColors = {
        parent: '#3b82f6',
        school_admin: '#8b5cf6',
        security: '#eab308',
        traveler: '#22c55e',
        super_admin: '#ef4444',
      };

      const color = roleColors[user.role] || '#6b7280';

      // Create or update marker
      if (markersRef.current[user.id]) {
        // Update existing marker position
        markersRef.current[user.id].setLngLat([location.longitude, location.latitude]);
      } else {
        // Create new marker
        const el = document.createElement('div');
        el.className = 'live-user-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = color;
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.3s ease';

        // Add pulse animation
        el.style.animation = 'live-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)';
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        el.addEventListener('click', () => {
          if (onUserClick) {
            onUserClick(user.id);
          }
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 12px; min-width: 220px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color};"></div>
              <h3 style="margin: 0; font-weight: 600; font-size: 14px;">${user.full_name}</h3>
            </div>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${user.email}</p>
            <div style="margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
              <span style="display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background-color: ${color}; color: white;">${user.role.replace('_', ' ')}</span>
              <span style="display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background-color: #10b981; color: white;">${user.subscription_tier}</span>
            </div>
            <p style="margin-top: 8px; font-size: 11px; color: #888;">
              Last updated: ${new Date(location.updated_at).toLocaleTimeString()}
            </p>
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .setPopup(popup)
          .addTo(map.current!);

        markersRef.current[user.id] = marker;
      }
    });
  }, [mapLoaded, users, onUserClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading live tracker...</p>
          </div>
        </div>
      )}

      {(!process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN.includes('your_mapbox')) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="text-center p-8">
            <p className="text-white font-semibold mb-2">Mapbox Token Required</p>
            <p className="text-gray-400 text-sm">
              Add your Mapbox token to <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code>
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes live-pulse {
          0%, 100% {
            box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
}

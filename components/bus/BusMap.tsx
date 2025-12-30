'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BusTracking } from '@/types';

interface BusMapProps {
  buses: BusTracking[];
  onBusClick?: (bus: BusTracking) => void;
  center?: [number, number];
  zoom?: number;
}

export function BusMap({
  buses,
  onBusClick,
  center = [3.4700, 6.4474], // School location
  zoom = 12,
}: BusMapProps) {
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
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add school marker
    const schoolEl = document.createElement('div');
    schoolEl.className = 'school-marker';
    schoolEl.innerHTML = '🏫';
    schoolEl.style.fontSize = '32px';
    schoolEl.style.cursor = 'pointer';

    new mapboxgl.Marker(schoolEl)
      .setLngLat(center)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<div style="padding: 8px;"><strong>Premium International School</strong></div>'
        )
      )
      .addTo(map.current);

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update bus markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const activeBusIds = new Set(buses.filter(b => b.status === 'active').map(b => b.id));

    // Remove markers for inactive buses
    Object.keys(markersRef.current).forEach(busId => {
      if (!activeBusIds.has(busId)) {
        markersRef.current[busId].remove();
        delete markersRef.current[busId];
      }
    });

    // Add or update markers for active buses
    buses.filter(bus => bus.status === 'active').forEach((bus) => {
      if (markersRef.current[bus.id]) {
        // Update existing marker position
        markersRef.current[bus.id].setLngLat([bus.longitude, bus.latitude]);
      } else {
        // Create new marker
        const el = document.createElement('div');
        el.className = 'bus-marker';
        el.innerHTML = '🚌';
        el.style.fontSize = '32px';
        el.style.cursor = 'pointer';
        el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
        el.style.transition = 'all 0.5s ease';

        el.addEventListener('click', () => {
          if (onBusClick) {
            onBusClick(bus);
          }
        });

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        const timeSinceUpdate = Date.now() - new Date(bus.last_updated).getTime();
        const minutesAgo = Math.floor(timeSinceUpdate / 60000);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 12px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">${bus.bus_number}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Driver: ${bus.driver_name}</p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Route: ${bus.route}</p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Students: ${bus.student_ids.length}</p>
            <p style="margin-top: 8px; font-size: 11px; color: #888;">Updated ${minutesAgo} min ago</p>
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([bus.longitude, bus.latitude])
          .setPopup(popup)
          .addTo(map.current!);

        markersRef.current[bus.id] = marker;
      }
    });
  }, [mapLoaded, buses, onBusClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading bus tracker...</p>
          </div>
        </div>
      )}

      {(!process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN.includes('your_mapbox')) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center p-8">
            <p className="text-gray-900 dark:text-white font-semibold mb-2">Mapbox Token Required</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Add your Mapbox token to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

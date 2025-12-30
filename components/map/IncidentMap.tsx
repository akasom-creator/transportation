'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Incident } from '@/types';

interface IncidentMapProps {
  incidents: Incident[];
  onIncidentClick?: (incident: Incident) => void;
  center?: [number, number];
  zoom?: number;
  style?: string;
}

export function IncidentMap({
  incidents = [],
  onIncidentClick,
  center = [3.3792, 6.5244], // Lagos, Nigeria
  zoom = 11,
  style = 'mapbox://styles/mapbox/streets-v12',
}: IncidentMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Check if Mapbox token is available
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || token.includes('your_mapbox')) {
      console.warn('Mapbox token not configured. Map will not load.');
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: style,
      center: center,
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Add incident markers
  useEffect(() => {
    if (!map.current || !mapLoaded || incidents.length === 0) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.incident-marker');
    existingMarkers.forEach((marker) => marker.remove());

    // Add new markers
    incidents.forEach((incident) => {
      const el = document.createElement('div');
      el.className = 'incident-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      // Color based on severity
      const severityColors = {
        low: '#fbbf24',
        medium: '#fb923c',
        high: '#ef4444',
        critical: '#991b1b',
      };
      el.style.backgroundColor = severityColors[incident.severity];

      // Add pulsing animation for high/critical
      if (incident.severity === 'high' || incident.severity === 'critical') {
        el.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
      }

      // Click handler
      el.addEventListener('click', () => {
        if (onIncidentClick) {
          onIncidentClick(incident);
        }
      });

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">${incident.title}</h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${incident.description || 'No description'}</p>
          <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background-color: ${
              severityColors[incident.severity]
            }; color: white;">${incident.severity}</span>
            <span style="font-size: 11px; color: #888;">${new Date(incident.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([incident.longitude, incident.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [mapLoaded, incidents, onIncidentClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        </div>
      )}

      {/* No token warning */}
      {(!process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN.includes('your_mapbox')) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center p-8">
            <p className="text-gray-900 dark:text-white font-semibold mb-2">Mapbox Token Required</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Please add your Mapbox token to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code>
            </p>
          </div>
        </div>
      )}

      {/* Add CSS for pulsing animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

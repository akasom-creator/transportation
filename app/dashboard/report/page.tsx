'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { INCIDENT_TYPES } from '@/lib/constants';
import { AlertTriangle, MapPin, Camera, FileText } from 'lucide-react';
import { saveIncidentOffline } from '@/lib/offlineStore';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { savePersistentIncident } from '@/lib/incidentStorage';
import { Incident, IncidentType, IncidentSeverity } from '@/types';

export default function ReportIncidentPage() {
  const [formData, setFormData] = useState({
    type: '' as IncidentType,
    severity: 'medium' as IncidentSeverity,
    title: '',
    description: '',
    location: '',
    latitude: 6.5244,
    longitude: 3.3792,
  });

  const { isOnline } = useOfflineSync();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const incidentData: Incident = {
      id: Math.random().toString(36).substring(2, 9),
      user_id: 'current-user', // In reality, get from auth context
      type: formData.type as IncidentType,
      severity: formData.severity as IncidentSeverity,
      title: formData.title,
      description: formData.description,
      latitude: formData.latitude,
      longitude: formData.longitude,
      address: formData.location || 'Lekki, Lagos',
      verified: false,
      anonymous: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!isOnline) {
      try {
        await saveIncidentOffline(incidentData as any);
        alert('📴 You are offline. Your report has been saved locally and will be automatically uploaded when you are back online.');
      } catch (error) {
        console.error('Failed to save offline:', error);
        alert('❌ Error saving report locally.');
        return;
      }
    } else {
      // In production: send to API
      console.log('Sending Incident Report to Storage:', incidentData);
      savePersistentIncident(incidentData);
      alert('✅ Incident reported successfully! Your report is pending verification by our team.');
    }
    
    // Redirect to incidents map
    setTimeout(() => {
      window.location.href = '/dashboard/incidents';
    }, 1000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          alert('📍 Location captured successfully!');
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="w-7 h-7 mr-2 text-danger-600" />
              Report Incident
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Help keep your community safe by reporting incidents
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
            Cancel
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Incident Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as IncidentType })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select incident type</option>
                  {INCIDENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Severity Level *
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['low', 'medium', 'high', 'critical'].map((severity) => (
                    <button
                      key={severity}
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: severity as IncidentSeverity })}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        formData.severity === severity
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <Badge severity={severity as any} className="w-full">
                        {severity}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief description of the incident"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about the incident"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location *
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Lekki Phase 1, Lagos"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Use My Location
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                </p>
              </div>

              {/* Media Upload (Future) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Photo/Video upload coming soon
                  </p>
                  <p className="text-xs text-gray-500">
                    In production: Upload photos or videos as evidence
                  </p>
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Report anonymously (your identity will not be shared)
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1" variant="danger">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Submit Report
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-primary-200 bg-primary-50 dark:bg-primary-900/10">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Reporting Guidelines
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Only report genuine incidents to help others stay safe</li>
                  <li>• Provide accurate location and description</li>
                  <li>• For emergencies, call 112 or 911 immediately</li>
                  <li>• Your report will be verified by our team before publication</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

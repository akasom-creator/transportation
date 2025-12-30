'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { IncidentMap } from '@/components/map/IncidentMap';
import { mockIncidents } from '@/lib/mockData';
import { Incident, IncidentType, IncidentSeverity } from '@/types';
import { INCIDENT_TYPES, SEVERITY_LEVELS } from '@/lib/constants';
import { formatTimeAgo, getIncidentTypeIcon } from '@/lib/utils';
import { MapPin, Filter, AlertTriangle, Shield } from 'lucide-react';

import { getPersistentIncidents } from '@/lib/incidentStorage';

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [typeFilter, setTypeFilter] = useState<IncidentType | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity | 'all'>('all');

  React.useEffect(() => {
    setIncidents(getPersistentIncidents());
    
    const handleStorageChange = () => {
      setIncidents(getPersistentIncidents());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter incidents
  const filteredIncidents = incidents.filter((incident) => {
    const typeMatch = typeFilter === 'all' || incident.type === typeFilter;
    const severityMatch = severityFilter === 'all' || incident.severity === severityFilter;
    return typeMatch && severityMatch;
  });

  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <MapPin className="w-7 h-7 mr-2 text-primary-600" />
              Incident Map
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time incident visualization for Lagos
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'}>
            <Shield className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Live Incident Map</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="info">{filteredIncidents.length} incidents</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <IncidentMap
                    incidents={filteredIncidents}
                    onIncidentClick={handleIncidentClick}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Incident Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    {INCIDENT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {getIncidentTypeIcon(type.value)} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Severity Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Severity Level
                  </label>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All Levels</option>
                    {SEVERITY_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setTypeFilter('all');
                    setSeverityFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Selected Incident */}
            {selectedIncident && (
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {selectedIncident.title}
                      </h3>
                      <Badge severity={selectedIncident.severity}>
                        {selectedIncident.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedIncident.description}
                    </p>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedIncident.address}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {selectedIncident.type.replace('_', ' ')}
                      </div>
                      <div className="text-xs text-gray-500">
                        Reported {formatTimeAgo(selectedIncident.created_at)}
                      </div>
                      {selectedIncident.verified && (
                        <Badge variant="success" size="sm">Verified</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Severity Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {SEVERITY_LEVELS.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: 
                            level.value === 'low' ? '#fbbf24' :
                            level.value === 'medium' ? '#fb923c' :
                            level.value === 'high' ? '#ef4444' :
                            '#991b1b'
                        }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {level.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

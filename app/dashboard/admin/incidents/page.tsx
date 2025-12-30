'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockIncidents } from '@/lib/mockData';
import { Incident } from '@/types';
import { formatTimeAgo, getIncidentTypeIcon } from '@/lib/utils';
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  Eye,
} from 'lucide-react';

import { getPersistentIncidents, updatePersistentIncident } from '@/lib/incidentStorage';

export default function AdminIncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  useEffect(() => {
    setIncidents(getPersistentIncidents());
    
    const handleStorageChange = () => {
      setIncidents(getPersistentIncidents());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    if (filter === 'verified') return incident.verified;
    if (filter === 'unverified') return !incident.verified;
    return true;
  });

  const handleVerify = (id: string) => {
    updatePersistentIncident(id, { verified: true, updated_at: new Date().toISOString() });
    setIncidents(getPersistentIncidents());
    alert('✅ Incident verified! Global alert has been broadcasted to all users.');
  };

  const handleReject = (id: string) => {
    // For demo purposes, we'll just mark it as verified: false but we could also delete it
    // But since the mock data is persistent, let's just toast
    alert('❌ Incident report rejected.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="w-7 h-7 mr-2 text-primary-600" />
              Incident Moderation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Verify and moderate reported incidents
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/admin'}>
            <Shield className="w-5 h-5 mr-2" />
            Admin Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  All ({incidents.length})
                </Button>
                <Button
                  variant={filter === 'unverified' ? 'primary' : 'outline'}
                  onClick={() => setFilter('unverified')}
                >
                  Unverified ({incidents.filter(i => !i.verified).length})
                </Button>
                <Button
                  variant={filter === 'verified' ? 'primary' : 'outline'}
                  onClick={() => setFilter('verified')}
                >
                  Verified ({incidents.filter(i => i.verified).length})
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold">{filteredIncidents.length}</span> incidents
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <Card key={incident.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getIncidentTypeIcon(incident.type)}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {incident.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {incident.address}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {incident.description}
                    </p>

                    <div className="flex items-center space-x-3 mb-4">
                      <Badge severity={incident.severity}>{incident.severity}</Badge>
                      <Badge variant="info">{incident.type.replace('_', ' ')}</Badge>
                      {incident.verified && <Badge variant="success">Verified</Badge>}
                      {incident.anonymous && <Badge variant="default">Anonymous</Badge>}
                    </div>

                    <div className="text-xs text-gray-500">
                      Reported {formatTimeAgo(incident.created_at)}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {!incident.verified && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleVerify(incident.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(incident.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

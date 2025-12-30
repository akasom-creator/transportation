'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BusMap } from '@/components/bus/BusMap';
import { mockBusTracking } from '@/lib/mockBusData';
import { mockStudents } from '@/lib/mockSchoolData';
import { BusTracking } from '@/types';
import { Bus, MapPin, Clock, Users, Shield, Activity } from 'lucide-react';
import { formatTimeAgo, calculateDistance, formatDistance } from '@/lib/utils';

export default function BusTrackingPage() {
  const [buses, setBuses] = useState<BusTracking[]>(mockBusTracking);
  const [selectedBus, setSelectedBus] = useState<BusTracking | null>(null);

  // School location  
  const schoolLocation = { lat: 6.4474, lng: 3.4700 };

  // Simulate real-time updates (in production, use Supabase real-time)
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses =>
        prevBuses.map(bus => {
          if (bus.status === 'active') {
            // Simulate movement towards school (simplified)
            const newLat = bus.latitude + (Math.random() - 0.5) * 0.002;
            const newLng = bus.longitude + (Math.random() - 0.5) * 0.002;
            
            return {
              ...bus,
              latitude: newLat,
              longitude: newLng,
              last_updated: new Date().toISOString(),
            };
          }
          return bus;
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const activeBuses = buses.filter(b => b.status === 'active');

  const getStudentNames = (studentIds: string[]) => {
    return studentIds
      .map(id => {
        const student = mockStudents.find(s => s.id === id);
        return student ? `${student.first_name} ${student.last_name}` : null;
      })
      .filter(Boolean);
  };

  const calculateETA = (bus: BusTracking) => {
    const distance = calculateDistance(
      bus.latitude,
      bus.longitude,
      schoolLocation.lat,
      schoolLocation.lng
    );
    
    // Assume average speed of 30 km/h in city
    const timeInHours = distance / 30;
    const timeInMinutes = Math.round(timeInHours * 60);
    
    return { distance, eta: timeInMinutes };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Bus className="w-7 h-7 mr-2 text-primary-600" />
              Live Bus Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track school buses in real-time
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/children'}>
            <Shield className="w-5 h-5 mr-2" />
            My Children
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Buses</p>
                  <p className="text-3xl font-bold text-success-600">{activeBuses.length}</p>
                </div>
                <Activity className="w-10 h-10 text-success-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Students on Board</p>
                  <p className="text-3xl font-bold text-primary-600">
                    {activeBuses.reduce((sum, bus) => sum + bus.student_ids.length, 0)}
                  </p>
                </div>
                <Users className="w-10 h-10 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Routes</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{buses.length}</p>
                </div>
                <MapPin className="w-10 h-10 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Bus Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <BusMap
                    buses={activeBuses}
                    onBusClick={setSelectedBus}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Bus Details */}
            {selectedBus && (
              <Card>
                <CardHeader>
                  <CardTitle>Bus Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                        {selectedBus.bus_number}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedBus.route}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Driver:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedBus.driver_name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Students:</span>
                        <Badge variant="info">{selectedBus.student_ids.length}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(selectedBus.last_updated)}
                        </span>
                      </div>
                      {(() => {
                        const { distance, eta } = calculateETA(selectedBus);
                        return (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formatDistance(distance)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">ETA:</span>
                              <Badge variant="success">{eta} min</Badge>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {selectedBus.student_ids.length > 0 && (
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Students on Board:
                        </h4>
                        <div className="space-y-1">
                          {getStudentNames(selectedBus.student_ids).map((name, index) => (
                            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                              • {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Buses List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Buses ({activeBuses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeBuses.map((bus) => {
                    const { eta } = calculateETA(bus);
                    return (
                      <div
                        key={bus.id}
                        onClick={() => setSelectedBus(bus)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                          selectedBus?.id === bus.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {bus.bus_number}
                          </h4>
                          <Badge variant="success" size="sm">
                            <Clock className="w-3 h-3 mr-1" />
                            {eta} min
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {bus.driver_name}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{bus.student_ids.length} students</span>
                          <span className="text-gray-500">{formatTimeAgo(bus.last_updated)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

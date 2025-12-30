'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BusMap } from '@/components/bus/BusMap';
import { mockBusTracking } from '@/lib/mockBusData';
import { mockStudents } from '@/lib/mockSchoolData';
import { Bus, School, MapPin, Shield } from 'lucide-react';

export default function SchoolBusTrackingPage() {
  const activeBuses = mockBusTracking.filter(b => b.status === 'active');
  
  // Get students for this school
  const schoolStudents = mockStudents;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Bus className="w-7 h-7 mr-2 text-primary-600" />
              School Bus Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track all school buses and students in real-time
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/school/checkin'}>
            <School className="w-5 h-5 mr-2" />
            Student Check-in
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success-600">
                  {activeBuses.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Buses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">
                  {activeBuses.reduce((sum, bus) => sum + bus.student_ids.length, 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Students on Buses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {schoolStudents.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle>Live Bus Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <BusMap buses={activeBuses} />
            </div>
          </CardContent>
        </Card>

        {/* Bus List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Active Buses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeBuses.map((bus) => {
                const students = bus.student_ids
                  .map(id => schoolStudents.find(s => s.id === id))
                  .filter(Boolean);
                
                return (
                  <div
                    key={bus.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {bus.bus_number}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Driver: {bus.driver_name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Route: {bus.route}
                    </p>
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Students on board ({students.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {students.map((student: any) => (
                          <span
                            key={student.id}
                            className="text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded"
                          >
                            {student.first_name} {student.last_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

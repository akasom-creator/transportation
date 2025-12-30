'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockStudents, mockCheckIns, mockSchools } from '@/lib/mockSchoolData';
import { Student, CheckIn } from '@/types';
import { School, Users, QrCodeIcon, CheckCircle, Clock, AlertCircle, Bus } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

export default function SchoolCheckInPage() {
  const school = mockSchools[0]; // Premium International School
  const students = mockStudents.filter(s => s.school_id === school.id);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(mockCheckIns);

  // Get today's check-ins
  const today = new Date();
  const todayCheckIns = checkIns.filter(c => {
    const checkInDate = new Date(c.check_in_time!);
    return checkInDate.toDateString() === today.toDateString();
  });

  const presentStudents = todayCheckIns.filter(c => !c.check_out_time);
  const checkedOutStudents = todayCheckIns.filter(c => c.check_out_time);
  const absentStudents = students.length - todayCheckIns.length;

  const getStudentInfo = (studentId: string) => {
    return students.find(s => s.id === studentId);
  };

  const handleCheckOut = (checkInId: string, studentId: string) => {
    setCheckIns(checkIns.map(c => 
      c.id === checkInId 
        ? { ...c, check_out_time: new Date().toISOString(), checked_out_by: 'School Admin' }
        : c
    ));

    // In production: send SMS to parent
    const student = getStudentInfo(studentId);
    console.log(`SMS: ${student?.first_name} ${student?.last_name} has been checked out.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <School className="w-7 h-7 mr-2 text-primary-600" />
              {school.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Student Check-in Management
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100"
              onClick={() => alert('Launching QR Scanner... Place student ID card in front of camera.')}
            >
              <QrCodeIcon className="w-5 h-5 mr-2" />
              Scan ID
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/dashboard/school/buses'}
            >
              <Bus className="w-5 h-5 mr-2" />
              Track Buses
            </Button>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {students.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success-600 mb-1">
                  {presentStudents.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 mb-1">
                  {checkedOutStudents.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Checked Out</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-danger-600 mb-1">
                  {absentStudents}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Not Checked In</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Present Students */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Students Present ({presentStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {presentStudents.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No students present
              </p>
            ) : (
              <div className="space-y-3">
                {presentStudents.map((checkIn) => {
                  const student = getStudentInfo(checkIn.student_id);
                  if (!student) return null;
                  
                  return (
                    <div
                      key={checkIn.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="w-6 h-6 text-success-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {student.first_name} {student.last_name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {student.grade} • Checked in {formatTimeAgo(checkIn.check_in_time!)}
                          </p>
                          {checkIn.checked_in_by && (
                            <p className="text-xs text-gray-500">By: {checkIn.checked_in_by}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCheckOut(checkIn.id, student.id)}
                      >
                        Check Out
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checked Out Students */}
        <Card>
          <CardHeader>
            <CardTitle>Checked Out Today ({checkedOutStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {checkedOutStudents.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No students checked out yet
              </p>
            ) : (
              <div className="space-y-3">
                {checkedOutStudents.map((checkIn) => {
                  const student = getStudentInfo(checkIn.student_id);
                  if (!student) return null;
                  
                  return (
                    <div
                      key={checkIn.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Clock className="w-6 h-6 text-primary-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {student.first_name} {student.last_name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {student.grade}
                          </p>
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span>In: {new Date(checkIn.check_in_time!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            <span>Out: {new Date(checkIn.check_out_time!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          {checkIn.pickup_person && (
                            <p className="text-xs text-gray-500">Picked up by: {checkIn.pickup_person}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="success">Completed</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

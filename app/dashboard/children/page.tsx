'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StudentCard } from '@/components/school/StudentCard';
import { StudentQRCode } from '@/components/school/StudentQRCode';
import { mockStudents, mockCheckIns } from '@/lib/mockSchoolData';
import { Student, CheckIn } from '@/types';
import { School, Users, QrCode, Clock, CheckCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyChildrenPage() {
  const [students] = useState<Student[]>(mockStudents.filter(s => s.parent_user_ids.includes('user1')));
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showQR, setShowQR] = useState(false);

  // Get today's check-ins for user's children
  const todayCheckIns = mockCheckIns.filter(c => {
    const checkInDate = new Date(c.check_in_time!);
    const today = new Date();
    return checkInDate.toDateString() === today.toDateString() &&
           students.some(s => s.id === c.student_id);
  });

  const handleViewQR = (student: Student) => {
    setSelectedStudent(student);
    setShowQR(true);
  };

  const getStudentStatus = (studentId: string) => {
    const todayCheckIn = todayCheckIns.find(c => c.student_id === studentId);
    if (!todayCheckIn) return { status: 'not_checked_in', label: 'Not Checked In', color: 'text-gray-600' };
    if (!todayCheckIn.check_out_time) return { status: 'at_school', label: 'At School', color: 'text-success-600' };
    return { status: 'checked_out', label: 'Checked Out', color: 'text-primary-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Users className="w-7 h-7 mr-2 text-primary-600" />
              My Children
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your children's school attendance
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
        {/* Today's Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Children</p>
              </div>
              <div className="text-center p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                <p className="text-2xl font-bold text-success-600">
                  {todayCheckIns.filter(c => !c.check_out_time).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">At School Now</p>
              </div>
              <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {todayCheckIns.filter(c => c.check_out_time).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Checked Out</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {students.map((student) => {
            const status = getStudentStatus(student.id);
            const todayCheckIn = todayCheckIns.find(c => c.student_id === student.id);
            
            return (
              <Card key={student.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                        {student.first_name} {student.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{student.grade}</p>
                    </div>
                    <Badge variant={status.status === 'at_school' ? 'success' : 'default'}>
                      {status.label}
                    </Badge>
                  </div>

                  {todayCheckIn && (
                    <div className="space-y-2 mb-4">
                      {todayCheckIn.check_in_time && (
                        <div className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-success-600 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Checked in at {new Date(todayCheckIn.check_in_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                      {todayCheckIn.check_out_time && (
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 text-primary-600 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Checked out at {new Date(todayCheckIn.check_out_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                      {todayCheckIn.checked_in_by && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          By: {todayCheckIn.checked_in_by}
                        </p>
                      )}
                    </div>
                  )}

                  <Button size="sm" onClick={() => handleViewQR(student)} className="w-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    View QR Code
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Authorized Pickups */}
        <Card>
          <CardHeader>
            <CardTitle>Authorized Pickup Persons</CardTitle>
          </CardHeader>
          <CardContent>
            {students.map((student) => (
              <div key={student.id} className="mb-6 last:mb-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {student.first_name} {student.last_name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {student.pickup_authorized_users?.map((person, index) => (
                    <Badge key={index} variant="info">
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <StudentQRCode student={selectedStudent} />
              <Button
                variant="outline"
                className="w-full mt-4 bg-white"
                onClick={() => setShowQR(false)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

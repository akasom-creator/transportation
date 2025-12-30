'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { Student } from '@/types';

interface StudentQRCodeProps {
  student: Student;
  size?: number;
}

export function StudentQRCode({ student, size = 200 }: StudentQRCodeProps) {
  // QR code data includes student ID and school ID
  const qrData = JSON.stringify({
    type: 'student_checkin',
    student_id: student.id,
    school_id: student.school_id,
    timestamp: Date.now(),
  });

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      <div className="mb-4 text-center">
        <h3 className="font-semibold text-gray-900 text-lg">
          {student.first_name} {student.last_name}
        </h3>
        <p className="text-sm text-gray-600">{student.grade}</p>
      </div>
      
      <div className="p-4 bg-white border-4 border-gray-200 rounded-lg">
        <QRCode
          value={qrData}
          size={size}
          level="H"
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      
      <p className="mt-4 text-xs text-gray-500 text-center max-w-xs">
        Scan this QR code at school entrance for check-in/check-out
      </p>
    </div>
  );
}

'use client';

import React from 'react';
import { Student } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, QrCode, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface StudentCardProps {
  student: Student;
  onViewQR: (student: Student) => void;
  onEdit?: (student: Student) => void;
}

export function StudentCard({ student, onViewQR, onEdit }: StudentCardProps) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {student.photo_url ? (
              <img
                src={student.photo_url}
                alt={`${student.first_name} ${student.last_name}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {student.first_name} {student.last_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {student.grade}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="info" size="sm">
                {student.pickup_authorized_users?.length || 0} authorized pickups
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onViewQR(student)}
              >
                <QrCode className="w-4 h-4 mr-1" />
                View QR
              </Button>
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(student)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

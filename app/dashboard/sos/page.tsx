'use client';

import React from 'react';
import { PanicButton } from '@/components/safety/PanicButton';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Shield } from 'lucide-react';

export default function EmergencySOSPage() {
  const [contacts, setContacts] = React.useState([
    { name: 'John Doe', phone: '+234 801 234 5678', priority: 1 },
    { name: 'Jane Smith', phone: '+234 802 345 6789', priority: 2 },
    { name: 'Estate Security', phone: '0800-SAFE-GUARD', priority: 3 },
  ]);

  const [isAdding, setIsAdding] = React.useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* High-intensity background pulse for SOS */}
      <div className="absolute inset-0 bg-danger-500/5 animate-pulse pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-danger-500 to-transparent animate-shimmer" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Badge variant="danger" className="mb-4 px-4 py-1 animate-bounce">
            EMERGENCY RESPONSE ACTIVE
          </Badge>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Emergency SOS
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Press and hold to alert {contacts.length} contacts and authorities immediately.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <PanicButton 
            emergencyContacts={contacts}
            onActivate={() => {
              console.log('SOS activated from dedicated page');
            }}
          />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-danger-100 dark:border-danger-900/30 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-danger-600" />
              Emergency Contacts ({contacts.length}/5)
            </h3>
            {contacts.length < 5 && (
              <Button size="sm" variant="ghost" onClick={() => {
                const name = prompt('Enter contact name:');
                const phone = prompt('Enter phone number:');
                if (name && phone) {
                  setContacts([...contacts, { name, phone, priority: contacts.length + 1 }]);
                }
              }}>
                + Add
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">{contact.name}</span>
                  <span className="text-xs text-gray-500">Priority {contact.priority}</span>
                </div>
                <span className="text-danger-600 dark:text-danger-400 font-bold">{contact.phone}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 text-lg font-semibold"
          onClick={() => window.location.href = '/dashboard'}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

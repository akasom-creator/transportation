'use client';

import React, { useState } from 'react';
import {  useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import{ Shield } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'parent' as 'parent' | 'school_admin' | 'traveler',
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '', phone: '' },
    { name: '', phone: '' },
    { name: '', phone: '' },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In production: Send data to Supabase
    console.log('🚀 REGISTERING USER', {
      ...formData,
      emergencyContacts
    });

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const updateContact = (index: number, field: 'name' | 'phone', value: string) => {
    const newContacts = [...emergencyContacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setEmergencyContacts(newContacts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Shield className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              SafeGuard Nigeria
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`h-1.5 w-12 rounded-full ${step === 1 ? 'bg-primary-600' : 'bg-success-500'}`} />
            <div className={`h-1.5 w-12 rounded-full ${step === 2 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {step === 1 ? 'Create Account' : 'Emergency Contacts'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {step === 1 
              ? 'Join thousands protecting their communities' 
              : 'Add up to 3 people to be notified in an emergency'}
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{step === 1 ? 'Step 1: Account Details' : 'Step 2: Security Circle'}</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    I am a
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  >
                    <option value="parent">Parent</option>
                    <option value="school_admin">School Administrator</option>
                    <option value="traveler">Traveler</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="••••••••"
                    minLength={8}
                  />
                </div>

                <div className="flex items-start pt-2">
                  <input type="checkbox" required className="mt-1 rounded text-primary-600 focus:ring-primary-500" />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    I agree to the <Link href="#" className="text-primary-600 hover:underline">Terms of Service</Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Next Step: Security Circle
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  {emergencyContacts.map((contact, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-bold text-primary-600 mb-2 uppercase tracking-widest">Contact #{idx + 1}</p>
                      <div className="grid gap-3">
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => updateContact(idx, 'name', e.target.value)}
                          placeholder="Contact Name"
                          className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                          required
                        />
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => updateContact(idx, 'phone', e.target.value)}
                          placeholder="Phone Number (+234)"
                          className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-[2]" size="lg" isLoading={isLoading}>
                    Complete Registration
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

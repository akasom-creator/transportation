'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, MapPin, Users, Bell, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Welcome to SafeGuard Nigeria',
    description: 'Your comprehensive safety platform for protecting what matters most',
    icon: <Shield className="w-16 h-16 text-primary-600" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          SafeGuard Nigeria helps you:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
            <span>Monitor real-time safety incidents</span>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
            <span>Track your children's school activities</span>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
            <span>Plan safe routes for travel</span>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
            <span>Connect with your community</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Enable Location Sharing',
    description: 'Help us keep you safe with real-time location updates',
    icon: <MapPin className="w-16 h-16 text-primary-600" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Location sharing allows us to:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="mr-2">✓</span>
            <span>Alert you about nearby incidents in real-time</span>
          </li>
          <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="mr-2">✓</span>
            <span>Share your location during emergencies</span>
          </li>
          <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="mr-2">✓</span>
            <span>Provide personalized safety recommendations</span>
          </li>
        </ul>
        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
          <p className="text-sm text-primary-800 dark:text-primary-300">
            <strong>Privacy:</strong> Your location is encrypted and only shared when you choose to.
          </p>
        </div>
        <Button className="w-full" onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              () => alert('✓ Location access granted!'),
              () => alert('Location access denied. You can enable it later in settings.')
            );
          }
        }}>
          Enable Location Access
        </Button>
      </div>
    ),
  },
  {
    title: 'Set Up Emergency Contacts',
    description: 'Add contacts to alert in case of emergency',
    icon: <Users className="w-16 h-16 text-primary-600" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Emergency contacts will be notified when you:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="text-gray-700 dark:text-gray-300">• Activate the Emergency SOS button</li>
          <li className="text-gray-700 dark:text-gray-300">• Report a critical incident</li>
          <li className="text-gray-700 dark:text-gray-300">• Enter a danger zone</li>
        </ul>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Contact Name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <Button variant="outline" className="w-full">
            Add Contact
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          You can add more contacts later in Settings
        </p>
      </div>
    ),
  },
  {
    title: 'Choose Your Notifications',
    description: 'Stay informed without being overwhelmed',
    icon: <Bell className="w-16 h-16 text-primary-600" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Select how you'd like to be notified:
        </p>
        <div className="space-y-3">
          <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <input type="checkbox" defaultChecked className="mr-3" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Critical Incidents</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">High-severity incidents within 2km</p>
            </div>
          </label>
          <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <input type="checkbox" defaultChecked className="mr-3" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">School Updates</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check-in/out notifications for children</p>
            </div>
          </label>
          <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <input type="checkbox" className="mr-3" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Community Alerts</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">All incidents in your neighborhood</p>
            </div>
          </label>
        </div>
      </div>
    ),
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('onboarding_completed', 'true');
      window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    window.location.href = '/dashboard';
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-success-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
            >
              Skip Tour
            </button>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Card */}
        <Card>
          <CardContent className="pt-8 pb-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {currentStepData.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentStepData.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentStepData.description}
                  </p>
                </div>

                <div className="mt-8">
                  {currentStepData.content}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === steps.length - 1 ? (
                  'Get Started'
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentStep ? 1 : -1);
                setCurrentStep(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

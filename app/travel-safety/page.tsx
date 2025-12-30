'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Shield, CheckCircle } from 'lucide-react';

export default function TravelSafetyPage() {
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [safetyScore, setSafetyScore] = React.useState<number | null>(null);

  const checkRouteSafety = () => {
    // Simulate route safety check
    const randomScore = Math.floor(Math.random() * 40) + 60; // 60-100
    setSafetyScore(randomScore);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gg-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold">SafeGuard Nigeria</span>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" onClick={() => window.location.href = '/'}>
              Home
            </Button>
            <Button onClick={() => window.location.href = '/auth/login'}>
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Check Your Route Safety
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Plan safer journeys with real-time incident data
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Route Safety Checker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Starting Point
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g., Lekki, Lagos"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Ikeja, Lagos"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <Button 
              onClick={checkRouteSafety}
              disabled={!origin || !destination}
              className="w-full"
              size="lg"
            >
              Check Safety Score
            </Button>

            {safetyScore !== null && (
              <div className="mt-6 p-6 bg-gradient-to-br from-success-50 to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Safety Score</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Based on recent incident data</p>
                  </div>
                  <div className="text-4xl font-bold text-success-600">
                    {safetyScore}%
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Low incident rate</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Only 2 incidents reported in the last 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Recommended travel time</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Safest between 6:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = '/auth/register'}>
                    Sign up for Real-time Alerts
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">1,247</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Incidents Prevented</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-success-600 mb-2">87%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Route Safety</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-warning-600 mb-2">24/7</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time Monitoring</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

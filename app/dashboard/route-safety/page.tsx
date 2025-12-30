'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Navigation, AlertTriangle, Shield, TrendingUp, Clock } from 'lucide-react';
import { RouteSafetyWatcher } from '@/components/safety/RouteSafetyWatcher';

export default function RouteSafetyPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const handleCheckRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleSelectRoute = (route: any) => {
    setSelectedRoute(route);
    // Request permission for push notifications in a real app
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const routes = [
    {
      name: 'Safest Route',
      safetyScore: 92,
      confidence: 98,
      lastVerified: '2 minutes ago',
      isFresh: true,
      distance: '12.5 km',
      duration: '28 min',
      incidents: 1,
      description: 'Via Lekki-Epe Expressway',
      highlights: ['Well-lit roads', 'Active police presence', 'Low crime rate'],
      color: 'success',
    },
    {
      name: 'Fastest Route',
      safetyScore: 78,
      confidence: 65,
      lastVerified: '45 minutes ago',
      isFresh: false,
      distance: '10.2 km',
      duration: '22 min',
      incidents: 3,
      description: 'Via Third Mainland Bridge',
      highlights: ['Heavy traffic', 'Some unlit areas', 'Moderate crime rate'],
      color: 'warning',
    },
    {
      name: 'Alternative Route',
      safetyScore: 65,
      confidence: 42,
      lastVerified: '3 hours ago',
      isFresh: false,
      distance: '14.8 km',
      duration: '32 min',
      incidents: 5,
      description: 'Via Ikorodu Road',
      highlights: ['Poorly lit', 'Multiple danger zones', 'Higher crime rate'],
      color: 'danger',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Navigation className="w-7 h-7 mr-2 text-primary-600" />
              Route Safety Checker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find the safest route to your destination
            </p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Plan Your Safe Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckRoute} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From (Origin)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., Ikeja, Lagos"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To (Destination)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., Victoria Island, Lagos"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Shield className="w-5 h-5 mr-2" />
                Check Route Safety
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Route Options
            </h2>

            {routes.map((route, index) => (
              <Card key={index} className={`border-2 ${
                index === 0 ? 'border-success-500 bg-success-50 dark:bg-success-900/10' : ''
              }`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {route.name}
                        </h3>
                        {index === 0 && (
                          <Badge variant="success">Recommended</Badge>
                        )}
                        {route.isFresh ? (
                          <Badge variant="info" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            <Clock className="w-3 h-3 mr-1" />
                            Verified Fresh
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                            <Clock className="w-3 h-3 mr-1" />
                            Stale Info
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        {route.description}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mb-3">
                        <Shield className="w-3 h-3 mr-1 text-primary-500" />
                        Confidence Score: {route.confidence}% • Last verified: {route.lastVerified}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold mb-1" style={{
                        color: route.safetyScore >= 80 ? '#10b981' : 
                               route.safetyScore >= 60 ? '#f59e0b' : '#ef4444'
                      }}>
                        {route.safetyScore}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Safety Score
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Navigation className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{route.distance}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{route.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <AlertTriangle className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{route.incidents} incidents</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Route Highlights:
                    </p>
                    <ul className="space-y-1">
                      {route.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={index === 0 ? 'primary' : 'outline'}
                    onClick={() => handleSelectRoute(route)}
                  >
                    {selectedRoute?.name === route.name ? 'Refining Monitor...' : 'Select This Route'}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {selectedRoute && (
              <RouteSafetyWatcher 
                routePath={[[6.5244, 3.3792], [6.4281, 3.4219]]} 
                origin={origin} 
                destination={destination} 
              />
            )}
          </div>
        )}

        {/* Info Card */}
        {showResults && (
          <Card className="mt-6 border-primary-200 bg-primary-50 dark:bg-primary-900/10">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    How We Calculate Safety Scores
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Recent incident reports in the area</li>
                    <li>• Road lighting and infrastructure</li>
                    <li>• Police presence and security</li>
                    <li>• Historical crime data</li>
                    <li>• User feedback and ratings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

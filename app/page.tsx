'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CountUp } from '@/components/animations/CountUp';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideIn } from '@/components/animations/SlideIn';
import { 
  Shield, 
  MapPin, 
  Users, 
  School, 
  Bus, 
  AlertTriangle,
  Check,
  ArrowRight,
  Zap,
  Eye,
  Heart
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Live Incident Mapping',
      description: 'Real-time incident reporting and visualization on interactive maps with danger zones and safe routes.',
    },
    {
      icon: <School className="w-6 h-6" />,
      title: 'School Safety Tracking',
      description: 'Monitor student check-ins, bus locations, and receive instant parent notifications.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Traveler Protection',
      description: 'Route safety checker, trip tracking, and verified transport company directory.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Emergency SOS',
      description: 'One-tap emergency alerts to contacts, nearby users, and authorities with location sharing.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Alerts',
      description: 'Real-time safety notifications for your neighborhood with severity-based filtering.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Admin Monitoring',
      description: 'Super admin dashboard with live user tracking, incident verification, and analytics.',
    },
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '₦0',
      period: 'forever',
      features: [
        'View community incidents',
        'Basic incident reporting',
        'Safety alerts for your area',
        'Access to safety statistics',
      ],
    },
    {
      name: 'Family',
      price: '₦2,500',
      period: '/month',
      popular: true,
      features: [
        'Everything in Free',
        'Real-time safety alerts',
        'Safe route recommendations',
        'Family location sharing',
        '1 child school tracking',
        'Priority notifications',
      ],
    },
    {
      name: 'Premium',
      price: '₦5,000',
      period: '/month',
      features: [
        'Everything in Family',
        'Up to 3 children tracking',
        'Bus tracking',
        'Trip tracking & sharing',
        'Emergency SOS alerts',
        'Priority support',
        'Advanced analytics',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/icon.svg" alt="SafeGuard Nigeria" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SafeGuard Nigeria
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 transition">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 transition">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 transition">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-success-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Protecting Nigeria,{' '}
                  <span className="text-primary-600">One Community</span> at a Time
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Real-time safety alerts, incident reporting, school tracking, and traveler protection all in one comprehensive platform.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/auth/register">
                    <Button size="lg" className="group">
                      Start Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/route-safety">
                    <Button size="lg" variant="outline">
                      Check Route Safety
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 hover:shadow-lg transition">
                    <Zap className="w-8 h-8 text-warning-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      <CountUp end={1247} />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Incidents Prevented</div>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition mt-8">
                    <Users className="w-8 h-8 text-primary-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      <CountUp end={25000} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition">
                    <School className="w-8 h-8 text-success-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      <CountUp end={150} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Schools Protected</div>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition mt-8">
                    <Heart className="w-8 h-8 text-danger-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      <CountUp end={98} suffix="%" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">User Satisfaction</div>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SlideIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Comprehensive Safety Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to stay safe and protect your loved ones
              </p>
            </SlideIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="h-full hover:shadow-xl transition cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Afford able protection for every Nigerian family
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <Card className={`h-full ${tier.popular ? 'ring-2 ring-primary-600 shadow-xl' : ''}`}>
                  {tier.popular && (
                    <div className="bg-primary-600 text-white text-center py-1 text-sm font-medium rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                      <span className="text-gray-600 dark:text-gray-400">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-success-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/auth/register" className="block">
                      <Button 
                        className="w-full mt-6" 
                        variant={tier.popular ? 'primary' : 'outline'}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make Nigeria Safer?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of Nigerians protecting their communities today
            </p>
            <Link href="/auth/register">
              <Button size="xl" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100">
                Start Your Free Account
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/icon.svg" alt="SafeGuard Nigeria" className="w-6 h-6" />
                <span className="text-lg font-bold text-white">SafeGuard Nigeria</span>
              </div>
              <p className="text-sm text-gray-400">
                Making Nigeria safer, one community at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-primary-400 transition">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary-400 transition">Pricing</Link></li>
                <li><Link href="/dashboard/route-safety" className="hover:text-primary-400 transition">Travel Safety</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#about" className="hover:text-primary-400 transition">About</Link></li>
                <li><Link href="#" className="hover:text-primary-400 transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary-400 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary-400 transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary-400 transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
            © 2024 SafeGuard Nigeria. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, Volume2, User, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Contact {
  name: string;
  phone: string;
  priority: number;
}

export function EmergencyCallingUI() {
  const [activeLines, setActiveLines] = useState<Contact[]>([]);
  const [lineStatuses, setLineStatuses] = useState<Record<string, 'connecting' | 'ringing' | 'connected'>>({});
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [smsStatuses, setSmsStatuses] = useState<Record<string, 'pending' | 'sent'>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleStartCalling = (event: any) => {
      const { contacts } = event.detail;
      setAllContacts(contacts);
      
      // Select top 3 for concurrent calling
      const top3 = contacts.slice(0, 3);
      setActiveLines(top3);
      
      startMultiCallSequence(top3, contacts);
    };

    window.addEventListener('safeguard-start-calling', handleStartCalling);
    return () => window.removeEventListener('safeguard-start-calling', handleStartCalling);
  }, []);

  const startMultiCallSequence = async (calling: Contact[], total: Contact[]) => {
    // Initial status
    const initialStatuses: Record<string, 'connecting' | 'ringing' | 'connected'> = {};
    calling.forEach(c => initialStatuses[c.phone] = 'connecting');
    setLineStatuses(initialStatuses);

    // SMS status
    const sStatuses: Record<string, 'pending' | 'sent'> = {};
    total.forEach(c => sStatuses[c.phone] = 'pending');
    setSmsStatuses(sStatuses);

    // Simulate SMS delivery
    setTimeout(() => {
      setSmsStatuses(prev => {
        const next = { ...prev };
        total.forEach(c => next[c.phone] = 'sent');
        return next;
      });
    }, 1500);

    // Simulate staggered ringing and connection
    for (const contact of calling) {
      setTimeout(() => {
        setLineStatuses(prev => ({ ...prev, [contact.phone]: 'ringing' }));
      }, Math.random() * 2000 + 500);

      setTimeout(() => {
        setLineStatuses(prev => ({ ...prev, [contact.phone]: 'connected' }));
      }, Math.random() * 3000 + 3000);
    }
  };

  if (!mounted || activeLines.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-between py-12 px-6 text-white overflow-hidden transform-gpu"
      >
        {/* Dynamic Warning Aura */}
        <div className="absolute inset-0 bg-danger-600/10 animate-pulse pointer-events-none" />
        
        {/* Connection Header */}
        <div className="text-center relative z-10 w-full">
          <Badge variant="danger" className="mb-4 animate-bounce bg-danger-600 px-6 py-2 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            TRIPLE-LINE EMERGENCY BROADCAST
          </Badge>
          <p className="text-xs text-danger-400 font-bold tracking-[0.2em] uppercase">Calling {activeLines.length} Priority Contacts Simultaneously</p>
        </div>

        {/* Multi-Line Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
          {activeLines.map((contact, idx) => (
            <motion.div
              key={contact.phone}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border-2 transition-all duration-500 overflow-hidden relative ${
                lineStatuses[contact.phone] === 'connected' 
                ? 'bg-success-600/20 border-success-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
                : 'bg-white/5 border-white/10'
              }`}
            >
              {/* Ringing Ripple Effect */}
              {lineStatuses[contact.phone] === 'ringing' && (
                <div className="absolute inset-0 bg-primary-500/10 animate-pulse" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  lineStatuses[contact.phone] === 'connected' ? 'bg-success-500' : 'bg-gray-800'
                }`}>
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black truncate w-full tracking-tight">{contact.name}</h3>
                <p className="text-sm text-gray-400 font-mono mb-6">{contact.phone}</p>
                
                <div className="flex items-center gap-3 mb-6 bg-white/5 px-4 py-1.5 rounded-full">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    lineStatuses[contact.phone] === 'connected' ? 'bg-success-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 
                    lineStatuses[contact.phone] === 'ringing' ? 'bg-warning-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-gray-600'
                  }`} />
                  <span className="text-xs uppercase font-black tracking-widest text-white">
                    {lineStatuses[contact.phone]}
                  </span>
                </div>

                <Button 
                  size="md" 
                  variant="primary" 
                  className="w-full bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/20 font-black text-xs"
                  onClick={() => window.location.href = `tel:${contact.phone}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  DIAL NOW
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SMS Status Panel */}
        <div className="w-full max-w-sm space-y-3 bg-gray-900/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 relative z-10 shadow-2xl">
          <p className="text-xs text-white uppercase font-black mb-4 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary-400" />
              SMS Broadcast
            </span>
            <span className="text-success-400">{Object.values(smsStatuses).filter(s => s === 'sent').length}/{allContacts.length}</span>
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {allContacts.slice(0, 6).map((c) => (
              <div key={c.phone} className="flex justify-between items-center bg-white/10 py-2 px-3 rounded-xl border border-white/5">
                <span className="text-[11px] font-bold text-white truncate max-w-[80px]">{c.name}</span>
                {smsStatuses[c.phone] === 'sent' ? (
                  <CheckCircle className="w-4 h-4 text-success-400" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-500 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Controls */}
        <div className="w-full max-w-md relative z-10">
          <div className="flex justify-center mb-8">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-danger-600 hover:bg-danger-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all"
              onClick={() => setActiveLines([])}
            >
              <PhoneOff className="w-10 h-10 text-white" />
            </motion.button>
          </div>
          <div className="flex justify-around items-center text-gray-400">
            <button className="flex flex-col items-center gap-2">
              <Mic className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold">Mute</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <Volume2 className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold">Speaker</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold">Encrypted</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${className} ${variant === 'danger' ? 'bg-danger-600' : 'bg-gray-800'}`}>
      {children}
    </span>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Search, X, User, Scale, Syringe, QrCode,
  Hospital, PhoneCall, Mic, ArrowRight, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Child } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  childrenList: Child[];
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenVoiceAssistant: () => void;
  onEmergencySos: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  childrenList,
  onOpenGrowthModal,
  onOpenVaccinesModal,
  onOpenQRModal,
  onOpenVoiceAssistant,
  onEmergencySos,
}) => {
  const [query, setQuery] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChildren = query
    ? childrenList.filter(
        c =>
          c.fullName.toLowerCase().includes(query.toLowerCase()) ||
          c.uhid.toLowerCase().includes(query.toLowerCase()) ||
          (c.village ?? '').toLowerCase().includes(query.toLowerCase()) ||
          (c.parentName ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : childrenList.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/60 backdrop-blur-sm font-['Outfit']">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-4 border-b border-zinc-200">
          <Search size={20} className="text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search children, UHID, village, or emergency protocols..."
            className="w-full text-base bg-transparent border-0 focus:outline-hidden text-zinc-900 placeholder:text-zinc-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-700 mr-3 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Action Chips */}
        <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <span className="text-zinc-400 uppercase tracking-wider text-[10px] shrink-0">Quick Triggers:</span>
          <button
            onClick={() => {
              onClose();
              onOpenVoiceAssistant();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-800 hover:bg-zinc-950 hover:text-white transition cursor-pointer border border-zinc-200 shrink-0"
          >
            <Mic size={13} />
            <span>Voice Diagnostic AI</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onEmergencySos();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white transition cursor-pointer shrink-0"
          >
            <PhoneCall size={13} />
            <span>108 Emergency Ambulance</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-zinc-100 p-2">
          {filteredChildren.length === 0 ? (
            <div className="p-10 text-center text-xs text-zinc-500 font-medium">
              No matching records found for "{query}". Try searching by child name, UHID, or village.
            </div>
          ) : (
            filteredChildren.map(child => (
              <div
                key={child.uhid}
                className="p-3.5 hover:bg-zinc-50 rounded-2xl transition flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-xs shrink-0 border border-zinc-200">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-950">
                        {child.fullName}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                        {child.uhid}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          child.latestRiskCategory === 'RED'
                            ? 'bg-rose-100 text-rose-800'
                            : child.latestRiskCategory === 'ORANGE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {child.latestRiskCategory || 'GREEN'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                      Mother: {child.parentName || 'Gita Devi'} · {child.village || 'Kalyanpur'} · Weight: {child.latestWeightKg || '10.5'} kg
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGrowthModal(child);
                    }}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 text-xs font-bold transition cursor-pointer border border-zinc-200"
                    title="Assess WHO Growth"
                  >
                    <Scale size={14} />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenVaccinesModal(child);
                    }}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 text-xs font-bold transition cursor-pointer border border-zinc-200"
                    title="UIP Vaccines"
                  >
                    <Syringe size={14} />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenQRModal(child);
                    }}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 text-xs font-bold transition cursor-pointer border border-zinc-200"
                    title="Digital QR Card"
                  >
                    <QrCode size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
          <span>Press ESC or click outside to dismiss</span>
          <span>Showing verified Rayagada records</span>
        </div>
      </motion.div>
    </div>
  );
};

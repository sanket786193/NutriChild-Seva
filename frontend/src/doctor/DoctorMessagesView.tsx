import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Phone,
  Mic,
  Paperclip,
  CheckCheck
} from 'lucide-react';
import type { LanguageCode } from '../types';

interface DoctorMessagesViewProps {
  language: LanguageCode;
}

export const DoctorMessagesView: React.FC<DoctorMessagesViewProps> = () => {
  const [activeContactId, setActiveContactId] = useState(1);
  const [inputText, setInputText] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Kamla Bai (ASHA Worker)',
      role: 'Kalyanpur Village ASHA',
      unread: 2,
      online: true,
      avatar: '🩺',
      lastMessage: 'Doctor babu, Priyanka Soren took 2 packets RUTF today. Edema is decreasing.'
    },
    {
      id: 2,
      name: 'Meera Sharma (Anganwadi Worker)',
      role: 'Kalyanpur AWC-1',
      unread: 1,
      online: true,
      avatar: '🏡',
      lastMessage: 'Manav Majhi weighed 9.4 kg today during Wednesday VHSND session.'
    },
    {
      id: 3,
      name: 'Sunita Devi (Mother of Aarav)',
      role: 'Parent',
      unread: 0,
      online: false,
      avatar: '👩',
      lastMessage: 'Thank you doctor, Aarav completed his 18-month MR vaccine.'
    }
  ];

  const [chatThreads, setChatThreads] = useState<Record<number, any[]>>({
    1: [
      { sender: 'ASHA', text: 'Namaskar Doctor Sir. I visited Priyanka Soren (SAM) in Kalyanpur today.', time: '09:15 AM' },
      { sender: 'DOCTOR', text: 'Namaskar Kamla Bai. What is her appetite test result and current MUAC?', time: '09:20 AM' },
      { sender: 'ASHA', text: 'Doctor babu, Priyanka took 2 packets RUTF today eagerly. MUAC is 11.2 cm now, bilateral swelling on feet is visibly reduced.', time: '09:25 AM' }
    ],
    2: [
      { sender: 'AWW', text: 'Doctor sahab, we held our Village Health Sanitation and Nutrition Day today.', time: '11:00 AM' },
      { sender: 'AWW', text: 'Manav Majhi weighed 9.4 kg today during Wednesday VHSND session.', time: '11:02 AM' }
    ],
    3: [
      { sender: 'PARENT', text: 'Thank you doctor, Aarav completed his 18-month MR vaccine.', time: 'Yesterday' }
    ]
  });

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];
  const messages = chatThreads[activeContactId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setChatThreads(prev => ({
      ...prev,
      [activeContactId]: [
        ...(prev[activeContactId] || []),
        { sender: 'DOCTOR', text: inputText, time: 'Just now' }
      ]
    }));
    setInputText('');
  };

  return (
    <div className="h-[75vh] bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row animate-in fade-in duration-200">
      {/* Contact List (Left) */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Consultation Messages</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold">Direct Communication Channel</span>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveContactId(c.id)}
              className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 ${
                activeContactId === c.id ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-100'
              }`}
            >
              <div className="text-2xl relative shrink-0">
                {c.avatar}
                {c.online && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 truncate">{c.name}</h4>
                  {c.unread > 0 && (
                    <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      {c.unread}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 block">{c.role}</span>
                <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Thread (Right) */}
      <div className="flex-1 flex flex-col justify-between bg-white">
        {/* Thread Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{activeContact.avatar}</div>
            <div>
              <h4 className="text-sm font-black text-slate-900">{activeContact.name}</h4>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Now • Rayagada Sector
              </span>
            </div>
          </div>
          <button
            onClick={() => alert(`Calling ${activeContact.name}...`)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* Message Bubble List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-slate-50/30">
          {messages.map((m, idx) => {
            const isDoctor = m.sender === 'DOCTOR';
            return (
              <div
                key={idx}
                className={`flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-3.5 rounded-2xl max-w-md text-xs font-medium shadow-2xs leading-relaxed ${
                  isDoctor
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}>
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-semibold flex items-center gap-1">
                  {m.time} {isDoctor && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type clinical guidance or instructions..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-blue-600"
          />
          <button
            type="submit"
            className="p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xs active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Mic, MicOff, Volume2, X, Sparkles, ShieldCheck,
  Send, Loader2, CheckCircle2, AlertTriangle, Scale,
  Thermometer, Syringe, Droplets, Apple, HeartPulse,
  Languages, FileText, ChevronRight
} from 'lucide-react';
import type { LanguageCode } from '../types';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language: initialLanguage,
}) => {
  if (!isOpen) return null;

  const [currentLang, setCurrentLang] = useState<LanguageCode>(initialLanguage || 'hi');
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Professional clinical prompts with Lucide line icons (NO emojis)
  const samplePrompts = [
    {
      icon: Scale,
      label: currentLang === 'hi' ? 'कम वजन आहार' : currentLang === 'or' ? 'କମ ଓଜନ ଆହାର' : 'Low Weight Nutrition',
      sub: 'Pediatric Diet',
      text:
        currentLang === 'hi'
          ? '2 वर्ष से कम उम्र के कम वजन वाले बच्चे के लिए संतुलित आहार क्या होना चाहिए?'
          : 'What is the clinical dietary guideline for an underweight child under 2 years?',
    },
    {
      icon: Thermometer,
      label: currentLang === 'hi' ? 'बुखार प्रबंधन' : currentLang === 'or' ? 'ଜ୍ୱର ପରିଚାଳନା' : 'Fever Triage',
      sub: 'Home Protocol',
      text:
        currentLang === 'hi'
          ? 'बच्चे को तेज बुखार होने पर प्राथमिक उपचार क्या है और कब अस्पताल ले जाएं?'
          : 'How should pediatric fever be managed at home and when is emergency referral required?',
    },
    {
      icon: Syringe,
      label: currentLang === 'hi' ? 'छूटा हुआ टीका' : currentLang === 'or' ? 'ବାକି ଟିକା' : 'Missed Vaccine',
      sub: 'UIP Schedule',
      text:
        currentLang === 'hi'
          ? 'यदि पेंटावेलेंट या एमआर टीका छूट गया है तो अगला टीका कब लगना चाहिए?'
          : 'What is the National Immunization catch-up timeline for delayed Pentavalent or MR doses?',
    },
    {
      icon: Droplets,
      label: currentLang === 'hi' ? 'दस्त व ओआरएस' : currentLang === 'or' ? 'ଝାଡ଼ା ଓ ORS' : 'Diarrhea & ORS',
      sub: 'Hydration',
      text:
        currentLang === 'hi'
          ? 'दस्त और उल्टी में ओआरएस घोल और जिंक देने का सही तरीका क्या है?'
          : 'What is the correct dosage of Zinc and ORS preparation for childhood acute diarrhea?',
    },
    {
      icon: Apple,
      label: currentLang === 'hi' ? 'पोषण योजना' : currentLang === 'or' ? 'ପୋଷଣ ଯୋଜନା' : 'Poshan Ration',
      sub: 'Entitlements',
      text:
        currentLang === 'hi'
          ? 'आंगनवाड़ी केंद्र से टेक-होम राशन (THR) के तहत क्या-क्या खाद्य सामग्री मिलती है?'
          : 'What supplementary nutrition entitlements are provided under Poshan Abhiyaan 2.0?',
    },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    SpeechEngine.startListening(
      currentLang,
      (transcript) => {
        setIsListening(false);
        setInputText(transcript);
        handleSendQuestion(transcript);
      },
      (err) => {
        setIsListening(false);
        console.warn('Speech recognition status:', err);
      }
    );
  };

  const handleSendQuestion = async (queryToSend?: string) => {
    const q = queryToSend || inputText;
    if (!q.trim()) return;

    setIsLoading(true);
    setResponse(null);

    const result = await api.askVoiceAi(q, currentLang);
    setResponse(result);
    setIsLoading(false);

    if (result && result.answer) {
      SpeechEngine.speak(result.answer, currentLang);
    }
  };

  const handleSpeakAgain = () => {
    if (response && response.answer) {
      SpeechEngine.speak(response.answer, currentLang);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8">
        {/* Government / Clinical Header */}
        <div className="bg-[#0B1528] text-white p-6 sm:p-7 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
              <HeartPulse size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-tight">
                  NutriVoice AI Clinical Assistant
                </h3>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
                  Multilingual AI
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                Vernacular speech diagnostics and evidence-based clinical nutrition guidance
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              SpeechEngine.stop();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language Selection & Telemetry Bar */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Languages size={15} className="text-teal-700" />
            <span>Consultation Language:</span>
          </div>

          <div className="inline-flex p-0.5 rounded-lg bg-slate-200/70 text-[11px] font-bold">
            {(['hi', 'or', 'en'] as const).map(l => (
              <button
                key={l}
                onClick={() => setCurrentLang(l)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  currentLang === l
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l === 'hi' ? 'हिंदी (Hindi)' : l === 'or' ? 'ଓଡ଼ିଆ (Odia)' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Clinical Microphone Recording Station */}
          <div className="flex flex-col items-center justify-center py-7 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <button
              onClick={handleStartListening}
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-md transition-all duration-300 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 scale-105 shadow-rose-600/30 animate-pulse'
                  : 'bg-teal-700 hover:bg-teal-800 shadow-teal-700/20'
              }`}
              title="Click to speak"
            >
              {isListening ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            <strong className="text-sm font-bold text-slate-900 mt-3.5 block">
              {isListening
                ? currentLang === 'hi'
                  ? 'सुन रहा हूँ... कृपया अपना प्रश्न पूछें'
                  : 'Listening... Speak your symptom or query clearly'
                : currentLang === 'hi'
                ? 'बोलने के लिए माइक दबाएं'
                : 'Tap microphone to speak'}
            </strong>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              WHO &amp; Ministry of Health Pediatric Guidance Engine · 100% Secure Telemetry
            </p>
          </div>

          {/* Clean Medical Line-Icon Prompts (NO EMOJIS) */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Standard Clinical Triage Questions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {samplePrompts.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(p.text);
                      handleSendQuestion(p.text);
                    }}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 block group-hover:text-teal-800 transition-colors">
                          {p.label}
                        </strong>
                        <span className="text-[10px] text-slate-500">{p.sub}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Processing Feedback */}
          {isLoading && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-3 text-slate-700">
              <Loader2 size={18} className="animate-spin text-teal-700" />
              <span className="text-xs font-semibold">
                Analyzing WHO anthropometry guidelines and synthesizing clinical advice...
              </span>
            </div>
          )}

          {/* Verified Response Presentation */}
          {response && (
            <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200/90 space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-teal-200/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-teal-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                    Clinical Guidance Summary
                  </span>
                </div>
                <button
                  onClick={handleSpeakAgain}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-teal-300 text-xs font-semibold text-teal-800 hover:bg-teal-100 transition cursor-pointer"
                >
                  <Volume2 size={13} />
                  <span>Audio Playback</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {response.answer}
              </p>

              {response.disclaimer && (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/80 border border-teal-200 text-[11px] text-slate-600">
                  <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>{response.disclaimer}</span>
                </div>
              )}
            </div>
          )}

          {/* Text Input Row */}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuestion();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  currentLang === 'hi'
                    ? 'या यहाँ सवाल लिखें (उदा. 8 माह के बच्चे का पूरक आहार क्या है?)...'
                    : 'Type medical query (e.g. Recommended THR allowance for severe acute malnutrition)...'
                }
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-700"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-4 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 disabled:opacity-40 transition shadow-xs cursor-pointer shrink-0 text-xs font-bold flex items-center gap-1.5"
              >
                <span>Consult</span>
                <Send size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

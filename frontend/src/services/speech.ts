import type { LanguageCode } from '../types';

const LANG_MAP: Record<LanguageCode, string> = {
  hi: 'hi-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  or: 'or-IN',
  en: 'en-IN'
};

export class SpeechEngine {
  private static isSpeaking = false;

  public static speak(text: string, lang: LanguageCode = 'hi') {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any currently playing audio

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANG_MAP[lang] || 'hi-IN';
      utterance.rate = 0.92; // Slightly slower, more clear for rural listeners
      utterance.pitch = 1.0;

      // Try selecting an Indian voice if available
      const voices = window.speechSynthesis.getVoices();
      const targetLang = LANG_MAP[lang] || 'hi-IN';
      const regionalVoice = voices.find(v => v.lang.startsWith(targetLang.substring(0, 2)));
      if (regionalVoice) {
        utterance.voice = regionalVoice;
      }

      utterance.onstart = () => {
        SpeechEngine.isSpeaking = true;
      };
      utterance.onend = () => {
        SpeechEngine.isSpeaking = false;
      };
      utterance.onerror = () => {
        SpeechEngine.isSpeaking = false;
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
    }
  }

  public static stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      SpeechEngine.isSpeaking = false;
    }
  }

  public static startListening(
    lang: LanguageCode = 'hi',
    onResult: (transcript: string) => void,
    onError: (err: any) => void
  ): any {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError(new Error('Speech recognition not supported in this browser. Please type or use Chrome/Android.'));
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANG_MAP[lang] || 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      onError(event.error);
    };

    recognition.start();
    return recognition;
  }
}

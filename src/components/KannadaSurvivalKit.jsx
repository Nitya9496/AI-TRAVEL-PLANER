import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Languages, Info, Sparkles } from 'lucide-react';

/**
 * Kannada Survival Kit with native Web Speech synthesis and phonetic fallback.
 */
export default function KannadaSurvivalKit({ phrases = [], lang = 'en' }) {
  const [hasKannadaVoice, setHasKannadaVoice] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [fallbackNotice, setFallbackNotice] = useState(null);

  // Detect available TTS voices including Kannada voice packages
  useEffect(() => {
    const detectVoices = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const voices = window.speechSynthesis.getVoices();
      const hasKn = voices.some(
        (v) => v.lang === 'kn-IN' || v.lang.toLowerCase().startsWith('kn')
      );
      setHasKannadaVoice(hasKn);
    };

    detectVoices();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = detectVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = (item, index) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setFallbackNotice(
        lang === 'kn'
          ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಟೆಕ್ಸ್ಟ್-ಟು-ಸ್ಪೀಚ್ ಬೆಂಬಲವಿಲ್ಲ.'
          : 'Text-to-speech is not supported on this browser.'
      );
      return;
    }

    // Toggle stop if already speaking this phrase
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Normalizing text fields
    const rawKannada = item.kannada || item.kannadaText || '';
    const rawEnglish = item.english || item.meaning || '';
    const transliteration = item.transliteration || rawKannada.match(/\((.*?)\)/)?.[1] || rawEnglish;
    const cleanKannada = rawKannada.replace(/\(.*?\)/g, '').trim() || rawKannada;

    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find(
      (v) => v.lang === 'kn-IN' || v.lang.toLowerCase().startsWith('kn')
    );

    let utterance;

    if (kannadaVoice) {
      utterance = new SpeechSynthesisUtterance(cleanKannada);
      utterance.voice = kannadaVoice;
      utterance.lang = kannadaVoice.lang || 'kn-IN';
      utterance.rate = 0.85;
    } else {
      const indianVoice = voices.find(
        (v) => v.lang === 'en-IN' || v.lang.toLowerCase().includes('en-in')
      );
      const generalVoice = voices.find((v) => v.lang.startsWith('en')) || voices[0];

      utterance = new SpeechSynthesisUtterance(transliteration);
      utterance.voice = indianVoice || generalVoice;
      utterance.lang = indianVoice?.lang || 'en-IN';
      utterance.rate = 0.85;

      setFallbackNotice(
        lang === 'kn'
          ? `ಕನ್ನಡ ವಾಯ್ಸ್ ಪ್ಯಾಕ್ ಇಲ್ಲ - ಇಂಗ್ಲಿಷ್ ಉಚ್ಚಾರಣೆಯಲ್ಲಿ ನುಡಿಯಲಾಗುತ್ತಿದೆ: "${transliteration}"`
          : `Native Kannada voice not found on device. Speaking phonetic transliteration: "${transliteration}"`
      );
      setTimeout(() => setFallbackNotice(null), 4500);
    }

    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  if (!phrases || phrases.length === 0) {
    return (
      <div className="p-6 text-center text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
        {lang === 'kn'
          ? 'ಯಾವುದೇ ಕನ್ನಡ ಸಂಭಾಷಣೆ ಲಭ್ಯವಿಲ್ಲ.'
          : 'No Kannada phrases available for this itinerary yet.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-red-600 text-white shadow-sm">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>{lang === 'kn' ? 'ಕನ್ನಡ ಸಂಭಾಷಣೆ ಕಿಟ್' : 'Kannada Survival Kit'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900 font-bold border border-yellow-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {lang === 'kn' ? 'ಸ್ಥಳೀಯರಂತೆ ಮಾತನಾಡಿ' : 'Travel Like a Local'}
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'kn'
                ? 'ಆಟೋ ಚಾಲಕರು, ಅಂಗಡಿಕಾರರು ಮತ್ತು ಹೋಟೆಲ್‌ಗಳಲ್ಲಿ ಸಂಭಾಷಣೆ ಮಾಡಲು'
                : 'Communicate smoothly with auto drivers, vendors & local hosts.'}
            </p>
          </div>
        </div>

        {/* Voice Badge Indicator */}
        <div className="flex items-center gap-2 text-xs bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
          <span
            className={`w-2 h-2 rounded-full ${
              hasKannadaVoice ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-gray-600 font-medium">
            {hasKannadaVoice
              ? lang === 'kn'
                ? 'ಸ್ಥಳೀಯ ಕನ್ನಡ ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ'
                : 'Native Kannada Voice Active'
              : lang === 'kn'
              ? 'ಧ್ವನಿ ಫಾಲ್‌ಬ್ಯಾಕ್ ಮೋಡ್'
              : 'Phonetic Fallback Voice'}
          </span>
        </div>
      </div>

      {/* Dynamic TTS Notification */}
      {fallbackNotice && (
        <div className="p-3 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{fallbackNotice}</span>
          </div>
          <button
            onClick={() => setFallbackNotice(null)}
            className="text-amber-800 hover:text-amber-950 font-bold ml-2 text-sm leading-none"
          >
            &times;
          </button>
        </div>
      )}

      {/* Phrase Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {phrases.map((item, index) => {
          const isSpeaking = speakingIndex === index;
          const rawKannada = item.kannada || item.kannadaText || '';
          const rawEnglish = item.english || item.meaning || '';
          const transliteration =
            item.transliteration || rawKannada.match(/\((.*?)\)/)?.[1] || '';
          const cleanKannada = rawKannada.replace(/\(.*?\)/g, '').trim();

          return (
            <div
              key={index}
              className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 bg-white ${
                isSpeaking
                  ? 'border-red-500 shadow-md ring-2 ring-red-100 bg-red-50/20'
                  : 'border-stone-200 hover:border-amber-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Usage Badge & Speaker Button */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {item.usage || 'Daily'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSpeak(item, index)}
                    title={
                      isSpeaking
                        ? 'Stop Audio'
                        : hasKannadaVoice
                        ? 'Listen to pronunciation'
                        : 'Listen to phonetic pronunciation'
                    }
                    className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
                      isSpeaking
                        ? 'bg-red-600 text-white animate-pulse shadow-md'
                        : 'bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-red-700'
                    }`}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Kannada Script */}
                <div className="text-2xl font-black text-gray-900 tracking-wide mb-1 font-sans">
                  {cleanKannada || rawKannada}
                </div>

                {/* Transliteration */}
                {transliteration && (
                  <div className="text-xs font-bold text-red-600 tracking-wide mb-2 uppercase">
                    "{transliteration}"
                  </div>
                )}

                {/* English / Kannada Meaning */}
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {rawEnglish}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-semibold">
                <span>ಕನ್ನಡ ಸಂಭಾಷಣೆ</span>
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-amber-500" />
                  {isSpeaking ? (lang === 'kn' ? 'ನುಡಿಯುತ್ತಿದೆ...' : 'Speaking...') : (lang === 'kn' ? 'ಕೇಳಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to hear')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

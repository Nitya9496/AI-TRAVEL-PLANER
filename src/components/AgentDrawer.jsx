import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  X,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Compass,
  MapPin,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { askTravelAgent } from '../services/aiAgent';

export default function AgentDrawer({ currentItinerary, onItineraryUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Namaskara! I am Namma Sanchari, your autonomous Karnataka AI companion. How can I personalize or modify your itinerary today?",
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Voice recognition toggle
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Dispatch message to agent
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await askTravelAgent(query, currentItinerary);

      const agentMsg = {
        id: Date.now() + 1,
        sender: 'agent',
        text: response.replyMessage || "I've tailored your Karnataka itinerary!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        updatedPlanTitle: response.updatedItinerary?.title,
      };

      setMessages((prev) => [...prev, agentMsg]);

      // Trigger real-time dashboard update if new itinerary returned
      if (response.updatedItinerary && onItineraryUpdate) {
        onItineraryUpdate(response.updatedItinerary);
      }
    } catch (err) {
      console.error('Agent chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: "I experienced a brief connection hiccup, but I've ensured your Karnataka journey remains safe and active!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionChips = [
    "3-day Mysuru & Coorg trip under ₹10,000",
    "Add Gokarna beach trail",
    "Kannada auto bargaining phrases",
  ];

  return (
    <>
      {/* Floating Action Button (FAB) anchored bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative group px-5 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 text-white font-extrabold text-sm shadow-2xl hover:shadow-red-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer ring-4 ring-yellow-400/40 animate-bounce hover:animate-none"
        >
          <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-base shadow-sm">
            🤖
          </div>
          <span className="tracking-wide">Ask Namma Sanchari AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
        </button>
      </div>

      {/* Slide-over Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between border-l border-amber-200">
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-xs border border-white/30">
                    🐘
                  </div>
                  <div>
                    <h3 className="font-black text-base tracking-tight flex items-center gap-2">
                      <span>Namma Sanchari AI</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-950">
                        Autonomous
                      </span>
                    </h3>
                    <p className="text-xs text-amber-100 font-medium">
                      Real-Time Karnataka Travel Companion
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message History */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-stone-50/70">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {msg.sender === 'agent' ? (
                        <>
                          <Bot className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-[10px] font-bold text-stone-600">
                            Namma Sanchari
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-500">You</span>
                      )}
                      <span className="text-[9px] text-stone-400">{msg.time}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white font-medium rounded-tr-xs'
                          : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                      }`}
                    >
                      {msg.text}

                      {/* Itinerary Updated Badge */}
                      {msg.updatedPlanTitle && (
                        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Dashboard updated: "{msg.updatedPlanTitle}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Agent Thinking Indicator */}
                {loading && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                      🤖
                    </div>
                    <div className="p-3 bg-white rounded-2xl border border-stone-200 text-xs text-stone-500 flex items-center gap-2 shadow-xs">
                      <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                      <span>Thinking & adapting Karnataka circuit...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="p-3 bg-white border-t border-stone-100 space-y-1.5">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Quick Questions</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(chip)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all cursor-pointer text-left"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input & Voice Recognition Footer */}
              <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  {/* Voice Input Button */}
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={toggleListening}
                      title={isListening ? 'Stop listening' : 'Speak your query'}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isListening
                          ? 'bg-red-600 text-white animate-pulse border-red-600'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border-stone-300'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      isListening
                        ? 'Listening to your voice...'
                        : 'Ask Namma Sanchari (e.g. Add Gokarna beach trail)...'
                    }
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />

                  <button
                    type="submit"
                    disabled={loading || !inputMessage.trim()}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 disabled:opacity-50 text-white transition-all cursor-pointer shadow-md disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


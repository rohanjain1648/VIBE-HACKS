import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Send,
  Bot,
  TrendingUp,
  Volume2,
  VolumeX,
  Minimize2
} from 'lucide-react';

interface MatildaMessage {
  id: string;
  type: 'user' | 'matilda';
  content: string;
  timestamp: Date;
  emotion?: 'happy' | 'concerned' | 'excited' | 'supportive' | 'neutral';
  suggestions?: string[];
  actionItems?: {
    type: 'reminder' | 'resource' | 'connection';
    title: string;
    description: string;
    action: () => void;
  }[];
}

interface UserContext {
  name: string;
  location: string;
  farmType?: string;
  recentActivity: string[];
  moodTrend: number[];
  preferences: {
    communicationStyle: 'casual' | 'formal' | 'supportive';
    topics: string[];
    language: string;
  };
}

interface MatildaPersonality {
  greeting: string[];
  responses: {
    supportive: string[];
    informative: string[];
    encouraging: string[];
    concerned: string[];
  };
  emojis: {
    happy: string[];
    supportive: string[];
    excited: string[];
    thinking: string[];
  };
}

const MATILDA_PERSONALITY: MatildaPersonality = {
  greeting: [
    "G'day! I'm Matilda, your AI mate here to help with anything rural life throws at ya! 🌾",
    "Hey there! Matilda here - think of me as your digital neighbour who's always ready to lend a hand! 👋",
    "Hello! I'm Matilda, your friendly AI assistant. I'm here to help make rural life a bit easier! 🏡"
  ],
  responses: {
    supportive: [
      "I hear ya, mate. Rural life can be tough sometimes, but you're not alone in this.",
      "That sounds challenging. Let me see how I can help you work through this.",
      "I understand how you're feeling. Many folks in your area face similar challenges."
    ],
    informative: [
      "Based on what I know about your area and situation, here's what I'd suggest:",
      "I've been keeping track of conditions in your region, and here's what might help:",
      "Let me share some insights that might be useful for your situation:"
    ],
    encouraging: [
      "You're doing great! Rural communities are built on resilience, and you've got plenty of that.",
      "That's a brilliant idea! I love seeing innovative thinking in rural communities.",
      "You should be proud of what you're achieving. It's not easy, but you're making it work!"
    ],
    concerned: [
      "I'm a bit worried about what you've mentioned. Let's make sure you have the support you need.",
      "That doesn't sound right to me. Have you considered reaching out for some help?",
      "I want to make sure you're okay. There are people and resources available if you need them."
    ]
  },
  emojis: {
    happy: ['😊', '🌟', '👍', '🎉', '💚'],
    supportive: ['🤗', '💪', '❤️', '🌈', '🙏'],
    excited: ['🚀', '✨', '🔥', '⚡', '🎯'],
    thinking: ['🤔', '💭', '🧠', '💡', '🔍']
  }
};

const MOCK_USER_CONTEXT: UserContext = {
  name: 'Demo User',
  location: 'Dubbo, NSW',
  farmType: 'Mixed Farming',
  recentActivity: [
    'Checked weather forecast',
    'Posted in Women\'s Health Circle',
    'Applied for agricultural grant',
    'Completed wellbeing check-in'
  ],
  moodTrend: [6, 7, 6, 8, 7, 8, 7],
  preferences: {
    communicationStyle: 'casual',
    topics: ['farming', 'mental health', 'community'],
    language: 'en-AU'
  }
};

export const MatildaAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<MatildaMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [userContext] = useState<UserContext>(MOCK_USER_CONTEXT);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Initialize with greeting only once
    if (!initializedRef.current) {
      initializedRef.current = true;
      const greetingIndex = Math.floor(Math.random() * MATILDA_PERSONALITY.greeting.length);
      const greeting = MATILDA_PERSONALITY.greeting[greetingIndex] || MATILDA_PERSONALITY.greeting[0];
      addMatildaMessage(greeting, 'happy', [
        "Tell me about your farm",
        "How are you feeling today?",
        "What can I help you with?",
        "Show me local weather"
      ]);
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = userContext.preferences.language;

      recognitionRef.current.onresult = (event) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMatildaMessage = (
    content: string,
    emotion: MatildaMessage['emotion'] = 'neutral',
    suggestions?: string[],
    actionItems?: MatildaMessage['actionItems']
  ) => {
    const message: MatildaMessage = {
      id: `matilda-${Date.now()}`,
      type: 'matilda',
      content,
      timestamp: new Date(),
      ...(emotion && { emotion }),
      ...(suggestions && { suggestions }),
      ...(actionItems && { actionItems })
    };
    setMessages(prev => [...prev, message]);

    // Text-to-speech if enabled
    if (voiceEnabled && 'speechSynthesis' in window) {
      // Remove emojis and clean text for TTS
      const cleanContent = content.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();

      const utterance = new SpeechSynthesisUtterance(cleanContent);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices.find(voice =>
        voice.name.includes('Female') || voice.name.includes('Karen')
      ) || voices[0] || null;

      // Store reference for muting
      currentUtteranceRef.current = utterance;

      // Clear reference when speech ends
      utterance.onend = () => {
        currentUtteranceRef.current = null;
      };

      speechSynthesis.speak(utterance);
    }
  };

  const generateMatildaResponse = (userMessage: string): {
    content: string;
    emotion: MatildaMessage['emotion'];
    suggestions?: string[];
    actionItems?: MatildaMessage['actionItems'];
  } => {
    const lowerMessage = userMessage.toLowerCase();

    // Analyze user sentiment and context
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return {
        content: `${MATILDA_PERSONALITY.responses.supportive[0]} 💚 I can see you're going through a tough time. Remember, it's completely normal to feel this way sometimes, especially in rural areas where things can feel isolating. Would you like me to connect you with some mental health resources or peer support?`,
        emotion: 'concerned',
        suggestions: [
          "Connect me with peer support",
          "Show mental health resources",
          "I'd like to talk to someone",
          "Help me feel better"
        ],
        actionItems: [
          {
            type: 'resource',
            title: 'Beyond Blue Support',
            description: '24/7 mental health support line',
            action: () => window.open('tel:1300224636')
          },
          {
            type: 'connection',
            title: 'Find Peer Support',
            description: 'Connect with others in your area',
            action: () => console.log('Navigate to peer support')
          }
        ]
      };
    }

    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('drought')) {
      return {
        content: `I've been keeping an eye on the weather patterns around ${userContext.location}! 🌤️ Based on the latest forecasts, we're expecting some changes that might affect your ${userContext.farmType}. The soil moisture levels are looking good for this time of year, and I'd recommend checking your irrigation schedule.`,
        emotion: 'neutral',
        suggestions: [
          "Show detailed weather forecast",
          "Check crop advisories",
          "View irrigation recommendations",
          "Set weather alerts"
        ]
      };
    }

    if (lowerMessage.includes('crop') || lowerMessage.includes('farm') || lowerMessage.includes('harvest')) {
      return {
        content: `Great to hear you're thinking about your crops! 🌾 From what I can see, your wheat and barley are in their growing phase. The recent weather conditions have been favorable, and market prices for wheat are trending up by 2.5%. This might be a good time to plan your harvest strategy!`,
        emotion: 'excited',
        suggestions: [
          "Show crop health analysis",
          "Check market prices",
          "Plan harvest schedule",
          "Connect with other farmers"
        ],
        actionItems: [
          {
            type: 'reminder',
            title: 'Market Price Alert',
            description: 'Wheat prices up 2.5% - consider selling strategy',
            action: () => console.log('Set price alert')
          }
        ]
      };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('need')) {
      return {
        content: `I'm here to help, mate! 🤗 Based on your recent activity, I can see you've been active in the community and taking care of your wellbeing - that's fantastic! What specific area would you like support with today?`,
        emotion: 'supportive',
        suggestions: [
          "Farm management help",
          "Mental health support",
          "Business opportunities",
          "Community connections",
          "Government services"
        ]
      };
    }

    if (lowerMessage.includes('money') || lowerMessage.includes('grant') || lowerMessage.includes('financial')) {
      return {
        content: `Money matters can be stressful, especially in farming! 💰 I noticed you recently applied for an agricultural grant - that's smart planning! There are several other funding opportunities available for ${userContext.farmType} operations in NSW. Would you like me to show you some options?`,
        emotion: 'supportive',
        suggestions: [
          "Show available grants",
          "Financial planning resources",
          "Connect with financial counselor",
          "Business development opportunities"
        ],
        actionItems: [
          {
            type: 'resource',
            title: 'Rural Financial Counselling',
            description: 'Free financial advice for farmers',
            action: () => window.open('tel:1800686175')
          }
        ]
      };
    }

    // Default encouraging response
    return {
      content: `${MATILDA_PERSONALITY.responses.encouraging[Math.floor(Math.random() * MATILDA_PERSONALITY.responses.encouraging.length)]} ${MATILDA_PERSONALITY.emojis.happy[Math.floor(Math.random() * MATILDA_PERSONALITY.emojis.happy.length)]} I'm learning more about you and your needs. Feel free to ask me anything about farming, wellbeing, community connections, or just have a chat!`,
      emotion: 'happy',
      suggestions: [
        "Tell me about local events",
        "How's my farm doing?",
        "Connect me with neighbors",
        "Show me opportunities"
      ]
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: MatildaMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Show typing indicator
    setIsTyping(true);

    // Generate Matilda's response after a delay
    setTimeout(() => {
      const response = generateMatildaResponse(messageText);
      setIsTyping(false);
      addMatildaMessage(response.content, response.emotion, response.suggestions, response.actionItems);
    }, 1500 + Math.random() * 1000); // Realistic typing delay
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      // Stop current speech immediately
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
      currentUtteranceRef.current = null;
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const getEmotionColor = (emotion: MatildaMessage['emotion']) => {
    switch (emotion) {
      case 'happy': return 'text-green-600';
      case 'concerned': return 'text-orange-600';
      case 'excited': return 'text-purple-600';
      case 'supportive': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getEmotionIcon = (emotion: MatildaMessage['emotion']) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'concerned': return '😟';
      case 'excited': return '🤩';
      case 'supportive': return '🤗';
      default: return '🙂';
    }
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            !
          </div>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-8 h-8" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Matilda</h3>
            <p className="text-sm opacity-90">Your AI Rural Mate</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleVoice}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user'
                ? 'bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl'
                : 'bg-gray-100 text-gray-800 rounded-r-2xl rounded-tl-2xl'
                } p-3 shadow-sm`}>
                {message.type === 'matilda' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getEmotionIcon(message.emotion)}</span>
                    <span className={`text-xs font-medium ${getEmotionColor(message.emotion)}`}>
                      Matilda
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs bg-white/50 hover:bg-green-50 rounded-lg p-2 transition-colors border border-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Items */}
                {message.actionItems && (
                  <div className="mt-3 space-y-2">
                    {message.actionItems.map((item, index) => (
                      <div key={index} className="bg-white/70 rounded-lg p-2 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium">{item.title}</p>
                            <p className="text-xs text-gray-600">{item.description}</p>
                          </div>
                          <button
                            onClick={item.action}
                            className="text-green-500 hover:text-green-700 transition-colors"
                          >
                            <TrendingUp className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-r-2xl rounded-tl-2xl p-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-green-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Matilda anything..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleVoiceInput}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${isListening
                ? 'text-red-500 bg-red-50'
                : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MatildaAIAssistant;
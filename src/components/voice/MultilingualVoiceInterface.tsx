import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Globe, Settings } from 'lucide-react';

interface VoiceCommand {
  text: string;
  language: string;
  confidence: number;
  action?: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en-AU', name: 'English (Australia)', nativeName: 'English', flag: '🇦🇺' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

const VOICE_COMMANDS = {
  'en-AU': {
    'search': ['search', 'find', 'look for', 'show me'],
    'navigate': ['go to', 'open', 'navigate to', 'take me to'],
    'help': ['help', 'assist', 'guide me', 'what can you do'],
    'weather': ['weather', 'forecast', 'rain', 'temperature'],
    'agriculture': ['farm', 'crop', 'agriculture', 'farming'],
    'health': ['health', 'doctor', 'medical', 'hospital'],
    'emergency': ['emergency', 'urgent', 'help me', 'crisis'],
  },
  'hi-IN': {
    'search': ['खोजें', 'ढूंढें', 'दिखाएं', 'बताएं'],
    'navigate': ['जाएं', 'खोलें', 'ले चलें'],
    'help': ['मदद', 'सहायता', 'गाइड करें'],
    'weather': ['मौसम', 'बारिश', 'तापमान'],
    'agriculture': ['खेती', 'फसल', 'कृषि'],
    'health': ['स्वास्थ्य', 'डॉक्टर', 'अस्पताल'],
    'emergency': ['आपातकाल', 'जरूरी', 'मदद'],
  },
  'bn-IN': {
    'search': ['খুঁজুন', 'দেখান', 'বলুন'],
    'navigate': ['যান', 'খুলুন', 'নিয়ে যান'],
    'help': ['সাহায্য', 'গাইড করুন'],
    'weather': ['আবহাওয়া', 'বৃষ্টি', 'তাপমাত্রা'],
    'agriculture': ['কৃষি', 'ফসল', 'চাষাবাদ'],
    'health': ['স্বাস্থ্য', 'ডাক্তার', 'হাসপাতাল'],
    'emergency': ['জরুরি', 'সাহায্য', 'সংকট'],
  },
  'ta-IN': {
    'search': ['தேடு', 'காட்டு', 'சொல்லு'],
    'navigate': ['செல்', 'திற', 'அழைத்துச் செல்'],
    'help': ['உதவி', 'வழிகாட்டு'],
    'weather': ['வானிலை', 'மழை', 'வெப்பநிலை'],
    'agriculture': ['விவசாயம்', 'பயிர்', 'கृषि'],
    'health': ['உடல்நலம்', 'மருத்துவர்', 'மருத்துவமனை'],
    'emergency': ['அவசரம்', 'உதவி', 'நெருக்கடி'],
  },
};

export const MultilingualVoiceInterface: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage.code;

      recognitionRef.current.onresult = (event) => {
        const result = event.results[0];
        const command: VoiceCommand = {
          text: result[0].transcript,
          language: currentLanguage.code,
          confidence: result[0].confidence,
        };

        setLastCommand(command);
        processVoiceCommand(command);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize Speech Synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage]);

  const processVoiceCommand = (command: VoiceCommand) => {
    const text = command.text.toLowerCase();
    const commands = VOICE_COMMANDS[command.language as keyof typeof VOICE_COMMANDS] || VOICE_COMMANDS['en-AU'];

    let action = 'unknown';
    let response = '';

    // Detect command type
    for (const [commandType, keywords] of Object.entries(commands)) {
      if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
        action = commandType;
        break;
      }
    }

    // Generate appropriate response
    switch (action) {
      case 'search':
        response = getLocalizedResponse('search_response', command.language);
        // Trigger search functionality
        break;
      case 'navigate':
        response = getLocalizedResponse('navigate_response', command.language);
        // Trigger navigation
        break;
      case 'weather':
        response = getLocalizedResponse('weather_response', command.language);
        // Show weather info
        break;
      case 'agriculture':
        response = getLocalizedResponse('agriculture_response', command.language);
        // Navigate to agriculture dashboard
        break;
      case 'health':
        response = getLocalizedResponse('health_response', command.language);
        // Show health services
        break;
      case 'emergency':
        response = getLocalizedResponse('emergency_response', command.language);
        // Trigger emergency mode
        break;
      case 'help':
        response = getLocalizedResponse('help_response', command.language);
        break;
      default:
        response = getLocalizedResponse('unknown_response', command.language);
    }

    // Speak the response
    if (voiceEnabled && response) {
      speakText(response, command.language);
    }

    // Update command with action
    setLastCommand({ ...command, action });
  };

  const getLocalizedResponse = (key: string, language: string): string => {
    const responses: Record<string, Record<string, string>> = {
      'search_response': {
        'en-AU': 'Searching for you now...',
        'hi-IN': 'आपके लिए खोज रहा हूं...',
        'bn-IN': 'আপনার জন্য খুঁজছি...',
        'ta-IN': 'உங்களுக்காக தேடுகிறேன்...',
        'te-IN': 'మీ కోసం వెతుకుతున్నాను...',
        'mr-IN': 'तुमच्यासाठी शोधत आहे...',
      },
      'navigate_response': {
        'en-AU': 'Taking you there now...',
        'hi-IN': 'आपको वहां ले जा रहा हूं...',
        'bn-IN': 'আপনাকে সেখানে নিয়ে যাচ্ছি...',
        'ta-IN': 'உங்களை அங்கே அழைத்துச் செல்கிறேன்...',
        'te-IN': 'మిమ్మల్ని అక్కడికి తీసుకెళ్తున్నాను...',
        'mr-IN': 'तुम्हाला तिथे घेऊन जात आहे...',
      },
      'weather_response': {
        'en-AU': 'Here is the weather information...',
        'hi-IN': 'यहां मौसम की जानकारी है...',
        'bn-IN': 'এখানে আবহাওয়ার তথ্য...',
        'ta-IN': 'இதோ வானிலை தகவல்...',
        'te-IN': 'ఇదిగో వాతావరణ సమాచారం...',
        'mr-IN': 'हवामान माहिती येथे आहे...',
      },
      'agriculture_response': {
        'en-AU': 'Opening agriculture dashboard...',
        'hi-IN': 'कृषि डैशबोर्ड खोल रहा हूं...',
        'bn-IN': 'কৃষি ড্যাশবোর্ড খুলছি...',
        'ta-IN': 'விவசாய டாஷ்போர்டை திறக்கிறேன்...',
        'te-IN': 'వ్యవసాయ డాష్‌బోర్డ్ తెరుస్తున్నాను...',
        'mr-IN': 'शेती डॅशबोर्ड उघडत आहे...',
      },
      'health_response': {
        'en-AU': 'Showing health services near you...',
        'hi-IN': 'आपके पास स्वास्थ्य सेवाएं दिखा रहा हूं...',
        'bn-IN': 'আপনার কাছের স্বাস্থ্য সেবা দেখাচ্ছি...',
        'ta-IN': 'உங்கள் அருகிலுள்ள சுகாதார சேவைகளை காட்டுகிறேன்...',
        'te-IN': 'మీ దగ్గరి ఆరోగ్య సేవలను చూపిస్తున్నాను...',
        'mr-IN': 'तुमच्या जवळील आरोग्य सेवा दाखवत आहे...',
      },
      'emergency_response': {
        'en-AU': 'Emergency mode activated. How can I help?',
        'hi-IN': 'आपातकालीन मोड सक्रिय। मैं कैसे मदद कर सकता हूं?',
        'bn-IN': 'জরুরি মোড সক্রিয়। আমি কীভাবে সাহায্য করতে পারি?',
        'ta-IN': 'அவசர பயன்முறை செயல்படுத்தப்பட்டது। நான் எப்படி உதவ முடியும்?',
        'te-IN': 'అత్యవసర మోడ్ సక్రియం చేయబడింది. నేను ఎలా సహాయం చేయగలను?',
        'mr-IN': 'आपत्कालीन मोड सक्रिय. मी कशी मदत करू शकतो?',
      },
      'help_response': {
        'en-AU': 'I can help you with farming, health, weather, and more. Just speak naturally!',
        'hi-IN': 'मैं खेती, स्वास्थ्य, मौसम और अन्य चीजों में आपकी मदद कर सकता हूं। बस प्राकृतिक रूप से बोलें!',
        'bn-IN': 'আমি কৃষি, স্বাস্থ্য, আবহাওয়া এবং আরও অনেক বিষয়ে সাহায্য করতে পারি। শুধু স্বাভাবিকভাবে বলুন!',
        'ta-IN': 'விவசாயம், உடல்நலம், வானிலை மற்றும் பலவற்றில் நான் உங்களுக்கு உதவ முடியும். இயல்பாகப் பேசுங்கள்!',
        'te-IN': 'వ్యవసాయం, ఆరోగ్యం, వాతావరణం మరియు మరిన్నింటిలో నేను మీకు సహాయం చేయగలను. సహజంగా మాట్లాడండి!',
        'mr-IN': 'मी शेती, आरोग्य, हवामान आणि बरेच काही मध्ये तुम्हाला मदत करू शकतो. फक्त नैसर्गिकपणे बोला!',
      },
      'unknown_response': {
        'en-AU': 'I didn\'t understand that. Try saying "help" for assistance.',
        'hi-IN': 'मुझे समझ नहीं आया। सहायता के लिए "मदद" कहने की कोशिश करें।',
        'bn-IN': 'আমি বুঝতে পারিনি। সাহায্যের জন্য "সাহায্য" বলার চেষ্টা করুন।',
        'ta-IN': 'எனக்கு புரியவில்லை. உதவிக்கு "உதவி" என்று சொல்லுங்கள்.',
        'te-IN': 'నాకు అర్థం కాలేదు. సహాయం కోసం "సహాయం" అని చెప్పండి.',
        'mr-IN': 'मला समजले नाही. मदतीसाठी "मदत" म्हणण्याचा प्रयत्न करा.',
      },
    };

    return responses[key]?.[language] || responses[key]?.['en-AU'] || '';
  };

  const speakText = (text: string, language: string) => {
    if (!synthRef.current || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to find a voice for the specific language
    const voices = synthRef.current.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.lang = currentLanguage.code;
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {currentLanguage.flag} Voice Assistant
        </h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <Settings size={20} />
        </button>
      </div>

      {showSettings && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language / भाषा / ভাষা / மொழி
            </label>
            <select
              value={currentLanguage.code}
              onChange={(e) => {
                const lang = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
                if (lang) setCurrentLanguage(lang);
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Voice Responses</span>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                voiceEnabled ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={toggleVoice}
          disabled={!recognitionRef.current}
          className={`p-4 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } ${!recognitionRef.current ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        {isPlaying && (
          <button
            onClick={stopSpeaking}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-200"
          >
            <VolumeX size={24} />
          </button>
        )}
      </div>

      <div className="text-center mb-4">
        {isListening ? (
          <p className="text-green-600 font-medium">
            🎤 Listening in {currentLanguage.nativeName}...
          </p>
        ) : isPlaying ? (
          <p className="text-blue-600 font-medium">
            🔊 Speaking...
          </p>
        ) : (
          <p className="text-gray-600">
            Tap the microphone and speak in {currentLanguage.nativeName}
          </p>
        )}
      </div>

      {lastCommand && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Last Command:</span>
            <span className="text-xs text-gray-500">
              {Math.round((lastCommand.confidence || 0) * 100)}% confidence
            </span>
          </div>
          <p className="text-gray-800 mb-1">"{lastCommand.text}"</p>
          {lastCommand.action && (
            <p className="text-xs text-green-600">Action: {lastCommand.action}</p>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Try saying:</strong></p>
        <div className="grid grid-cols-2 gap-1">
          {currentLanguage.code === 'en-AU' ? (
            <>
              <p>• "Search for doctors"</p>
              <p>• "Show weather"</p>
              <p>• "Open agriculture"</p>
              <p>• "Help me"</p>
            </>
          ) : currentLanguage.code === 'hi-IN' ? (
            <>
              <p>• "डॉक्टर खोजें"</p>
              <p>• "मौसम दिखाएं"</p>
              <p>• "कृषि खोलें"</p>
              <p>• "मदद करें"</p>
            </>
          ) : (
            <>
              <p>• "Search"</p>
              <p>• "Weather"</p>
              <p>• "Agriculture"</p>
              <p>• "Help"</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultilingualVoiceInterface;
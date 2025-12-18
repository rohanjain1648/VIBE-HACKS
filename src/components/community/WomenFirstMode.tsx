import React, { useState, useEffect } from 'react';
import { Shield, Users, Heart, DollarSign, BookOpen, MessageCircle, Lock, Eye, EyeOff, UserCheck, Calendar, MapPin, Phone } from 'lucide-react';

interface WomenGroup {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'finance' | 'business' | 'support' | 'education' | 'safety';
  memberCount: number;
  isPrivate: boolean;
  moderators: string[];
  location: string;
  meetingSchedule?: string;
  tags: string[];
}

interface SafetyFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface HealthResource {
  id: string;
  title: string;
  category: 'reproductive' | 'mental' | 'maternal' | 'general';
  description: string;
  provider: string;
  contact: string;
  isConfidential: boolean;
}

interface FinancialResource {
  id: string;
  title: string;
  type: 'grant' | 'loan' | 'education' | 'support';
  description: string;
  eligibility: string[];
  amount?: string;
  provider: string;
  applicationDeadline?: string;
}

const WOMEN_GROUPS: WomenGroup[] = [
  {
    id: 'group-1',
    name: 'Rural Women\'s Health Circle',
    description: 'Safe space to discuss women\'s health issues, share experiences, and access resources.',
    category: 'health',
    memberCount: 156,
    isPrivate: true,
    moderators: ['Dr. Sarah Chen', 'Nurse Mary Williams'],
    location: 'Central West NSW',
    meetingSchedule: 'Every Tuesday 7 PM',
    tags: ['health', 'support', 'confidential', 'women-only']
  },
  {
    id: 'group-2',
    name: 'Women in Agriculture Network',
    description: 'Connecting female farmers, sharing knowledge, and supporting women in agricultural leadership.',
    category: 'business',
    memberCount: 89,
    isPrivate: false,
    moderators: ['Emma Thompson', 'Lisa Rodriguez'],
    location: 'Regional Australia',
    meetingSchedule: 'Monthly workshops',
    tags: ['farming', 'business', 'leadership', 'networking']
  },
  {
    id: 'group-3',
    name: 'Financial Independence for Women',
    description: 'Learn about budgeting, investing, and building financial security in rural areas.',
    category: 'finance',
    memberCount: 234,
    isPrivate: true,
    moderators: ['Financial Advisor Jane Smith'],
    location: 'NSW & QLD',
    meetingSchedule: 'Bi-weekly online sessions',
    tags: ['finance', 'education', 'independence', 'planning']
  },
  {
    id: 'group-4',
    name: 'Mothers Supporting Mothers',
    description: 'Peer support for mothers dealing with isolation, parenting challenges, and mental health.',
    category: 'support',
    memberCount: 312,
    isPrivate: true,
    moderators: ['Counselor Rebecca Davis', 'Midwife Anna Lee'],
    location: 'Rural Australia',
    meetingSchedule: 'Daily check-ins available',
    tags: ['motherhood', 'mental-health', 'support', 'parenting']
  },
  {
    id: 'group-5',
    name: 'Women\'s Safety Network',
    description: 'Resources, support, and safety planning for women experiencing domestic violence.',
    category: 'safety',
    memberCount: 78,
    isPrivate: true,
    moderators: ['Crisis Counselor Maria Santos'],
    location: 'Confidential',
    tags: ['safety', 'crisis-support', 'confidential', 'emergency']
  }
];

const SAFETY_FEATURES: SafetyFeature[] = [
  {
    id: 'anonymous-mode',
    title: 'Anonymous Browsing',
    description: 'Browse and participate without revealing your identity',
    icon: <EyeOff className="text-purple-600" size={24} />,
    enabled: true
  },
  {
    id: 'private-messaging',
    title: 'Encrypted Messaging',
    description: 'End-to-end encrypted private conversations',
    icon: <Lock className="text-green-600" size={24} />,
    enabled: true
  },
  {
    id: 'panic-button',
    title: 'Emergency Exit',
    description: 'Quick exit button that clears history and redirects',
    icon: <Shield className="text-red-600" size={24} />,
    enabled: true
  },
  {
    id: 'trusted-contacts',
    title: 'Trusted Contacts',
    description: 'Designate emergency contacts for safety check-ins',
    icon: <UserCheck className="text-blue-600" size={24} />,
    enabled: false
  }
];

const HEALTH_RESOURCES: HealthResource[] = [
  {
    id: 'health-1',
    title: 'Women\'s Health Nurse',
    category: 'reproductive',
    description: 'Confidential reproductive health consultations via telehealth',
    provider: 'Rural Women\'s Health Service',
    contact: '1800 WOMEN (1800 966 363)',
    isConfidential: true
  },
  {
    id: 'health-2',
    title: 'Perinatal Mental Health Support',
    category: 'mental',
    description: 'Specialized support for pregnancy and postpartum mental health',
    provider: 'PANDA (Perinatal Anxiety & Depression Australia)',
    contact: '1300 726 306',
    isConfidential: true
  },
  {
    id: 'health-3',
    title: 'Mobile Women\'s Health Clinic',
    category: 'general',
    description: 'Regular visits to rural areas for health screenings and consultations',
    provider: 'NSW Health',
    contact: 'Contact local health district',
    isConfidential: false
  }
];

const FINANCIAL_RESOURCES: FinancialResource[] = [
  {
    id: 'finance-1',
    title: 'Women in Agriculture Grant',
    type: 'grant',
    description: 'Funding for women starting or expanding agricultural businesses',
    eligibility: ['Female-owned business', 'Agricultural sector', 'Rural location'],
    amount: 'Up to $50,000',
    provider: 'Department of Agriculture',
    applicationDeadline: '30 June 2024'
  },
  {
    id: 'finance-2',
    title: 'Financial Literacy Program',
    type: 'education',
    description: 'Free financial education workshops specifically for rural women',
    eligibility: ['Women in rural areas', 'All income levels'],
    provider: 'Rural Financial Counselling Service',
    applicationDeadline: 'Ongoing enrollment'
  },
  {
    id: 'finance-3',
    title: 'Emergency Financial Support',
    type: 'support',
    description: 'Immediate financial assistance for women in crisis situations',
    eligibility: ['Women experiencing hardship', 'Confidential application'],
    amount: 'Up to $2,000',
    provider: 'Women\'s Crisis Support Fund',
    applicationDeadline: 'Apply anytime'
  }
];

export const WomenFirstMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'health' | 'finance' | 'safety'>('groups');
  const [selectedGroup, setSelectedGroup] = useState<WomenGroup | null>(null);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [showEmergencyExit, setShowEmergencyExit] = useState(false);

  useEffect(() => {
    // Show emergency exit button after 5 seconds
    const timer = setTimeout(() => setShowEmergencyExit(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return <Heart className="text-pink-600" size={20} />;
      case 'finance': return <DollarSign className="text-green-600" size={20} />;
      case 'business': return <Users className="text-blue-600" size={20} />;
      case 'support': return <MessageCircle className="text-purple-600" size={20} />;
      case 'education': return <BookOpen className="text-orange-600" size={20} />;
      case 'safety': return <Shield className="text-red-600" size={20} />;
      default: return <Users className="text-gray-600" size={20} />;
    }
  };

  const emergencyExit = () => {
    // Clear browsing history and redirect to a safe site
    if (window.history.replaceState) {
      window.history.replaceState(null, '', 'https://www.google.com');
    }
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Emergency Exit Button */}
      {showEmergencyExit && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={emergencyExit}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-all"
            title="Quick exit - clears history and redirects to Google"
          >
            <Shield size={16} />
            <span className="text-sm font-medium">Quick Exit</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">👩‍🌾 Women-First Community Space</h1>
            <p className="text-pink-100">Safe, supportive, and empowering resources for rural women</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Privacy Mode</span>
              <button
                onClick={() => setPrivacyMode(!privacyMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacyMode ? 'bg-pink-300' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacyMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {privacyMode && <EyeOff className="text-pink-200" size={20} />}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'groups', label: 'Women\'s Groups', icon: <Users size={20} /> },
            { id: 'health', label: 'Health Resources', icon: <Heart size={20} /> },
            { id: 'finance', label: 'Financial Support', icon: <DollarSign size={20} /> },
            { id: 'safety', label: 'Safety Features', icon: <Shield size={20} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'groups' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {WOMEN_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(group.category)}
                      <div>
                        <h3 className="font-semibold text-gray-800">{group.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{group.memberCount} members</span>
                          {group.isPrivate && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <Lock size={10} className="mr-1" />
                              Private
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{group.description}</p>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-2" />
                      <span>{group.location}</span>
                    </div>
                    {group.meetingSchedule && (
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-2" />
                        <span>{group.meetingSchedule}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {group.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_RESOURCES.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                  {resource.isConfidential && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Lock size={10} className="mr-1" />
                      Confidential
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Provider:</span>
                    <span className="text-gray-600 ml-2">{resource.provider}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={14} className="text-blue-600 mr-2" />
                    <span className="text-blue-600 font-medium">{resource.contact}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Access Resource
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FINANCIAL_RESOURCES.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'grant' ? 'bg-green-100 text-green-800' :
                    resource.type === 'loan' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'education' ? 'bg-orange-100 text-orange-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {resource.type.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                {resource.amount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <span className="text-green-800 font-semibold">{resource.amount}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Eligibility:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {resource.eligibility.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Provider: {resource.provider}</span>
                    {resource.applicationDeadline && (
                      <span className="text-orange-600 font-medium">
                        Due: {resource.applicationDeadline}
                      </span>
                    )}
                  </div>
                </div>

                <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'safety' && (
          <div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">🚨 Emergency Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">000</p>
                  <p className="text-sm text-red-700">Emergency Services</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">1800 737 732</p>
                  <p className="text-sm text-red-700">1800RESPECT</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">13 11 14</p>
                  <p className="text-sm text-red-700">Lifeline</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAFETY_FEATURES.map((feature) => (
                <div key={feature.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {feature.icon}
                      <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                    </div>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        feature.enabled ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Group Detail Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(selectedGroup.category)}
                  <div>
                    <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
                    <p className="text-gray-600">{selectedGroup.memberCount} members</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-700 mb-4">{selectedGroup.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Group Details:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      <span>{selectedGroup.location}</span>
                    </div>
                    {selectedGroup.meetingSchedule && (
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        <span>{selectedGroup.meetingSchedule}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Moderators:</h3>
                  <div className="space-y-1">
                    {selectedGroup.moderators.map((moderator, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">
                        {moderator}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Join Group
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenFirstMode;
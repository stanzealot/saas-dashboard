// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  User,
  Save,
  Check,
  Bell,
  Shield,
  Globe,
  Palette,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useAuth, useTheme } from '@/hooks';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  desktop: boolean;
  marketing: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
  dataCollection: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  company: string;
  jobTitle: string;
  website: string;
  birthDate: string;
}

export const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    company: '',
    jobTitle: '',
    website: '',
    birthDate: '',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    desktop: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    dataCollection: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'notifications' | 'privacy' | 'appearance'
  >('profile');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notificationSettings');
    const savedPrivacy = localStorage.getItem('privacySettings');
    const savedFormData = localStorage.getItem('profileFormData');

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedPrivacy) {
      setPrivacy(JSON.parse(savedPrivacy));
    }
    if (savedFormData) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(savedFormData) }));
    }
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateProfile({
        name: formData.name,
        email: formData.email,
      });

      // Save extended profile data to localStorage
      localStorage.setItem('profileFormData', JSON.stringify(formData));

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);
    localStorage.setItem(
      'notificationSettings',
      JSON.stringify(newNotifications)
    );
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    const newPrivacy = { ...privacy, [key]: value };
    setPrivacy(newPrivacy);
    localStorage.setItem('privacySettings', JSON.stringify(newPrivacy));
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleAvatarChange = () => {
    // Simulate avatar change
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    updateProfile({ avatar: newAvatar });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h3>

              {showSuccess && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-400">
                    Profile updated successfully!
                  </span>
                </div>
              )}

              {/* Avatar Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your job title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="h-4 w-4 inline mr-2" />
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your website URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Birth Date
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             dark:bg-gray-700 dark:text-white transition-colors resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                           flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                {[
                  {
                    key: 'email',
                    label: 'Email Notifications',
                    description: 'Receive notifications via email',
                  },
                  {
                    key: 'push',
                    label: 'Push Notifications',
                    description: 'Receive push notifications on your device',
                  },
                  {
                    key: 'desktop',
                    label: 'Desktop Notifications',
                    description: 'Show notifications on your desktop',
                  },
                  {
                    key: 'marketing',
                    label: 'Marketing Emails',
                    description: 'Receive marketing and promotional emails',
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleNotificationChange(
                          item.key as keyof NotificationSettings,
                          !notifications[item.key as keyof NotificationSettings]
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                ${
                                  notifications[
                                    item.key as keyof NotificationSettings
                                  ]
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200 dark:bg-gray-600'
                                }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                                  ${
                                    notifications[
                                      item.key as keyof NotificationSettings
                                    ]
                                      ? 'translate-x-6'
                                      : 'translate-x-1'
                                  }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Privacy Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) =>
                      handlePrivacyChange('profileVisibility', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                {[
                  {
                    key: 'showEmail',
                    label: 'Show Email Address',
                    description: 'Display your email address on your profile',
                  },
                  {
                    key: 'showPhone',
                    label: 'Show Phone Number',
                    description: 'Display your phone number on your profile',
                  },
                  {
                    key: 'dataCollection',
                    label: 'Data Collection',
                    description:
                      'Allow us to collect analytics data to improve our service',
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handlePrivacyChange(
                          item.key as keyof PrivacySettings,
                          !privacy[item.key as keyof PrivacySettings]
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                ${
                                  privacy[item.key as keyof PrivacySettings]
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200 dark:bg-gray-600'
                                }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                                  ${
                                    privacy[item.key as keyof PrivacySettings]
                                      ? 'translate-x-6'
                                      : 'translate-x-1'
                                  }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Appearance Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                      {theme === 'dark' ? (
                        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {theme === 'dark'
                          ? 'Currently using dark theme'
                          : 'Currently using light theme'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleThemeToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                              ${
                                theme === 'dark'
                                  ? 'bg-blue-600'
                                  : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                    role="switch"
                    aria-checked={theme === 'dark'}
                    aria-label="Toggle dark mode"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                                ${
                                  theme === 'dark'
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                }`}
                    />
                  </button>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Theme preference is automatically saved and will persist
                        across sessions.
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                        The system will remember your choice and apply it on
                        future visits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

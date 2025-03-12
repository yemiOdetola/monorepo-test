'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserProfile = {
  firstName: string;
  lastName: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserProfile>({
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const usernameCookie = cookies.find(cookie => cookie.trim().startsWith('username='));

    if (!usernameCookie) {
      router.push('/login');
      return;
    }

    const username = usernameCookie.split('=')[1];
    const storedProfile = localStorage.getItem(`profile_${username}`);

    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
    } else {
      const defaultProfile: UserProfile = {
        firstName: username || 'Guest',
        lastName: ''
      };
      setFormData(defaultProfile);
      localStorage.setItem(`profile_${username}`, JSON.stringify(defaultProfile));
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const username = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('username='))
        ?.split('=')[1];

      if (!username) throw new Error('User not found');

      localStorage.setItem(`profile_${username}`, JSON.stringify(formData));

      await new Promise(resolve => setTimeout(resolve, 500));

      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600 mb-2">
              Profile Settings
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Customize your profile information
            </p>
          </div>

          <div className="rounded-2xl p-4 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-neutral-700 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-neutral-700 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`p-3 sm:p-4 rounded-xl text-sm sm:text-base ${message.includes('success')
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center text-sm sm:text-base">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

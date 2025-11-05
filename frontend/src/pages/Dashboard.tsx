import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuthStatus, useLogoutMutation, useProfileQuery } from '../hooks/useAuth';
import { authToasts, showSuccessToast } from '../utils/notifications';
import NotificationDemo from '../components/NotificationDemo';

const Dashboard: React.FC = () => {
  const { user } = useAuthStatus();
  const logoutMutation = useLogoutMutation();
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useProfileQuery();

  // Show welcome toast when component mounts
  useEffect(() => {
    if (user?.email) {
      const timer = setTimeout(() => {
        showSuccessToast(`🎉 Chào mừng bạn trở lại, ${user.email}!`);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [user?.email]);

  const handleLogout = async () => {
    const loadingToast = authToasts.logoutLoading();
    
    try {
      await logoutMutation.mutateAsync();
      toast.dismiss(loadingToast);
      authToasts.logoutSuccess();
    } catch (error) {
      toast.dismiss(loadingToast);
      authToasts.logoutError();
      console.error('Logout failed:', error);
    }
  };

  const handleLogoutAll = async () => {
    const loadingToast = authToasts.logoutLoading();
    
    try {
      // This would need a separate API endpoint for logging out from all devices
      await logoutMutation.mutateAsync();
      toast.dismiss(loadingToast);
      authToasts.logoutSuccess();
    } catch (error) {
      toast.dismiss(loadingToast);
      authToasts.logoutError();
      console.error('Logout all failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="space-x-2">
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </button>
            <button
              onClick={handleLogoutAll}
              disabled={logoutMutation.isPending}
              className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Logout All Devices
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
            
            {isProfileLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : profileError ? (
              <div className="text-red-600">
                Failed to load profile data
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email || profileData?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">User ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{user?.id || profileData?.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.createdAt || profileData?.createdAt 
                      ? new Date(user?.createdAt || profileData?.createdAt || '').toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Authentication Status Card */}
          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Status</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-900">Successfully authenticated</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-900">Access token active</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-900">Refresh token available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Demonstration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">JWT Authentication Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900">Access Token</h3>
            <p className="text-sm text-blue-700 mt-2">
              Short-lived token stored in memory for secure API requests.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900">Refresh Token</h3>
            <p className="text-sm text-green-700 mt-2">
              Long-lived token stored in localStorage for automatic token renewal.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900">Auto Refresh</h3>
            <p className="text-sm text-purple-700 mt-2">
              Automatic token refresh on expired access tokens using Axios interceptors.
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900">Protected Routes</h3>
            <p className="text-sm text-yellow-700 mt-2">
              Routes that require authentication with automatic redirects.
            </p>
          </div>
          
          <div className="bg-pink-50 rounded-lg p-4">
            <h3 className="font-semibold text-pink-900">React Query</h3>
            <p className="text-sm text-pink-700 mt-2">
              Efficient server state management with caching and error handling.
            </p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900">Form Validation</h3>
            <p className="text-sm text-indigo-700 mt-2">
              React Hook Form with comprehensive validation and error handling.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Demo Section */}
      <NotificationDemo />
    </div>
  );
};

export default Dashboard;
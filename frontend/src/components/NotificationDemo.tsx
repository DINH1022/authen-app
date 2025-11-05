import React from 'react';
import { authToasts, showSuccessToast, showErrorToast, showInfoToast } from '../utils/notifications';

const NotificationDemo: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">🔔 Notification Demo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Authentication Notifications */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Authentication Notifications</h4>
          
          <button
            onClick={() => authToasts.loginSuccess('test@example.com')}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            Login Success
          </button>
          
          <button
            onClick={() => authToasts.loginError('Email hoặc mật khẩu không đúng')}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Login Error
          </button>
          
          <button
            onClick={() => authToasts.registerSuccess('newuser@example.com')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Register Success
          </button>
          
          <button
            onClick={() => authToasts.registerError('Email đã tồn tại')}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Register Error
          </button>
          
          <button
            onClick={() => authToasts.logoutSuccess()}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
          >
            Logout Success
          </button>
        </div>

        {/* Validation Notifications */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Validation Notifications</h4>
          
          <button
            onClick={() => authToasts.invalidEmail()}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
          >
            Invalid Email
          </button>
          
          <button
            onClick={() => authToasts.weakPassword()}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
          >
            Weak Password
          </button>
          
          <button
            onClick={() => authToasts.passwordMismatch()}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
          >
            Password Mismatch
          </button>
          
          <button
            onClick={() => authToasts.tokenRefreshError()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Token Expired
          </button>
          
          <button
            onClick={() => authToasts.networkError()}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
          >
            Network Error
          </button>
        </div>

        {/* General Notifications */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="font-medium text-gray-700">General Notifications</h4>
          
          <div className="flex gap-2">
            <button
              onClick={() => showSuccessToast('Thao tác thành công!')}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Success Toast
            </button>
            
            <button
              onClick={() => showErrorToast('Có lỗi xảy ra!')}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Error Toast
            </button>
            
            <button
              onClick={() => showInfoToast('Thông tin quan trọng')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Info Toast
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-700 mb-2">📝 Toast Features:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✅ Automatic dismiss after 4 seconds</li>
          <li>✅ Multiple toast types: Success, Error, Info, Loading</li>
          <li>✅ Custom styling with icons</li>
          <li>✅ Vietnamese language support</li>
          <li>✅ Position: Top Center</li>
          <li>✅ Responsive design</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationDemo;
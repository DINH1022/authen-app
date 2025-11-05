import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuthStatus();

  if (isAuthenticated) {
    return (
      <div className="px-4 py-8 sm:px-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome back, {user?.email}!
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            You are successfully authenticated. Access your dashboard to manage your account.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Go to Dashboard</h2>
              <p className="text-gray-600 mb-4">
                Access your secure dashboard with all your account information.
              </p>
              <Link
                to="/dashboard"
                className="btn-primary inline-block"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          JWT Authentication Demo
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          A complete JWT authentication system with Access & Refresh tokens, built with NestJS backend and React frontend.
          Experience secure authentication with automatic token refresh.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">New User?</h2>
            <p className="text-gray-600 mb-4">
              Create your account and experience secure JWT authentication.
            </p>
            <Link
              to="/signup"
              className="btn-primary inline-block"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Already have an account?</h2>
            <p className="text-gray-600 mb-4">
              Sign in to access your secure dashboard.
            </p>
            <Link
              to="/login"
              className="btn-secondary inline-block"
            >
              Login
            </Link>
          </div>
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">JWT Features</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>✓ Access & Refresh Tokens</div>
            <div>✓ Automatic Token Refresh</div>
            <div>✓ Secure Token Storage</div>
            <div>✓ Protected Routes</div>
            <div>✓ React Query Integration</div>
            <div>✓ Form Validation</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
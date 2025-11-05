import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../hooks/useAuth';
import { RegisterFormData } from '../types/auth.types';
import { authToasts, dismissAllToasts } from '../utils/notifications';

const SignUp: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    // Clear any existing messages and toasts
    setMessage('');
    setMessageType('');
    dismissAllToasts();

    // Show loading toast
    const loadingToast = authToasts.registerLoading();

    try {
      await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      authToasts.registerSuccess(data.email);
      
      // Clear form
      reset();
      setMessage('');
      
      // Redirect after successful registration
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (error: any) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
      
      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join(', ');
        } else {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      authToasts.registerError(errorMessage);
      
      // Also set form message for accessibility
      setMessageType('error');
      setMessage(errorMessage);
    }
  };

  const password = watch('password');

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-gray-600 mt-2">Create your new account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address',
              },
              validate: (value) => {
                if (!/\S+@\S+\.\S+/.test(value)) {
                  authToasts.invalidEmail();
                  return 'Please enter a valid email address';
                }
                return true;
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              validate: (value) => {
                if (value.length < 6) {
                  authToasts.weakPassword();
                  return 'Password must be at least 6 characters long';
                }
                return true;
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="form-input"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => {
                if (value !== password) {
                  authToasts.passwordMismatch();
                  return 'Passwords do not match';
                }
                return true;
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>

        {registerMutation.error && (
          <div className="error-message">
            {(registerMutation.error as any)?.response?.data?.message || 'Registration failed'}
          </div>
        )}

        {message && (
          <div className={messageType === 'success' ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
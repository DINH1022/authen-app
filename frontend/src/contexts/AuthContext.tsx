import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User } from '../types/auth.types';
import { apiClient } from '../api/apiClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokens = apiClient.getTokens();
        
        if (tokens.accessToken && tokens.refreshToken) {
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          
          // Try to get user profile to validate tokens
          try {
            const profileResponse = await apiClient.getProfile();
            setUser(profileResponse.user);
          } catch (error) {
            // If profile fetch fails, try to refresh token
            try {
              const newAccessToken = await apiClient.refreshAccessToken();
              if (newAccessToken) {
                setAccessToken(newAccessToken);
                const profileResponse = await apiClient.getProfile();
                setUser(profileResponse.user);
              } else {
                clearAuthState();
              }
            } catch (refreshError) {
              clearAuthState();
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const clearAuthState = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiClient.login({ email, password });
      
      setUser(response.user);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
    } catch (error) {
      clearAuthState();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.register({ email, password });
      // After registration, automatically log in
      await login(email, password);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthState();
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const newAccessToken = await apiClient.refreshAccessToken();
      if (newAccessToken) {
        setAccessToken(newAccessToken);
        return newAccessToken;
      }
      return null;
    } catch (error) {
      clearAuthState();
      return null;
    }
  };

  const isAuthenticated = !!user && !!accessToken && !!refreshToken;

  const contextValue: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshAccessToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
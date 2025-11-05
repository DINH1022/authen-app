import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/apiClient';
import { useAuth } from '../contexts/AuthContext';
import { LoginRequest, RegisterRequest } from '../types/auth.types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  user: (id: string) => [...authKeys.all, 'user', id] as const,
};

// Login mutation
export const useLoginMutation = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: LoginRequest) => {
      await login(email, password);
    },
    onSuccess: () => {
      // Invalidate and refetch profile data after login
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// Register mutation
export const useRegisterMutation = () => {
  const { register } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: RegisterRequest) => {
      await register(email, password);
    },
    onSuccess: () => {
      // Invalidate and refetch profile data after registration
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

// Logout mutation
export const useLogoutMutation = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // Clear all queries after logout
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};

// Profile query
export const useProfileQuery = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await apiClient.getProfile();
      return response.user;
    },
    enabled: isAuthenticated,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors (authentication issues)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });
};

// Refresh token mutation
export const useRefreshTokenMutation = () => {
  const { refreshAccessToken } = useAuth();

  return useMutation({
    mutationFn: refreshAccessToken,
    onError: (error) => {
      console.error('Token refresh failed:', error);
    },
  });
};

// Custom hook for checking authentication status
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: !isLoading,
  };
};
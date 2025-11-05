import axios, { AxiosInstance } from 'axios';
import {
  AuthResponse,
  RefreshTokenResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  ProfileResponse,
  LogoutResponse,
} from '../types/auth.types';
import { authToasts } from '../utils/notifications';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiClient {
  private axiosInstance: AxiosInstance;
  private refreshToken: string | null = null;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize refresh token from localStorage
    this.refreshToken = this.getStoredRefreshToken();

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to attach access token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          this.refreshToken &&
          !originalRequest.url?.includes('/auth/refresh')
        ) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.handleTokenRefresh();
            if (newAccessToken) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Helper method to handle network errors
  private handleNetworkError(error: any) {
    if (!error.response) {
      // Network error
      authToasts.networkError();
    }
    return Promise.reject(error);
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performTokenRefresh();

    try {
      const newAccessToken = await this.refreshPromise;
      return newAccessToken;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string | null> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken: this.refreshToken },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const { accessToken, refreshToken } = response.data;
      
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);
      
      return accessToken;
    } catch (error) {
      this.handleAuthFailure();
      throw error;
    }
  }

  private handleAuthFailure() {
    this.clearTokens();
    // Show token refresh error toast
    authToasts.tokenRefreshError();
    // Redirect to login page
    window.location.href = '/login';
  }

  // Token management methods
  private getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  private setAccessToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
  }

  private getStoredRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private setRefreshToken(token: string): void {
    this.refreshToken = token;
    localStorage.setItem('refreshToken', token);
  }

  private clearTokens(): void {
    this.refreshToken = null;
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Auth API methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.axiosInstance.post<AuthResponse>('/auth/login', credentials);
      const { accessToken, refreshToken } = response.data;
      
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);
      
      return response.data;
    } catch (error) {
      return this.handleNetworkError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await this.axiosInstance.post<RegisterResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      return this.handleNetworkError(error);
    }
  }

  async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
        await this.axiosInstance.post<LogoutResponse>('/auth/logout', {
          refreshToken: this.refreshToken,
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
        // Don't show network error for logout as it's not critical
      }
    }
    this.clearTokens();
  }

  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await this.axiosInstance.get<ProfileResponse>('/auth/profile');
      return response.data;
    } catch (error) {
      return this.handleNetworkError(error);
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    return this.handleTokenRefresh();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken() && !!this.refreshToken;
  }

  // Get current tokens
  getTokens() {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.refreshToken,
    };
  }

  // Initialize tokens (used when app starts)
  initializeTokens(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
export default apiClient;
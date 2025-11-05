// Authentication related types
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  statusCode: number;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface ProfileResponse {
  statusCode: number;
  user: User;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  statusCode: number;
  message: string;
}

export interface RegisterResponse {
  statusCode: number;
  message: string;
  user: {
    email: string;
    createdAt: string;
  };
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

// API Error types
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

// Form validation types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, ApiError, getAuthToken, setAuthToken, getApiBaseUrl } from '@/lib/api/client';
import { User, UserCreate, LoginRequest } from '@/lib/api/types';

export type BackendStatusState = 'online' | 'degraded' | 'offline' | 'checking';

interface BackendHealthInfo {
  state: BackendStatusState;
  service?: string;
  version?: string;
  environment?: string;
  postgres?: string;
  weaviate?: string;
  latencyMs?: number;
  lastChecked?: Date;
  apiUrl: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  backendHealth: BackendHealthInfo;
  checkBackendHealth: () => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: UserCreate) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backendHealth, setBackendHealth] = useState<BackendHealthInfo>({
    state: 'checking',
    apiUrl: getApiBaseUrl(),
  });

  const checkBackendHealth = useCallback(async () => {
    const startTime = performance.now();
    const currentUrl = getApiBaseUrl();
    try {
      const [health, ready] = await Promise.allSettled([
        api.health.check(),
        api.health.ready(),
      ]);

      const latencyMs = Math.round(performance.now() - startTime);

      if (health.status === 'fulfilled') {
        const healthData = health.value;
        const readyData = ready.status === 'fulfilled' ? ready.value : null;

        const isReady = readyData?.status === 'ready';
        setBackendHealth({
          state: isReady ? 'online' : 'degraded',
          service: healthData.service,
          version: healthData.version,
          environment: healthData.environment,
          postgres: readyData?.checks?.postgres || 'unknown',
          weaviate: readyData?.checks?.weaviate || 'unknown',
          latencyMs,
          lastChecked: new Date(),
          apiUrl: currentUrl,
        });
      } else {
        setBackendHealth({
          state: 'offline',
          latencyMs,
          lastChecked: new Date(),
          apiUrl: currentUrl,
        });
      }
    } catch {
      setBackendHealth({
        state: 'offline',
        lastChecked: new Date(),
        apiUrl: currentUrl,
      });
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const storedToken = getAuthToken();
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await api.auth.getMe();
      setUser(currentUser);
      setToken(storedToken);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setAuthToken(null);
        setUser(null);
        setToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hydrate on mount
  useEffect(() => {
    const initialToken = getAuthToken();
    setToken(initialToken);
    refreshUser();
    checkBackendHealth();

    // Periodic health pulse every 60s
    const interval = setInterval(checkBackendHealth, 60000);
    return () => clearInterval(interval);
  }, [refreshUser, checkBackendHealth]);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await api.auth.login(credentials);
      setAuthToken(res.access_token);
      setToken(res.access_token);
      const currentUser = await api.auth.getMe();
      setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserCreate) => {
    setIsLoading(true);
    try {
      await api.auth.register(userData);
      // Automatically log in after registration
      const res = await api.auth.login({
        email: userData.email,
        password: userData.password,
      });
      setAuthToken(res.access_token);
      setToken(res.access_token);
      const currentUser = await api.auth.getMe();
      setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        backendHealth,
        checkBackendHealth,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

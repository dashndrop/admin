import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, AdminProfile } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminProfile | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      if (api.isAuthenticated()) {
        try {
          const profile = await api.getAdminProfile();
          setUser(profile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          // Token is invalid or expired, logout and redirect to login
          api.logout();
          setIsAuthenticated(false);
          setUser(null);
          
          // Only redirect if we're not already on the login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      } else if (!window.location.pathname.includes('/login')) {
        // If not authenticated and not on login page, redirect to login
        window.location.href = '/login';
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log('AuthContext: Starting login process');
      await api.login(username, password);
      console.log('AuthContext: Login successful, fetching profile');
      const profile = await api.getAdminProfile();
      console.log('AuthContext: Profile fetched:', profile);
      setUser(profile);
      setIsAuthenticated(true);
      console.log('AuthContext: Authentication state updated');
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

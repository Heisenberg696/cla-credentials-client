'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '@/utils/auth';
import { User } from '@/types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = AuthService.getToken();
    const userData = AuthService.getUser();
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    }
    
    setLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    AuthService.saveSession(token, userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
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
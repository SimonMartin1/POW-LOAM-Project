import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaseUrl } from '@/app/config/config';

const BASE_URL = getBaseUrl() + '/api/mobile'; 

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isSplashLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  // 1. EFECTO DE CARGA INICIAL (DB + Storage)
  useEffect(() => {
    const initApp = async () => {
      try {
        await isLoggedIn(); // Chequeamos AsyncStorage (token)
      } catch (e) {
        console.log("Error inicializando app:", e);
      } finally {
        setIsSplashLoading(false);
      }
    };
    initApp();
  }, []);

  const isLoggedIn = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');

      if (userInfo && userToken) {
        setUser(JSON.parse(userInfo));
        setToken(userToken);
      }
    } catch (e) {
      console.log(`Error de logueo: ${e}`);
    }
  };

  const handleAuthSuccess = async (data: any) => {
    try {
        setToken(data.token);
        setUser(data.user);
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    } catch (e) {
        console.log("Error guardando datos", e);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        await handleAuthSuccess(data);
      } else {
        throw new Error(data.message || 'Error en login');
      }
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        await handleAuthSuccess(data); 
      } else {
        throw new Error(data.message || 'Error al registrar');
      }
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 3. LOGOUT COMPLETO
  const logout = async () => {
    setIsLoading(true);
    try {
      if (token) {
        await fetch(`${BASE_URL}/logout`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });
      }
    } catch(e) {
        console.log("Error logout server", e);
    } finally {
        // Limpiamos memoria
        setUser(null);
        setToken(null);
        // Limpiamos AsyncStorage (Sesión actual)
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('userToken');
        // Limpiamos SQLite (Credenciales guardadas para biometría)
        
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, isSplashLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
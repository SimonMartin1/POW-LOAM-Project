import React, { createContext, useState, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import client from '@/app/api/client';
import { User, LoginResponse, LoginResult } from '@/app/interfaces/auth';
import { AxiosResponse } from 'axios';
import { Platform } from 'react-native';


interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    loginStepOne: (email: string, password: string) => Promise<LoginResult>;
    verifyOtp: (userId: number, code: string) => Promise<void>;
    logout: () => Promise<void>;
    can: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const finishLogin = async (token: string, userData: User) => {
        await SecureStore.setItemAsync('userToken', token);
        setUser(userData);
    };


    const loginStepOne = async (email: string, password: string): Promise<LoginResult> => {
        setIsLoading(true);
        try {

const response = await client.post('/login', { email, password, device_name: Platform.OS });
            
            if (response.data.require_2fa && response.data.temp_id) {
                setIsLoading(false);
                return { 
                    status: '2FA_REQUIRED', 
                    userId: response.data.temp_id 
                };
            }

            if (response.data.token && response.data.user) {
                await finishLogin(response.data.token, response.data.user);
                setIsLoading(false);
                return { status: 'SUCCESS' };
            }

            throw new Error('Respuesta inesperada del servidor');

        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };


    const verifyOtp = async (userId: number, code: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response: AxiosResponse<LoginResponse> = await client.post('/2fa/verify', { 
                user_id: userId, 
                code 
            });
            
            if (response.data.token && response.data.user) {
                await finishLogin(response.data.token, response.data.user);
            } else {
                throw new Error('No se pudo verificar el token');
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            
            await client.post('/logout'); 
        } catch (e) {
            console.log(e);
        }
        await SecureStore.deleteItemAsync('userToken');
        setUser(null);
        setIsLoading(false);
    };

    const can = (permission: string): boolean => {
        return user?.permissions?.includes(permission) ?? false;
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading, 
            isAuthenticated: !!user, 
            loginStepOne, 
            verifyOtp, 
            logout, 
            can 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
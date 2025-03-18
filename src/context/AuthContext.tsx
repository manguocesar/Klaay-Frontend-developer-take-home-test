import { AuthContextType } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token') || null);

    const addAuthToken = (newToken: string) => {
        localStorage.setItem('auth_token', newToken);
        setToken(newToken);
    };

    const removeAuthToken = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, addAuthToken, removeAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
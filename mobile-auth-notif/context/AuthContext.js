import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { getMe, loginUser } from '../services/authService';

const AuthContext = createContext(null);
const TOKEN_KEY = 'access_token';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        restoreSession();
    }, []);

    async function restoreSession() {
        try {
            const saved = await SecureStore.getItemAsync(TOKEN_KEY);
            if (!saved) {
                setLoading(false);
                return;
            }
            const me = await getMe(saved);
            setToken(saved);
            setUser(me);
        } catch (e) {
            console.log("Session restore failed:", e);
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email, password) {
        try {
            const response = await loginUser(email, password);
            console.log("DEBUG LOGIN API:", response);

            const extractedToken = response?.token || response?.access_token || response?.data?.token;
            const extractedUser = response?.user || response?.data?.user || response;

            if (!extractedToken) {
                throw new Error("Token tidak ditemukan dalam respons server!");
            }

            await SecureStore.setItemAsync(TOKEN_KEY, extractedToken);
            setToken(extractedToken);
            setUser(extractedUser);
            
            router.replace('/(app)');
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    }

    async function signOut() {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setToken(null);
            setUser(null);
        } catch (e) {
            console.log("Logout error:", e);
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
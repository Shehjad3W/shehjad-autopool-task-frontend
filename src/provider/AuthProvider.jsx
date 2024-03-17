import React, { createContext, useContext, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const signup = async (email, password) => {
        try {
            const res = await axiosPublic.post('/users/signup', { email, password });
            const newToken = res.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axiosPublic.post('/users/login', { email, password });
            const newToken = res.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const isAuthenticated = () => {
        return token !== null;
    };

    const authContextValue = {
        signup,
        login,
        logout,
        isAuthenticated,
    };


    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
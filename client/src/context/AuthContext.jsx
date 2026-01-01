import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            const { data } = await api.signIn(formData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.response?.data || 'Login Failed');
        }
    };

    const register = async (formData) => {
        try {
            await api.signUp(formData);
            // Don't auto-login. Let component handle redirect to verification.
            // setUser(data);
            // localStorage.setItem('userInfo', JSON.stringify(data));
            // navigate('/');
            return true;
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.response?.data || 'Registration Failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

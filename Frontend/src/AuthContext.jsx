import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/user/profile");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            logout();
        }
    };

    const login = async (values) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", values);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, ReactNode, useEffect, useState } from "react";
import { ERoles } from "../routeMap";
import api from "../api";

export interface IUser {
    id: number;
    email: string;
    role: ERoles;
}

export interface IAuthContext {
    isLoading: boolean;
    user: IUser | null;
    isAuthenticated: boolean;
    login: (user: IUser) => void;
    logout: () => void;
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    const login = (userData: IUser) => setUser(userData);
    const logout = () => setUser(null);

    const isAuthenticated = !!user;
    useEffect(() => {
        api
        .get('/auth/me')
        .then((res) => {
            console.log('Пользователь получен:', res.data)
            login(res.data)
        })
        .catch(() => {
            console.log('Неавторизован')
            logout()
        })
        .finally(() => setIsLoading(false))
    }, [])
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
        {children}
        </AuthContext.Provider>
    );
};
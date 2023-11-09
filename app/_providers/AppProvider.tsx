'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface JwtPayload {
	userId: string;
	iat: number;
	exp: number;
	email: string;
}

interface AuthContextData extends JwtPayload {
	login: () => void;
	logout: () => void;
	userId: string;
}

const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authData, setAuthData] = useState<JwtPayload | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const router = useRouter();

	const logout = () => {
		setIsLoggedIn(false);
		localStorage.removeItem('token');
		router.push('/login');
	};

	const login = () => {
		setIsLoggedIn(true);
	};

	useEffect(() => {
		const checkToken = () => {
			const token = localStorage.getItem('token');

			if (token) {
				const decoded = jwtDecode<JwtPayload>(token);
				if (decoded.exp && decoded.exp * 1000 < Date.now()) {
					logout();
				}
				console.log('check token', decoded);
				setAuthData(decoded);
			}
		};

		if (isLoggedIn) {
			checkToken();
		}
	}, [isLoggedIn]);

	if (!authData) {
		return null;
	}

	return (
		<AuthContext.Provider value={{ ...authData, login, logout }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

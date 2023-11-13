'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface JwtPayload {
	userId: string;
	iat: number;
	exp: number;
	email: string;
	firstName: string;
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
	const [authData, setAuthData] = useState<JwtPayload | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const router = useRouter();

	const logout = () => {
		router.push('/login');
		setIsLoggedIn(false);
		localStorage.removeItem('token');
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
				} else {
					setAuthData(decoded);
				}
			} else {
				logout();
			}
		};

		const storageListener = (event: StorageEvent) => {
			if (event.key === 'token') {
				checkToken();
			}
		};

		window.addEventListener('storage', storageListener);

		checkToken();

		return () => {
			window.removeEventListener('storage', storageListener);
		};
	}, [isLoggedIn]);

	return (
		<AuthContext.Provider value={{ ...authData, login, logout }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

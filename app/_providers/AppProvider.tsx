'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<JwtPayload | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authData, setAuthData] = useState<JwtPayload | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkToken = () => {
			const token = localStorage.getItem('token');

			if (token) {
				const decoded = jwtDecode(token);
				setAuthData(decoded);
			} else {
				router.push('/login');
			}
		};

		checkToken();

		window.addEventListener('storage', checkToken);

		return () => {
			window.removeEventListener('storage', checkToken);
		};
	}, []);

	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

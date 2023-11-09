'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<JwtPayload | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authData, setAuthData] = useState<JwtPayload | null>(null);
	const router = useRouter();

	useLayoutEffect(() => {
		const checkToken = () => {
			const token = localStorage.getItem('token');

			if (token) {
				const decoded = jwtDecode(token);
				if (decoded.exp && decoded?.exp * 1000 < Date.now()) {
					logout();
				}
				setAuthData(decoded);
			} else {
			}
		};

		checkToken();

		window.addEventListener('storage', checkToken);

		return () => {
			window.removeEventListener('storage', checkToken);
		};
	}, []);

	const logout = () => {
		localStorage.removeItem('token');
		router.push('/login');
	};

	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';

const AuthContext = createContext<JwtPayload | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authData, setAuthData] = useState<JwtPayload | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			const decoded = jwtDecode(token);
			setAuthData(decoded);
		}
	}, []);

	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

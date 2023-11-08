'use client';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		const checkToken = () => {
			const token = localStorage.getItem('token');
			if (!token) router.push('/login');
		};

		checkToken();

		window.addEventListener('storage', checkToken);

		return () => {
			window.removeEventListener('storage', checkToken);
		};
	}, []);

	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const routerNavigation = usePathname();
	useLayoutEffect(() => {
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

	if (routerNavigation === '/signup' || routerNavigation === '/login') {
		return <>{children}</>;
	}

	return (
		<>
			<Header />
			{children}
		</>
	);
}

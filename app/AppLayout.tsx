'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const routerNavigation = usePathname();

	if (routerNavigation === '/signup' || routerNavigation === '/login') {
		return <>{children}</>;
	}

	return (
		<>
			<Header />
			<div className="w-[95%] p-2 mx-auto">{children}</div>
		</>
	);
}

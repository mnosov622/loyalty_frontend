import React from 'react';
import Header from '@/components/Header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

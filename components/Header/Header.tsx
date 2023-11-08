'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
const Header = () => {
	const router = useRouter();
	const logout = () => {
		localStorage.removeItem('token');
		router.push('/login');
	};

	return (
		<header className="flex justify-between items-center p-6">
			<img
				src="/path/to/logo.png"
				alt="Logo"
				className="h-12"
			/>

			<Button
				buttonProps={{ className: 'ml-auto mr-5' }}
				onClick={logout}
			>
				Logout
			</Button>

			<img
				src="/path/to/profile.jpg"
				alt="Profile"
				className="h-12 rounded-full"
			/>
		</header>
	);
};

export default Header;

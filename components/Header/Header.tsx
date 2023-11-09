'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import ProfileImage from '@/public/profile.png';
import Image from 'next/image';
import { useAuth } from '@/app/_providers/AppProvider';
import Link from 'next/link';

const Header = () => {
	const authData = useAuth();
	if (!authData) {
		return;
	}
	const { logout } = authData;

	return (
		<header className="flex justify-between items-center p-6">
			<Link href="/">
				<img
					src="/path/to/logo.png"
					alt="Logo"
					className="h-12"
				/>
			</Link>

			<Button
				buttonProps={{ className: 'ml-auto mr-5' }}
				onClick={logout}
			>
				Logout
			</Button>

			<Link href={`/profile/${authData?.userId}`}>
				<Image
					src={ProfileImage}
					width={50}
					height={20}
					alt="Profile"
					className="h-12 rounded-full"
				/>
			</Link>
		</header>
	);
};

export default Header;

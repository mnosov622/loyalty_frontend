import React from 'react';

const Header = () => {
	return (
		<header className="flex justify-between items-center p-6">
			<img
				src="/path/to/logo.png"
				alt="Logo"
				className="h-12"
			/>

			<nav className="space-x-4">
				<a
					href="/path1"
					className="text-black no-underline"
				>
					Menu Item 1
				</a>
				<a
					href="/path2"
					className="text-black no-underline"
				>
					Menu Item 2
				</a>
				<a
					href="/path3"
					className="text-black no-underline"
				>
					Menu Item 3
				</a>
			</nav>

			<img
				src="/path/to/profile.jpg"
				alt="Profile"
				className="h-12 rounded-full"
			/>
		</header>
	);
};

export default Header;

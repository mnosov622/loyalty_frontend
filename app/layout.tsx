import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './_providers/AppProvider';
import AppLayout from './AppLayout';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Loyalty',
	description: 'Loyalty app',
};

//TODO: check token on every page load
// get user session from database, if token exists in sessions table, proceed, else redirect to login

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sessions`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	credentials: 'include',
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data.statusCode);
	// 		if (data.statusCode === 401) {
	// 		}
	// 	});

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<AppLayout>{children}</AppLayout>
				</AuthProvider>
			</body>
		</html>
	);
}

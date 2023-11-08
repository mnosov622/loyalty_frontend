'use client';

import Button from '@/components/Button/Button';
import React from 'react';
import SignupForm from '@/components/SignupForm/Page';
import Link from 'next/link';

const Page = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 shadow-lg p-6 rounded bg-white">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
				</div>

				<SignupForm />

				<div className="mt-8">
					<div className="flex justify-center">
						<div className="inline-flex w-16 h-1 bg-gray-300"></div>
					</div>
					<div className="mt-6 flex justify-center text-sm text-center text-gray-500">
						<span>
							Or{' '}
							<a
								href="#"
								className="text-indigo-600 hover:text-indigo-500"
							>
								Sign up with Microsoft
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;

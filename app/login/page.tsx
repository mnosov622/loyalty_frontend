import LoginForm from '@/components/LoginForm/LoginForm';
import React from 'react';

const Page = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 shadow-lg p-6 rounded bg-white">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>{' '}
				</div>

				<LoginForm />

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
								Sign in with Microsoft {/* Change "Sign up" to "Sign in" */}
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;

import Button from '@/components/Button/Button';
import React from 'react';

const Page = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 shadow-lg p-6 rounded bg-white">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
				</div>
				<form className="mt-8 space-y-6">
					<input
						type="hidden"
						name="remember"
						value="true"
					/>
					<div className="rounded-md space-y-4">
						<div>
							<label
								htmlFor="email-address"
								className="sr-only"
							>
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="sr-only"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
						<div>
							<label
								htmlFor="confirm-password"
								className="sr-only"
							>
								Confirm Password
							</label>
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Confirm Password"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Forgot your password?
						</a>
					</div>

					<div>
						<Button>Sign up</Button>
					</div>
				</form>

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

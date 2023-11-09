import React from 'react';

const HomePage = async () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 shadow-lg p-6 rounded bg-white">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Welcome to our Loyalty App
					</h2>
				</div>
				<div className="flex flex-col items-center">
					<p className="text-center text-gray-600">
						Earn points for every purchase and get exclusive rewards!
					</p>
					<button className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Start earning points
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

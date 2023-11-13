import Button from '@/components/Button/Button';
import NewsList from '@/components/News/News';
import NewsCard from '@/components/News/NewsCard';
import { getDecodedTokenAndValidate } from '@/utils/utils';
import Link from 'next/link';
import React from 'react';

const HomePage = async () => {
	await getDecodedTokenAndValidate();

	return (
		<div className=" flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			{/* <NewsList /> */}
			<div className="max-w-md w-full space-y-8 shadow-lg p-6 rounded bg-white">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Welcome to our Loyalty App
					</h2>
				</div>

				<div className="flex">
					<Link
						href="/news/create"
						className="flex justify-center"
					>
						<Button>Create News</Button>
					</Link>
					<Link
						href="tasks"
						className="ml-5"
					>
						<Button>Tasks</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

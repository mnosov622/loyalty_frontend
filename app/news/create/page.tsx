import React, { FormEvent, useRef } from 'react';
import { NextPage } from 'next';
import Button from '@/components/Button/Button';
import NewsForm from '@/components/CreateNewsForm/NewsForm';
import Link from 'next/link';

const CreateNewsPage: NextPage = () => {
	return (
		<>
			<Link
				href="/tasks"
				className="text-underline text-purple-800"
			>
				&#8592; Go back
			</Link>
			<NewsForm />
		</>
	);
};

export default CreateNewsPage;

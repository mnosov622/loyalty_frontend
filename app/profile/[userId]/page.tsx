import { getDecodedTokenAndValidate, getToken } from '@/utils/utils';

const Page = async ({ params }: any) => {
	await getDecodedTokenAndValidate();
	const token = getToken();
	const userData = await fetch(`http://localhost:5000/users/${params.userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));

	return (
		<div className="shadow p-3">
			<h1>
				{userData?.firstName} {userData?.lastName}
			</h1>
			<p>{userData?.email}</p>
		</div>
	);
};

export default Page;

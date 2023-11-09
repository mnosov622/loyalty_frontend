const Page = async ({ params }: any) => {
	const userData = await fetch(`http://localhost:5000/users/${params.userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},

		credentials: 'include',
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));

	return (
		<div>
			<h1>
				{userData?.data?.firstName} {userData?.data?.lastName}
			</h1>
			<p>{userData?.data?.email}</p>
		</div>
	);
};

export default Page;

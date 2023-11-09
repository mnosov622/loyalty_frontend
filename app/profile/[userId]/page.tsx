const Page = async ({ params }: any) => {
	const userData = await fetch(`http://localhost:5000/users/${params.userId}`)
		.then((res) => res.json())
		.catch((err) => console.error(err));

	return (
		<div>
			<h1>
				{userData?.firstName} {userData?.lastName}
			</h1>
			<p>{userData?.email}</p>
		</div>
	);
};

export default Page;

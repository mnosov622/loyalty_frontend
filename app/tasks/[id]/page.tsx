import TaskCard from '@/components/Tasks/TaskCard';
import { JwtPayload } from '@/types/jwtPayload';
import { getDecodedTokenAndValidate, getToken } from '@/utils/utils';
import Link from 'next/link';

const Page = async ({ params }: any) => {
	let taskWithStatus: any = {};

	await getDecodedTokenAndValidate();
	const token = getToken();
	const decodedToken = await getDecodedTokenAndValidate();

	const task = await fetch(`http://localhost:5000/tasks/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));

	if (task.statusCode === 403) return <div>Task not found</div>;

	if (typeof decodedToken === 'object' && decodedToken !== null && 'userId' in decodedToken) {
		const userTask = await fetch(
			`http://localhost:5000/user-task/${params.id}?userId=${(decodedToken as JwtPayload).userId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => res.json())
			.catch((err) => console.error(err));
		taskWithStatus = {
			...task,
			status: userTask.status,
		};
	}

	return (
		<>
			<Link
				href="/tasks"
				className="text-underline text-purple-800"
			>
				&#8592; Go back
			</Link>
			<TaskCard task={taskWithStatus} />
		</>
	);
};

export default Page;

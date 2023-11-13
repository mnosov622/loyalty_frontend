import Button from '@/components/Button/Button';
import TaskCard from '@/components/Tasks/TaskCard';
import { Task } from '@/types/task';
import Link from 'next/link';
import { getDecodedTokenAndValidate, checkIfHR } from '@/utils/utils';

const TasksPage = async () => {
	await getDecodedTokenAndValidate();
	let userCanEdit = false;

	const isUserHR = await checkIfHR();
	if (isUserHR) userCanEdit = true;

	const tasks = await fetch('http://localhost:5000/tasks', {
		cache: 'no-cache',
	})
		.then((response) => response.json())
		.then((data) => data.filter((task: Task) => !task.isDeleted))
		.catch((error) => console.error('Error:', error));

	const decodedToken = await getDecodedTokenAndValidate();

	if (!tasks || tasks.length === 0)
		return (
			<div className="w-[50%] mx-auto text-center">
				<p className="text-center text-lg">There are no tasks yet</p>
				{isUserHR && (
					<Link
						href="tasks/create"
						className="block mt-3"
					>
						<Button>Create new Task</Button>
					</Link>
				)}
			</div>
		);
	return (
		<div className="container mx-auto px-4 w-[50%]">
			{typeof decodedToken !== 'boolean' && decodedToken.roles.includes('admin') && (
				<Link href="tasks/create">
					<Button>Create new Task</Button>
				</Link>
			)}

			{tasks?.map((task: Task) => (
				<TaskCard
					task={task}
					key={task.id}
					userCanEdit={userCanEdit}
				/>
			))}
		</div>
	);
};

export default TasksPage;

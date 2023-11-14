import Button from '@/components/Button/Button';
import TaskCard from '@/components/Tasks/TaskCard';
import { Task } from '@/types/task';
import Link from 'next/link';
import { getDecodedTokenAndValidate, checkIfHR } from '@/utils/utils';
import { JwtPayload } from '@/types/jwtPayload';

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
		.then((data) => data.sort((a: Task, b: Task) => a.id - b.id))
		.catch((error) => console.error('Error:', error));

	const userTask = await fetch('http://localhost:5000/user-task', {
		cache: 'no-cache',
	})
		.then((response) => response.json())
		.catch((error) => console.error('Error:', error));
	const token = await getDecodedTokenAndValidate();

	const tasksWithStatus = tasks?.map((task: Task) => {
		const matchingUserTask = userTask.find((ut: any) => {
			if (typeof token === 'object' && token !== null && 'userId' in token) {
				return ut.taskId === task.id && ut.userId === (token as JwtPayload).userId;
			}
			return false;
		});
		return {
			...task,
			status: matchingUserTask ? matchingUserTask.status : 'Start Task',
			comment: matchingUserTask ? matchingUserTask.comment : '',
		};
	});

	const waitingApprovalTasks = userTask?.filter((task: Task) => task.status === 'Waiting Approval');

	if (!tasks || tasks.length === 0)
		return (
			<div className="w-[50%] mx-auto text-center">
				<p className="text-center text-lg">There are no tasks yet</p>
				{isUserHR && (
					<Link
						href="tasks/create"
						className="block mt-3 mb-3"
					>
						<Button>Create new Task</Button>
					</Link>
				)}
			</div>
		);

	return (
		<div className="container mx-auto px-4 w-[50%]">
			<div className="flex">
				{typeof token !== 'boolean' && token.roles.includes('admin') && (
					<Link href="tasks/create">
						<Button
							buttonProps={{
								className: 'mb-3',
							}}
						>
							Create new Task
						</Button>
					</Link>
				)}
				{isUserHR && waitingApprovalTasks.length > 0 && (
					<Link
						href="/tasks/approve"
						className="ml-auto"
					>
						<Button>Approve Tasks</Button>
					</Link>
				)}
			</div>

			{tasksWithStatus?.map((task: Task) => (
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

import TaskCard from '@/components/Tasks/TaskCard';
import { JwtPayload } from '@/types/jwtPayload';
import { Task } from '@/types/task';
import { checkIfHR, getDecodedTokenAndValidate, getToken } from '@/utils/utils';
import { redirect } from 'next/navigation';

const Page = async () => {
	await getDecodedTokenAndValidate();
	const isUserHr = await checkIfHR();
	if (!isUserHr) return redirect('/tasks');
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

	const usersTasks = await fetch('http://localhost:5000/user-task', {
		cache: 'no-cache',
	})
		.then((response) => response.json())
		.then((data) => data.filter((task: Task) => task.status === 'Waiting Approval'))
		.then((data) => data.sort((a: Task, b: Task) => a.id - b.id))
		.catch((error) => console.error('Error:', error));

	const combinedTasks = tasks
		?.filter((task: Task) => {
			const matchingUserTasks = usersTasks.filter((ut: any) => ut.taskId === task.id);
			return matchingUserTasks.length > 0 ? true : false;
		})
		.map((task: Task) => {
			const matchingUserTasks = usersTasks.filter((ut: any) => ut.taskId === task.id);
			return matchingUserTasks.length > 0 ? { ...task, ...matchingUserTasks[0] } : task;
		});

	return (
		<div className="container mx-auto px-4 w-[50%]">
			<div className="flex">
				<div className="w-full">
					<h1 className="text-2xl font-bold">Tasks Submissions</h1>
					<div className="mt-4">
						{combinedTasks &&
							combinedTasks?.map((task: Task) => (
								<div key={task.id}>
									<TaskCard
										task={task}
										toBeApproved
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;

import TaskCard from '@/components/Tasks/TaskCard';
import { JwtPayload } from '@/types/jwtPayload';
import { Task } from '@/types/task';
import { checkIfHR, getDecodedTokenAndValidate } from '@/utils/utils';

const Page = async () => {
	await getDecodedTokenAndValidate();
	let userCanEdit = false;

	const isUserHR = await checkIfHR();
	if (isUserHR) userCanEdit = true;

	const tasks = await fetch('http://localhost:5000/user-task', {
		cache: 'no-cache',
	})
		.then((response) => response.json())
		.then((data) => data.filter((task: Task) => !task.isDeleted))
		.then((data) => data.sort((a: Task, b: Task) => a.id - b.id))
		.then((data) => data.filter((task: Task) => task.status === 'Waiting Approval'))
		.catch((error) => console.error('Error:', error));

	return (
		<div className="container mx-auto px-4 w-[50%]">
			<div className="flex">
				<div className="w-full">
					<h1 className="text-2xl font-bold">Tasks</h1>
					<div className="mt-4">
						{tasks?.map((task: Task) => (
							<div key={task.id}>
								<TaskCard task={task} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;

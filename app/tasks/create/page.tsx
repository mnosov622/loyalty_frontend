import NewTaskForm from '@/components/Tasks/NewTaskForm';
import { getDecodedTokenAndValidate } from '@/utils/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
const CreateTaskPage = async () => {
	const decodedToken = await getDecodedTokenAndValidate();
	if (
		(typeof decodedToken !== 'boolean' && !decodedToken?.roles.includes('admin')) ||
		!decodedToken
	) {
		return redirect('/tasks');
	}
	return (
		<>
			<Link
				href="/tasks"
				className="text-purple-500"
			>
				&larr; View All Tasks
			</Link>
			<div className="flex items-center justify-center">
				<NewTaskForm />
			</div>
		</>
	);
};

export default CreateTaskPage;

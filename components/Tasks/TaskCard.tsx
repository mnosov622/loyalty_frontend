'use client';

import { Task } from '@/types/task';
import { useState } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
	task: Task;
	editable?: boolean;
	userCanEdit?: boolean;
}

const TaskCard = ({ task, editable = false, userCanEdit = false }: TaskCardProps) => {
	const [title, setTitle] = useState<string>(task.title);
	const [description, setDescription] = useState<string>(task.description);
	const [image, setImage] = useState<File | null>(null);
	const [dueDate, setDueDate] = useState<string>(String(task.dueDate).slice(0, 10));

	const [taskButtonText, setTaskButtonText] = useState<string>('');

	const router = useRouter();

	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this task?')) {
			try {
				await fetch(`http://localhost:5000/tasks/${id}`, {
					method: 'DELETE',
				}).then((response) => {
					console.log('response', response);
					if (response.status === 200) {
						router.refresh();
						router.push('/tasks');
					}
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleEdit = async () => {
		await fetch(`http://localhost:5000/tasks/${task.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, description, dueDate }),
		}).then((response) => {
			console.log('response', response);
			if (response.status === 201) {
				router.refresh();
				router.push('/tasks');
			}
		});
	};

	const handleStartTask = (task: Task) => {
		const body = {
			taskId: task.id,
		};
		setTaskButtonText('Started');
	};

	return (
		<div
			key={task.id}
			className="bg-white shadow-lg rounded-lg p-6 mb-6 flex"
		>
			<div className="flex flex-col">
				{task.imagePath && (
					<div className="w-64 h-auto">
						<img
							className="rounded-md"
							src={`${process.env.NEXT_PUBLIC_BACKEND_API}/${task.imagePath}`}
							alt={task.title}
						/>
					</div>
				)}

				{/* {editable && (
					<Input
						inputProps={{
							type: 'file',
						}}
						onChange={handleImageChange}
					/>
				)} */}
			</div>

			<div className="flex flex-col justify-between flex-grow ml-4">
				<div className="flex items-center justify-between">
					{editable ? (
						<Input
							inputProps={{
								value: title,
								style: { width: '80%' },
							}}
							onChange={(e) => setTitle(e.target.value)}
						/>
					) : (
						<Link
							href={`/tasks/${task.id}`}
							className="hover:text-purple-500"
						>
							<h2 className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition duration-100">
								{task.title}
							</h2>
						</Link>
					)}
				</div>
				{editable ? (
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="appearance-none rounded relative block w-[80%] mt-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						rows={5}
					/>
				) : (
					<Link href={`/tasks/${task.id}`}>
						<p className="mt-4 text-gray-600 line-clamp-3 hover:text-blue-500 transition duration-100">
							{task.description}
						</p>
					</Link>
				)}
				{editable ? (
					<Input
						inputProps={{
							type: 'date',
							defaultValue: String(task.dueDate).slice(0, 10),
							style: { width: '20%', margin: '1rem 0 ' },
						}}
						onChange={(e) => setDueDate(e.target.value)}
					/>
				) : (
					<p className="mt-2 text-gray-500">Due: {String(task.dueDate).slice(0, 10)}</p>
				)}
				<div className="flex items-center justify-between">
					{!editable && (
						<Button
							buttonProps={{
								className: 'mt-4',
							}}
							onClick={() => handleStartTask(task)}
						>
							{' '}
							Start Task
						</Button>
					)}

					{editable && <Button onClick={handleEdit}>Save </Button>}
					{!editable && userCanEdit && (
						<Link href={`/tasks/edit/${task.id}`}>
							<Button
								buttonProps={{
									className: 'mt-4',
								}}
							>
								{' '}
								Edit ✏️
							</Button>
						</Link>
					)}
					{userCanEdit && (
						<Button
							onClick={() => handleDelete(task.id)}
							buttonProps={{
								className: 'bg-red-500 hover:bg-red-700 mt-4',
							}}
						>
							Delete
						</Button>
					)}
					{!editable && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="red"
							className="mt-4 cursor-pointer"
						>
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
						</svg>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskCard;

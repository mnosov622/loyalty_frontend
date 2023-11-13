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
			body: JSON.stringify({ title, description }),
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
			className="bg-white shadow-lg rounded-lg p-6 mb-6"
		>
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
					<h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
				)}
				{task.imagePath && (
					<img
						className="w-12 h-12 rounded-full"
						src={`${process.env.NEXT_PUBLIC_BACKEND_API}/${task.imagePath}`}
						alt={task.title}
					/>
				)}
			</div>
			{editable ? (
				<Input
					inputProps={{
						value: description,
						style: { marginTop: '20px', width: '80%' },
					}}
					onChange={(e) => setDescription(e.target.value)}
				/>
			) : (
				<p className="mt-4 text-gray-600">{task.description}</p>
			)}
			<p className="mt-2 text-gray-500">Due: {String(task.dueDate).slice(0, 10)}</p>
			<div className="flex justify-between">
				{userCanEdit && (
					<Button
						onClick={() => handleDelete(task.id)}
						buttonProps={{
							className: 'bg-red-500 hover:bg-red-700',
						}}
					>
						Delete
					</Button>
				)}

				{editable && <Button onClick={handleEdit}>Save </Button>}
				{!editable && userCanEdit && (
					<Link href={`/tasks/edit/${task.id}`}>
						<Button> Edit ✏️</Button>
					</Link>
				)}
				<Button
					buttonProps={{
						className: 'mt-3',
					}}
					onClick={() => handleStartTask(task)}
				>
					{' '}
					Start Task
				</Button>
			</div>
		</div>
	);
};

export default TaskCard;

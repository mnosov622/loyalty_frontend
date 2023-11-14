'use client';

import { Task } from '@/types/task';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_providers/AppProvider';

interface TaskCardProps {
	task: Task;
	editable?: boolean;
	userCanEdit?: boolean;
	toBeApproved?: boolean;
}

const TaskCard = ({
	task,
	editable = false,
	userCanEdit = false,
	toBeApproved = false,
}: TaskCardProps) => {
	const [title, setTitle] = useState<string>(task.title);
	const [description, setDescription] = useState<string>(task.description);
	const [image, setImage] = useState<File | null>(null);
	const [dueDate, setDueDate] = useState<string>(String(task.dueDate).slice(0, 10));
	const [link, setLink] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [showNotes, setShowNotes] = useState<boolean>(false);
	const [notes, setNotes] = useState<string>('');

	const [taskButtonText, setTaskButtonText] = useState<string>(
		(task.status === 'In Progress' ? 'Complete Task' : task.status) || 'Start Task'
	);

	const router = useRouter();
	const userData = useAuth();

	const handleDelete = (id: number) => {
		if (window.confirm('Are you sure you want to delete this task?')) {
			try {
				fetch(`http://localhost:5000/tasks/${id}`, {
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

	const handleTaskAction = (task: Task, action?: string) => {
		setShowNotes(false);
		setError('');
		console.log('task', task);
		if (task.status === 'Start Task') {
			const startDate = new Date().toISOString().slice(0, 10);
			const body = {
				taskId: task.id,
				userId: userData?.userId,
				userEmail: userData?.email,
				userName: userData?.firstName + ' ' + userData?.lastName,
				status: 'In Progress',
				authorId: task.userId,
				endDate: task.dueDate.slice(0, 10),
				startDate,
			};

			try {
				fetch(`http://localhost:5000/user-task`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}).then((response) => {
					console.log('response', response);
					if (response.status === 201) {
						setTaskButtonText('Complete Task');
						router.refresh();
					}
				});
			} catch (e) {
				console.log(e);
			}
		}

		if (task.status === 'In Progress') {
			if (!link.trim()) return setError('Please enter a link');

			const endDate = new Date().toISOString().slice(0, 10);
			const body = {
				status: 'Waiting Approval',
				endDate,
				link,
				taskId: task.id,
				userId: userData?.userId,
			};

			try {
				fetch(`http://localhost:5000/user-task/complete`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}).then((response) => {
					console.log('response', response);
					if (response.status === 201) {
						setTaskButtonText('Waiting Approval');
						router.refresh();
					}
				});
			} catch (e) {
				console.log(e);
			}
		}

		if (task.status === 'Waiting Approval' && action === 'Approve') {
			const body = {
				status: 'Approved',
				taskId: task.taskId,
				userId: task.userId,
			};

			try {
				fetch(`http://localhost:5000/user-task/approve`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}).then((response) => {
					console.log('response', response);
					if (response.status === 201) {
						setTaskButtonText('Approved');
						router.refresh();
					}
				});
			} catch (e) {
				console.log(e);
			}
		}

		if (task.status === 'Waiting Approval' && action === 'Reject') {
			const body = {
				status: 'Rejected',
				taskId: task.taskId,
				userId: task?.userId,
				comment: notes,
			};
			setShowNotes(true);

			if (!notes.trim()) return setError('Please enter a reason for rejection');

			try {
				fetch(`http://localhost:5000/user-task/reject`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}).then((response) => {
					console.log('response', response);
					if (response.status === 201) {
						router.refresh();
					}
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	function renderButton(task: Task, toBeApproved: boolean) {
		if (
			!editable &&
			task.status !== 'Waiting Approval' &&
			task.status !== 'Rejected' &&
			task.status !== 'Approved' &&
			!toBeApproved
		) {
			return (
				<Button
					buttonProps={{
						className: `mt-4 mr-2 ${
							taskButtonText === 'Waiting Approval' && 'disabled:opacity-50'
						}`,
					}}
					onClick={() => handleTaskAction(task)}
				>
					{taskButtonText}
				</Button>
			);
		}
		return null;
	}

	console.log('task', task.status);
	return (
		<div
			key={task.id}
			className="bg-white shadow-lg rounded-lg p-6 mb-6 flex relative"
		>
			{task.status && task.status !== 'Start Task' && (
				<div
					className={`bg-blue-200 text-dark-700 p-1 text-sm rounded-md mb-4 absolute top-0 right-0 ${
						task.status === 'Approved'
							? 'bg-green-300'
							: task.status === 'Rejected'
							? 'bg-red-300'
							: task.status === 'In Progress'
							? 'bg-blue-300'
							: task.status === 'Waiting Approval'
							? 'bg-yellow-300'
							: ''
					}`}
				>
					{task.status}
				</div>
			)}

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
					<p className="mt-2 text-gray-500">
						Due: {String(task.dueDate || task.endDate).slice(0, 10)}
					</p>
				)}
				{task?.link && toBeApproved && (
					<p className="mt-2 mb-0">
						Link:
						<Link
							href={`${task.link}`}
							target="_blank"
							className="hover:text-blue-500 transition duration-100 text-blue-800"
						>
							{task.link}
						</Link>
					</p>
				)}

				{task.userName && task.userEmail && toBeApproved && (
					<>
						<p className="mt-2 mb-0">Submitted by: {task.userName}</p>
						<p>Email: {task.userEmail}</p>
					</>
				)}

				<div className="flex items-center justify-between">
					{renderButton(task, toBeApproved)}

					{editable && <Button onClick={handleEdit}>Save </Button>}
					{!editable && userCanEdit && (
						<Link href={`/tasks/edit/${task.id}`}>
							<Button
								buttonProps={{
									className: 'mt-4 mr-2',
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

					{task.comment && (
						<div className="mt-4">
							<label
								htmlFor="notes"
								className="block text-sm font-medium text-gray-700"
							>
								Reject Reason
							</label>
							<p>{task.comment}</p>
						</div>
					)}

					{!editable && !toBeApproved && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="red"
							className="mt-4 cursor-pointer ml-auto"
						>
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
						</svg>
					)}
				</div>
				{task.status === 'In Progress' && (
					<div className="mt-4 w-full">
						<label
							htmlFor="link"
							className="block text-sm font-medium text-gray-700"
						>
							Upload Link
						</label>
						<Input
							inputProps={{
								type: 'link',
								name: 'link',
								id: 'link',
								placeholder: 'Enter link here',
							}}
							onChange={(e) => setLink(e.target.value)}
						/>
						{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					</div>
				)}

				{toBeApproved && (
					<div className="flex items-center">
						<Button
							buttonProps={{
								className: '!bg-green-700 hover:!bg-green-900 mt-4 mr-2',
							}}
							onClick={() => handleTaskAction(task, 'Approve')}
						>
							Approve
						</Button>
						<Button
							buttonProps={{
								className: 'bg-red-500 hover:bg-red-700 mt-4',
							}}
							onClick={() => handleTaskAction(task, 'Reject')}
						>
							Reject
						</Button>
					</div>
				)}
				{showNotes && (
					<div className="mt-4">
						<label
							htmlFor="notes"
							className="block text-sm font-medium text-gray-700"
						>
							Reject Reason
						</label>
						<Input
							inputProps={{
								value: notes,
								className: '',
							}}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskCard;

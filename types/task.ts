export type Task = {
	id: number;
	taskId: number;
	userId: number;
	title: string;
	userName: string;
	userEmail: string;
	description: string;
	imagePath: string;
	dueDate: string;
	endDate: string;
	link?: string;
	isDeleted: boolean;
	status: string;
	comment: string;
};

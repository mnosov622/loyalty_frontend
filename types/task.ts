export type Task = {
	id: number;
	userId: number;
	title: string;
	description: string;
	imagePath: string;
	dueDate: string;
	isDeleted: boolean;
	status: string;
};

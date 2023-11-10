import Button from "@/components/Button/Button";
import { Task } from "@/types/task";
import Link from "next/link";

const TasksPage = async () => {
  const tasks = await fetch("http://localhost:5000/tasks", {})
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  if (!tasks || tasks.length === 0)
    return (
      <div className="w-[50%] mx-auto text-center">
        <p className="text-center text-lg">There are no tasks yet</p>
        <Link href="tasks/create" className="block mt-3">
          <Button>Create new Task</Button>
        </Link>
      </div>
    );
  return (
    <div className="container mx-auto px-4 w-[50%]">
      <Link href="tasks/create">
        <Button>Create new Task</Button>
      </Link>
      {tasks?.map((task: Task) => (
        <div key={task.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            {task.imagePath && (
              <img
                className="w-24 h-24 object-cover"
                src={`http://localhost:5000/${task.imagePath}`}
                alt={task.title}
              />
            )}
          </div>
          <p className="mt-4 text-gray-600">{task.description}</p>
          <p className="mt-2 text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksPage;

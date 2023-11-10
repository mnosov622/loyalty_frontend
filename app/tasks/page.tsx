import Button from "@/components/Button/Button";
import { Task } from "@/types/task";
import Link from "next/link";

const TasksPage = async () => {
  const tasks = await fetch("http://localhost:5000/tasks")
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return (
    <div className="container mx-auto px-4 w-[50%]">
      {tasks?.map((task: Task) => (
        <div key={task.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <p className="font-bold text-xl mb-2">{task.title}</p>
          <p className="text-gray-700">{task.description}</p>
        </div>
      ))}
      <Link href="tasks/create">
        <Button>Create new Task</Button>
      </Link>
    </div>
  );
};

export default TasksPage;

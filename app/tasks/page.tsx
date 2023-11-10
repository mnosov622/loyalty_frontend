import Button from "@/components/Button/Button";
import TaskCard from "@/components/Tasks/TaskCard";
import { Task } from "@/types/task";
import Link from "next/link";

const TasksPage = async () => {
  const tasks = await fetch("http://localhost:5000/tasks", {})
    .then((response) => response.json())
    .then((data) => data.filter((task: Task) => !task.isDeleted))
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
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TasksPage;
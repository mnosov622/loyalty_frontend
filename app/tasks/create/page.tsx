import NewTaskForm from "@/components/Tasks/NewTaskForm";
import Link from "next/link";
const CreateTaskPage = () => {
  return (
    <>
      <Link href="/tasks" className="text-purple-500">
        &larr; View All Tasks
      </Link>
      <div className="flex items-center justify-center h-screen">
        <NewTaskForm />
      </div>
    </>
  );
};

export default CreateTaskPage;

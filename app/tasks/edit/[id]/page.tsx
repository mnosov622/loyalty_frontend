import TaskCard from "@/components/Tasks/TaskCard";
import Link from "next/link";

const Page = async ({ params }: any) => {
  const taskData = await fetch(`http://localhost:5000/tasks/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return (
    <div className="w-1/3 mx-auto">
      <Link href="/tasks" className="text-underline text-purple-800">
        &#8592; Go back
      </Link>
      <TaskCard task={taskData} key={taskData.id} editable />
    </div>
  );
};

export default Page;

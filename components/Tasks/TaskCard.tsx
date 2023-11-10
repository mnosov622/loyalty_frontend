"use client";
import { Task } from "@/types/task";
import React from "react";
import Button from "../Button/Button";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        mutate("/tasks");
      }
    });
  };

  return (
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
      <p className="mt-2 text-gray-500">Due: {String(task.dueDate).slice(0, 10)}</p>
      <Button onClick={() => handleDelete(task.id)}>Delete</Button>
    </div>
  );
};

export default TaskCard;

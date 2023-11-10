"use client";

import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

const NewTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        alert("Task is created!");
      }
    });

    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-1/2 bg-white rounded shadow-md">
      <label className="block mb-2">
        Title:
        <Input
          inputProps={{
            type: "text",
            value: title,
            required: true,
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </label>
      <label className="block mb-2">
        Image:
        <Input
          inputProps={{
            type: "file",
          }}
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
      </label>
      <Button>Create Task</Button>
    </form>
  );
};

export default NewTaskForm;

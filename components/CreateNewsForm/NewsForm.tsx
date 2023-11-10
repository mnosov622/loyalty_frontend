"use client";
import React, { FormEvent, useRef, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useRouter } from "next/navigation";

const NewsForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    setIsSubmitting(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image as any);

    try {
      fetch("http://localhost:5000/news", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 201) {
            alert("News created successfully");
            router.push("/");
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex mt-2 justify-center">
      <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl w-1/3">
        <label className="block mb-2">
          Title:
          <Input
            inputProps={{
              name: "title",
              required: true,
            }}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        {/* <label className="block mb-2">
          Image:
          <Input
            inputProps={{
              type: "file",
              name: "image",
              required: true,
            }}
            onChange={(event) => setImage(event.target.files ? event.target.files[0] : null)}
          />
        </label> */}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewsForm;

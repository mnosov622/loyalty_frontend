import React, { FormEvent, useRef } from "react";
import { NextPage } from "next";
import Button from "@/components/Button/Button";
import NewsForm from "@/components/CreateNewsForm/NewsForm";
import Link from "next/link";

const CreateNewsPage: NextPage = () => {
  return (
    <>
      <Link href="/" className="text-underline text-purple-800">
        {" "}
        Go back
      </Link>
      <h1>Create News</h1>
      <NewsForm />
    </>
  );
};

export default CreateNewsPage;

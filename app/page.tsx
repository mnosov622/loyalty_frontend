import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-lg p-6 rounded bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to our Loyalty App
          </h2>
        </div>

        <Link href="/news/create" className="flex justify-center">
          <Button>Create News</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

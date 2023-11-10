"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import ProfileImage from "@/public/profile.png";
import Image from "next/image";
import { useAuth } from "@/app/_providers/AppProvider";
import Link from "next/link";

const Header = () => {
  const authData = useAuth();

  const { logout } = authData;

  return (
    <header className="flex items-center justify-between items-center p-6">
      <Link href="/" className="mr-5">
        <p className="text-bold">Home</p>
      </Link>

      <p className="text-black font-bold">Welcome back, {authData?.firstName}</p>
      <Button buttonProps={{ className: "ml-auto mr-5" }} onClick={logout}>
        Logout
      </Button>

      <Link href={`/profile/${authData?.userId}`}>
        <Image
          src={ProfileImage}
          width={50}
          height={20}
          alt="Profile"
          className="h-12 rounded-full"
        />
      </Link>
    </header>
  );
};

export default Header;

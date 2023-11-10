"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Link from "next/link";
import CircleLoader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import Input from "../Input/Input";
import { useAuth } from "@/app/_providers/AppProvider";
import { disconnect } from "process";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const authData = useAuth();

  const { login } = authData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);

    e.preventDefault();

    const body = {
      email,
      password,
      rememberMe,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.statusCode === 401) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    if (data.statusCode === 404) {
      setError("User not found");
      setLoading(false);
      return;
    }

    if (data.statusCode === 400) {
      setError("Bad request");
      setLoading(false);
      return;
    }

    if (data.statusCode === 200) {
      console.log("data", data);
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; expires=${new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 30
      ).toUTCString()}`;
      router.push("/");
      setLoading(false);
      login();
      return;
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className=" -space-y-px">
        <div className="mb-5">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <Input
            inputProps={{
              id: "email-address",
              name: "email",
              type: "email",
              autoComplete: "email",
              placeholder: "Email address",
              required: true,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            inputProps={{
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "current-password",
              required: true,
              placeholder: "Password",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link href="reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <Button
          buttonProps={{
            className: `group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-
                    2 focus:ring-offset-2 focus:ring-indigo-500`,
          }}
        >
          {loading ? <CircleLoader /> : "Sign in"}
        </Button>
      </div>

      <div className="mt-6">
        <p className="text-center">
          Don&apos;t have an account?
          <Link className="font-medium text-indigo-600 hover:text-indigo-500" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};
export default LoginForm;

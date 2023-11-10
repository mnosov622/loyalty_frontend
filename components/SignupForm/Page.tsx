import { FormEvent, useState } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import Input from "../Input/Input";
import CircleLoader from "../Loader/Loader";
import Link from "next/link";
import bcrypt from "bcrypt";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setError("");
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const userRoles = ["user"];
      const username = email.split("@")[0];
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          roles: userRoles,
          username,
        }),
      });
      const data = await res.json();

      if (data.status === 409) {
        setError("User already exists");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md space-y-4">
        <div>
          <label htmlFor="firstname" className="sr-only">
            First Name
          </label>
          <Input
            onChange={(e) => setFirstname(e.target.value)}
            inputProps={{
              id: "firstname",
              name: "firstname",
              type: "text",
              required: true,
              placeholder: "First Name",
            }}
          />
        </div>
        <div>
          <label htmlFor="lastname" className="sr-only">
            Last Name
          </label>
          <Input
            onChange={(e) => setLastname(e.target.value)}
            inputProps={{
              id: "lastname",
              name: "lastname",
              type: "text",
              required: true,
              placeholder: "Last Name",
            }}
          />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              id: "email-address",
              name: "email",
              type: "email",
              autoComplete: "email",
              required: true,
              placeholder: "Email address",
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "current-password",
              placeholder: "Password",
            }}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            inputProps={{
              id: "confirm-password",
              name: "confirm-password",
              type: "password",
              autoComplete: "current-password",
              required: true,
              placeholder: "Confirm Password",
            }}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center justify-between">
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot your password?
        </a>
      </div>
      <div>
        <Button
          buttonProps={{
            type: "submit",
            disabled: loading,
            className: "w-full",
          }}
        >
          {loading ? <CircleLoader /> : "Sign up"}
        </Button>
      </div>
    </form>
  );
};

export default Page;

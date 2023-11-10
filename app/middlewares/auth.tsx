import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
export function handler({ req }) {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  const token = cookieStore.get("token")?.value;

  console.log("token", token);

  if (!token) {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  return NextResponse.next();
}

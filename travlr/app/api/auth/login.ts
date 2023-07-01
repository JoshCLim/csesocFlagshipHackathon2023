import { signIn, useSession } from "next-auth/react";

// const BACKEND_URL = process.env.BACKEND_URL;

// import { cookies } from "next/headers";

const login = async ({ email, password }: { email: string; password: string }) => {
  const signInResponse = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return signInResponse;
  // const res = await fetch(`${BACKEND_URL}/auth/login`, {
  //   method: "POST",
  //   body: JSON.stringify({ email, password }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const user = await res.json();

  // return user[0];
};

export default login;

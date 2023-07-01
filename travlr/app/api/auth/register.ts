import { signIn } from "next-auth/react";
import backend from "../backend";

const register = async ({
  name,
  bio,
  email,
  password,
}: {
  name: string;
  bio: string;
  email: string;
  password: string;
}) => {
  // TODO: register

  await backend({
    route: "/login",
    method: "POST",
    body: JSON.stringify({
      name,
      about: bio,
      email,
      password,
      invalidate_tokens_before: Date.now(),
    }),
  });

  await signIn("credentials", { email, password, redirect: false });
  return { name, email, bio };
};

export default register;

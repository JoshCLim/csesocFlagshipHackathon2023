import { signIn } from "next-auth/react";

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

  await signIn("credentials", { email, password, redirect: false });
  return { name, email, bio };
};

export default register;

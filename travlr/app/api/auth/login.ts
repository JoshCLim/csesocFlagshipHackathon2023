import { signIn, useSession } from "next-auth/react";

const login = async ({ email, password }: { email: string; password: string }) => {
  const signInResponse = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return signInResponse;
};

export default login;

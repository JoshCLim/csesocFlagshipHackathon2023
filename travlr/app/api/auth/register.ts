import { signIn } from "next-auth/react";
import backend from "../backend";
import login from "./login";

const register = async ({
  name,
  bio,
  email,
  password,
  photoUrl,
}: {
  name: string;
  bio: string;
  email: string;
  password: string;
  photoUrl: string;
}) => {
  const res = await backend({
    route: "/auth/register",
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      photo_id: photoUrl,
      bio,
      last_location: null,
    }),
  });

  console.log(res);
  if (!res || !res.ok) return { message: "Error registering", ok: false };

  const loginRes = await login({ email, password });
  if (!loginRes || !loginRes.ok) return { message: "Error logging in", ok: false };

  return { message: "Welcome!", ok: true };
};

export default register;

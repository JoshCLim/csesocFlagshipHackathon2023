import { getServerSession } from "next-auth";
import backend from "../backend";

interface User {
  bio: string;
  email: string;
  id: string;
  last_location: { x: number; y: number };
  name: string;
  photo_id: string;
}

const getUser = async (id: string) => {
  //   const id = (await getServerSession())?.user.email;
  const res = await backend({ route: `/users/${id}`, method: "GET" });
  return (await res?.json()) as User;
};

export default getUser;

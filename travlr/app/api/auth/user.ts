import { getServerSession } from "next-auth";
import backend from "../backend";

const getUser = async (id: string) => {
  //   const id = (await getServerSession())?.user.email;
  const res = await backend({ route: `/users/${id}`, method: "GET" });
  return await res?.json();
};

export default getUser;

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "../api/api";

interface User {
  bio: string;
  email: string;
  id: string;
  last_location: { x: number; y: number };
  name: string;
  photo_id: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const getUserData = async () => {
      if (!session) {
        console.log("ahhh");
        setUser(null);
        return;
      }
      const user = await api.auth.getUser(session.user.email);
      setUser(user);
    };
    getUserData();
  }, [session]);

  return user;
};

export default useUser;

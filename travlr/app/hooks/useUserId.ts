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

const useUserId = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      const user = await api.auth.getUser(id);
      setUser(user);
    };
    getUserData();
  }, [id]);

  return user;
};

export default useUserId;

"use client";

import { useEffect, useState } from "react";
import backend from "../api/backend";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "../components/navbar";
import Link from "next/link";

interface Photo {
  adventure: number;
  cozy: number;
  culture: number;
  disabled_accessibility: number;
  exercise: number;
  family: number;
  food: number;
  id: "5b7e0c61-c715-493e-8076-1f270d6b4cf2";
  nature: number;
  near_cbd: number;
  tourist_hotspot: number;
  url: "http://example.com/photo0.jpg";
  user_id: "81e3d2e1-6710-452c-9b16-845fc5a4b987";
  wildlife: number;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const session = useSession();
  const router = useRouter();
  console.log(session);

  if (session.status === "unauthenticated") router.push("/auth/login");
  // if (session.status === "loading") return <p>Loading...</p>;

  useEffect(() => {
    if (!session.data?.user.email) return;
    const getPhotos = async () => {
      const res = await backend({
        route: `/photos/user/${session.data?.user.email}`,
        method: "GET",
      });
      console.log(res);
      const photosData = (await res?.json()) as Photo[];
      return photosData.reverse();
    };
    getPhotos().then((res) => setPhotos(res));
  }, [session]);

  const deletePhoto = async (id: string) => {
    await backend({
      route: `/photos/${id}`,
      method: "DELETE",
    });
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <>
      <NavBar />
      <main className="w-full flex flex-col justify-center items-center gap-10">
        <h1
          className="text-6xl w-full px-24 pb-24 pt-32 text-center"
          style={{ backgroundImage: "url(/landscape.jpg)", backgroundSize: "cover" }}
        >
          Gallery
        </h1>
        <Link
          href="/upload"
          className="bg-[#b2d0fe] hover:bg-[#95bffe] px-4 py-3 rounded-xl transition-all"
        >
          Upload more photos.
        </Link>
        <div className="flex flex-row flex-wrap gap-8 justify-center p-5">
          {photos.map(({ id, url }) => (
            <img
              key={url}
              src={url}
              className="w-3/12 rounded-xl shadow-xl hover:scale-105 transition-all"
              onClick={() => deletePhoto(id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import backend from "../api/backend";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "../components/navbar";
import Link from "next/link";
import { Photo } from "../gallery/page";

export default function Explore() {
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
        route: `/photos`,
        method: "GET",
      });
      if (!res || !res.ok) return [];
      const photosData = (await res?.json()) as Photo[];
      return photosData.reverse().filter((photo) => photo.user_id !== session.data?.user.email);
    };
    getPhotos().then((res) => setPhotos(res));
  }, [session]);

  return (
    <>
      <NavBar />
      <main className="w-full flex flex-col justify-center items-center gap-10">
        <h1
          className="text-6xl w-full px-24 pb-24 pt-32 text-center"
          style={{ backgroundImage: "url(/landscape.jpg)", backgroundSize: "cover" }}
        >
          Explore
        </h1>
        {/* <Link
          href="/upload"
          className="bg-[#b2d0fe] hover:bg-[#95bffe] px-4 py-3 rounded-xl transition-all"
        >
          Upload more photos.
        </Link> */}
        <div className="flex flex-row flex-wrap gap-8 justify-center p-5">
          {photos.map(({ id, url }) => (
            <img
              key={url}
              src={url}
              className="w-3/12 rounded-xl shadow-xl hover:scale-105 transition-all object-cover"
            />
          ))}
        </div>
      </main>
    </>
  );
}

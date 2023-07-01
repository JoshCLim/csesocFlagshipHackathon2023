"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "../utils/uploadthing";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import NavBar from "../components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import backend from "../api/backend";

export default function Settings() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") router.push("/auth/login");

  const [lastImageUploaded, setLastImageUploaded] = useState<string | null>(null);
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center gap-10">
        <Toaster />
        <h1
          className="text-6xl w-full px-24 pb-24 pt-32 text-center"
          style={{ backgroundImage: "url(/landscape.jpg)", backgroundSize: "cover" }}
        >
          Add your own photos! 📸
        </h1>
        <UploadButton
          endpoint="userPhotos"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            if (!res) return;
            res.forEach(async (file) => {
              await backend({
                route: "/photos",
                method: "POST",
                body: JSON.stringify({
                  user_id: session?.data?.user.email,
                  url: file.fileUrl,
                }),
              });
            });
            setLastImageUploaded(res[0].fileUrl);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
        {!!lastImageUploaded && (
          <div className="flex flex-col gap-5">
            <p className="italic">Last Image Uploaded</p>
            <img src={lastImageUploaded} style={{ maxWidth: "800px", maxHeight: "500px" }} />
          </div>
        )}
        <hr className="w-[80%] my-5" />
        <p className="">
          Alternatively, choose your preferences manually{" "}
          <Link className="text-[#30a2d3] underline" href="/preferences">
            here
          </Link>
          .
        </p>
      </main>
    </>
  );
}

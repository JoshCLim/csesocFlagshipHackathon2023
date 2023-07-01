"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "../utils/uploadthing";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Toaster />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

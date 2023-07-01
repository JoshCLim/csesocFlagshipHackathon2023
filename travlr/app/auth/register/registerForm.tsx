"use client";

import "@uploadthing/react/styles.css";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";
import { Toaster, toast } from "react-hot-toast";
import { UploadButton } from "../../utils/uploadthing";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.table({ name, bio, email, password, photoUrl });

    if (!photoUrl) {
      toast.error("Please upload a profile picture.");
      return;
    }

    const registerResponse = await api.auth.register({ name, bio, email, password, photoUrl });
    if (registerResponse.ok) {
      toast.success(registerResponse.message);
    } else {
      toast.error(registerResponse.message);
      return;
    }

    // if login successful redirect to home page
    router.push("/");
  };
  return (
    <form className="flex flex-col gap-7 md:min-w-[500px]" onSubmit={submitHandler}>
      <Toaster />
      <h1 className="text-5xl font-bold">Begin your journey with us.</h1>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <label className="">Name</label>
        <input
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full focus:border-[#000] transition-all"
          type="text"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          value={name}
          formNoValidate
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <label className="">Bio</label>
        <textarea
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full focus:border-[#000] transition-all"
          placeholder="Tell us about yourself..."
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <label className="">Email</label>
        <input
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full focus:border-[#000] transition-all"
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          formNoValidate
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <label className="">Password</label>
        <input
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full focus:border-[#000] transition-all"
          type="password"
          placeholder="* * * * * *"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          formNoValidate
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <label className="">Profile Photo</label>
        <div className="flex flex-row gap-10">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              if (!res) {
                toast.error("Upload Failed");
                return;
              }
              setPhotoUrl(res[0].fileUrl);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          {!!photoUrl && (
            <a href={photoUrl} className="hover:underline transition-all max-w-[400px] break-all">
              {photoUrl}
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <input
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full hover:border-[#000] transition-all cursor-pointer active:scale-95"
          type="submit"
          value="Register"
          formNoValidate
        />
      </div>
      <p>
        Already have an account?{" "}
        <Link className="text-[#6fd1fe] underline" href={"/auth/login"}>
          Login
        </Link>{" "}
        instead.
      </p>
    </form>
  );
}

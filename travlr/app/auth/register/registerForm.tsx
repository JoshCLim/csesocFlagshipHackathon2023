"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/route";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.table({ email, password });

    const registerResponse = await api.auth.register({ name, bio, email, password });
    // if (!signInResponse) {
    //   toast.error("Sign in error.");
    //   return;
    // } else if (signInResponse.error) {
    //   toast.error(signInResponse.error);
    //   return;
    // }

    // // if login successful redirect to home page
    router.push("/");
  };
  return (
    <form className="flex flex-col gap-7 md:min-w-[500px]" onSubmit={submitHandler}>
      <h1 className="text-5xl font-bold">Begin your journey with us.</h1>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <label className="">Name</label>
        <input
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full focus:border-[#000] transition-all"
          type="text"
          placeholder="Dixon Cider"
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
        <input
          className="py-3 p-5 rounded-lg border-[1px] outline-none w-full hover:border-[#000] transition-all cursor-pointer active:scale-95"
          type="submit"
          value="Register"
          formNoValidate
        />
      </div>
    </form>
  );
}
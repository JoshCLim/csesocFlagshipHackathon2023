"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";
import { Toaster, toast } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.log({ email, password });

    const loginResponse = await api.auth.login({ email, password });

    if (!loginResponse) {
      toast.error("Sign in error.");
      return;
    } else if (loginResponse.error) {
      toast.error("Incorrect email or password.");
      console.log(loginResponse.error);
      return;
    }

    // if login successful redirect to home page
    router.push("/");
  };

  return (
    <form className="flex flex-col gap-7 md:min-w-[500px]" onSubmit={submitHandler}>
      <Toaster />
      <h1 className="text-5xl font-bold">Login</h1>
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
          value="Login"
          formNoValidate
        />
      </div>
    </form>
  );
}

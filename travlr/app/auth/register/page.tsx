import Link from "next/link";
import RegisterForm from "./registerForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession();
  console.log("alskdjnsald");
  console.log(session);
  // if (!!session) redirect("/");

  return (
    <main className="flex w-full h-screen flex-col items-center">
      <NavBar />
      <div className="flex flex-row w-full h-full">
        <div
          className="h-full w-6/12"
          style={{
            backgroundImage: "url(/sunset.jpg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-6/12 py-24 flex flex-col items-center justify-center">
          <div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}

const NavBar = () => {
  return (
    <nav className="w-full fixed z-50 flex py-5 px-8 flex-row justify-between ">
      <NavLink url="/" label="✈️" />
    </nav>
  );
};

const NavLink = ({ url, label }: { url: string; label: string }) => {
  return (
    <Link
      className="text-white text-xl py-3 px-6 border-[1px] border-transparent hover:border-white transition-all rounded-full active:scale-95"
      href={url}
    >
      {label}
    </Link>
  );
};

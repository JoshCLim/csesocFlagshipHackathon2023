import backend from "@/app/api/backend";
import NavBar from "@/app/components/navbar";

interface User {
  bio: string;
  email: string;
  id: string;
  last_location: { x: number; y: number };
  name: string;
  photo_id: string;
}

export default async function Profile({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await backend({
    route: `/users/${id}`,
    method: "GET",
  });
  if (!res || !res.ok)
    return (
      <>
        <NavBar />
        <main
          className="w-full h-screen px-24 pb-24 pt-32 flex justify-center items-center"
          style={{ backgroundImage: "url(/lake.jpg)", backgroundSize: "cover" }}
        >
          <div className="w-[30%] h-[600px] bg-white shadow-2xl rounded-2xl pt-10 px-24 pb-24 flex flex-col justify-center gap-10">
            <p className="text-center">User profile &quot;{id}&quot; does not exist.</p>
          </div>
        </main>
      </>
    );
  const user = (await res?.json()) as User;

  return (
    <>
      <NavBar />
      <main
        className="w-full h-screen px-24 pb-24 pt-32 flex justify-center items-center"
        style={{ backgroundImage: "url(/lake.jpg)", backgroundSize: "cover" }}
      >
        <div className="w-[30%] h-[600px] bg-white shadow-2xl rounded-2xl pt-10 px-24 pb-24 flex flex-col justify-center gap-10">
          <img src={user.photo_id} className="w-48 h-48 rounded-full text-center mx-auto" />
          <h1 className="text-6xl  text-center">{user.name}</h1>
          <p className="text-center">{user.bio}</p>
          <p className="text-center break-all">
            <span className="font-bold">Email:</span> {user.email}
          </p>
        </div>
      </main>
    </>
  );
}

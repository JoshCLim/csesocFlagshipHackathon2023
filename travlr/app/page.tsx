import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/navbar";
import { getServerSession } from "next-auth";

// const HERO_IMAGES = [
//   "/travel/1.jpg",
//   "/travel/2.jpeg",
//   "/travel/3.jpeg",
//   "/travel/4.jpeg",
//   "/travel/17.avif",
//   "/travel/18.avif",
//   "/travel/5.jpg",
//   "/travel/6.jpg",
//   "/travel/7.jpeg",
//   "/travel/8.jpg",
//   "/travel/9.jpg",
//   "/travel/10.webp",
//   "/travel/13.jpeg",
//   "/travel/14.jpg",
//   "/travel/15.jpg",
//   "/travel/19.jpeg",
// ];

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <section
        className="w-full h-screen py-36 flex flex-col justify-center items-center gap-8"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.3)), url(/mountain.svg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <div className="flex flex-wrap">
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
          <HeroTiles />
        </div> */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-[#0053989f] backdrop-blur-[1px] flex flex-col items-center justify-center">
          <h1 className="text-8xl text-[#eee] font-extrabold text-center uppercase">Travlr</h1>
        </div> */}
        <h1 className="text-8xl text-white font-extrabold text-center uppercase">
          Travlr
        </h1>
        <p className="text-2xl text-white font-light">
          <span className="text-[#8bbbff]">personalised</span> travel
          recommendations at your fingertips
        </p>
        {!session ? (
          <div>
            <Link href={"/auth/register"}>
              <button className="uppercase text-white font-semibold py-4 px-7 rounded-full bg-sky-400">
                Get started! <span className="ml-[5px]">✈️</span>
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href={"/upload"}>
              <button className="uppercase text-white font-semibold py-4 px-7 rounded-full bg-sky-400">
                Begin your next journey! <span className="ml-[5px]">✈️</span>
              </button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

// const HeroTiles = () => {
//   return (
//     <>
//       {shuffleArray(HERO_IMAGES).map((url) => (
//         <HeroImageTile url={url} key={url} />
//       ))}
//     </>
//   );
// };

// const HeroImageTile = ({ url }: { url: string }) => {
//   return (
//     <div className="w-[5%] relative aspect-square">
//       <Image src={url} alt={""} fill style={{ objectFit: "cover" }} priority />
//     </div>
//   );
// };

// function shuffleArray(array: any[]) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }

//   return array;
// }

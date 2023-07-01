"use client";

import NavBar from "../components/navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import backend from "../api/backend";
import useUser from "../hooks/useUser";
import { Close, Done, Star } from "@mui/icons-material";

interface Recommendation {
  user_id: string;
  location_ids: string[];
}

interface Location {
  id: string;
  name: string;
  photo_url: string;
  coordinates: { x: number; y: number };
}

const SAMPLE_RECOMMENDATION: Recommendation = {
  user_id: "81e3d2e1-6710-452c-9b16-845fc5a4b987",
  location_ids: ["caa6946e-2178-47a0-a9e1-528a551441be", "67f1740d-04ce-4e7a-a107-a0400222b13e"],
};

export default function Recommendation() {
  const user = useUser();
  // const [recommendations, setRecommendation] = useState<Recommendation | null>(null);
  const [locations, setLocations] = useState<(Location | null)[]>([]);
  const [seen, setSeen] = useState<string[]>([]);

  useEffect(() => {
    const getRecommendations = async () => {
      // TODO: change from SAMPLE_RECOMMENDATION to null
      if (!user) return SAMPLE_RECOMMENDATION;
      const res = await backend({
        route: `/recommendations/user/${user.id}`,
        method: "GET",
      });
      if (!res || !res.ok) return SAMPLE_RECOMMENDATION;
      const data = await res.json();
      return data as Recommendation;
    };
    const getLocation = async (id: string) => {
      const res = await backend({
        route: `/locations/${id}`,
        method: "GET",
      });
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data as Location;
    };
    getRecommendations()
      .then(async (res) => {
        const a = Promise.all(res.location_ids.map(async (id) => await getLocation(id)));
        return a;
      })
      .then((res) =>
        setLocations(
          res
            .filter((location) => location !== null)
            .filter((location) => location?.id && !seen.includes(location.id))
        )
      );
  }, [user, seen]);

  if (!user) return <div>Loading</div>;

  console.log(locations);

  return (
    <>
      <NavBar />
      <main className="flex w-full h-screen flex-col items-center">
        <h1
          className="text-6xl w-full px-24 pb-24 pt-32 text-center"
          style={{ backgroundImage: "url(/landscape.jpg)", backgroundSize: "cover" }}
        >
          Destinations
        </h1>
        <div className="flex flex-col gap-10 p-10">
          {locations.length !== 0 && (
            <p className="text-xl font-light">Based on your gallery, you might like:</p>
          )}
          {locations.map((location) => {
            if (location) return <LocationCard setSeen={setSeen} location={location} />;
          })}
          {locations.length === 0 && (
            <p className="text-[#555] italic">
              No recommendations left. Check back later for more!
            </p>
          )}
        </div>
      </main>
    </>
  );
}

const LocationCard = ({
  location,
  setSeen,
}: {
  location: Location;
  setSeen: Dispatch<SetStateAction<string[]>>;
}) => {
  const user = useUser();

  const handleLikey = async () => {
    await backend({
      route: `/favourites`,
      method: "POST",
      body: JSON.stringify({
        user_id: user?.id,
        location_id: location.id,
      }),
    });
    setSeen((seen) => [...seen, location.id]);
  };
  // const handleNoLikey = async () => {
  //   setSeen((seen) => [...seen, location.id]);
  // };

  return (
    <div className="select-none shadow-md active:shadow-xl transition-all rounded-lg">
      <div
        className="min-h-[300px] w-full min-w-[600px] rounded-t-lg"
        style={{
          backgroundImage: `url(${location.photo_url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex flex-row p-10 justify-between">
        {/* <div className="flex flex-col items-start justify-center">
          <button
            className="bg-[#ff7f7f] border-2 border-[#c06161] rounded-full w-16 h-16 flex items-center justify-center"
            onClick={handleNoLikey}
          >
            <Close />
          </button>
        </div> */}
        <div className="flex flex-col">
          <h3 className="text-xl">{location.name}</h3>
          <p>
            (<span>{location.coordinates.x}</span>, <span>{location.coordinates.y}</span>)
          </p>
          <a
            className="text-[#7fc6ff] underline"
            href={`https://www.google.com/search?q=${location.name.split(" ").join("+")}`}
          >
            More Info
          </a>
        </div>
        <div className="flex flex-col items-start justify-center">
          <button
            className="bg-[#fffb7f] border-2 border-[#c4c660] rounded-full w-16 h-16 flex items-center justify-center"
            onClick={handleLikey}
          >
            <Star />
          </button>
        </div>
      </div>
    </div>
  );
};

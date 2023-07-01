"use client";

import { useEffect, useState } from "react";
import backend from "../api/backend";
import useUser from "../hooks/useUser";
import NavBar from "../components/navbar";
import { get } from "http";
import Link from "next/link";

interface Favourite {
  user_id: string;
  location_id: string;
}

interface Location {
  id: string;
  name: string;
  photo_url: string;
  coordinates: { x: number; y: number };
}

export default function Favourites() {
  const user = useUser();
  const [locations, setLocations] = useState<(Location | null)[]>([]);

  useEffect(() => {
    if (!user) return;
    const getFavourites = async () => {
      const res = await backend({
        route: `/favourites/user/${user.id}`,
        method: "GET",
      });
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data as Favourite[];
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
    getFavourites()
      .then((res) => {
        if (!res) return;
        const a = Promise.all(res.map(async (fav) => await getLocation(fav.location_id)));
        return a;
      })
      .then((res) => {
        if (!res) return [];
        setLocations(res?.filter((location) => location !== null));
      });
  }, [user]);

  return (
    <>
      <NavBar />
      <main className="flex w-full h-screen flex-col items-center">
        <h1
          className="text-6xl w-full px-24 pb-24 pt-32 text-center"
          style={{ backgroundImage: "url(/landscape.jpg)", backgroundSize: "cover" }}
        >
          Favourites
        </h1>
        <div className="flex flex-col gap-10 p-10">
          {locations.length !== 0 && (
            <p className="text-xl font-light">Your favourite destinations:</p>
          )}
          {locations.map((location) => {
            if (location) return <LocationCard key={location.id} location={location} />;
          })}
          {locations.length === 0 && (
            <p className="text-[#555] italic">No favourites. Check out the recommendations page!</p>
          )}
        </div>
      </main>
    </>
  );
}

interface Sadge {
  favourited_time: string;
  id: string;
  location_id: string;
  user_id: string;
}

interface User {
  bio: string;
  email: string;
  id: string;
  last_location: { x: number; y: number };
  name: string;
  photo_id: string;
}

const LocationCard = ({ location }: { location: Location }) => {
  const user = useUser();
  const [profilePics, setProfilePics] = useState<(User | null)[]>([]);

  useEffect(() => {
    const getBuddies = async () => {
      const res = await backend({
        route: `/favourites/location/${location.id}`,
        method: "GET",
      });
      if (!res || !res.ok) return [];
      const data = await res.json();
      console.log(data);
      return data as Sadge[];
    };
    const getUser = async (id: string) => {
      const res = await backend({
        route: `/users/${id}`,
        method: "GET",
      });
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data as User;
    };
    getBuddies()
      .then((res) => res.map((a) => a.user_id))
      .then(async (res) => await Promise.all(res.map(async (id) => await getUser(id))))
      .then((res) => res.filter((user) => user !== null && user.photo_id !== null))
      .then((res) => setProfilePics(res));
  }, [location.id]);

  if (!user) return <></>;

  return (
    <div className="flex flex-row gap-10">
      <div className="select-none shadow-md active:shadow-xl transition-all rounded-lg">
        <div
          className="min-h-[300px] w-full min-w-[600px] rounded-t-lg"
          style={{
            backgroundImage: `url(${location.photo_url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="flex flex-row p-10 justify-center">
          <div className="flex flex-col text-center">
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
        </div>
      </div>
      <div className="max-w-[200px] py-4">
        <p className="mb-3">People interested in {location.name}</p>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 ">
          {profilePics.map((user) => {
            if (user?.photo_id)
              return (
                <Link href={`/profile/${user.id}`}>
                  <img
                    key={user?.photo_id}
                    src={user?.photo_id}
                    className="w-20 h-20 rounded-full"
                  />
                </Link>
                //   <p key={url}>{url}</p>
              );
            return <></>;
          })}
        </div>
      </div>
    </div>
  );
};

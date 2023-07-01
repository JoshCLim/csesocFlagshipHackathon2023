"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../api/api";
import useUser from "../hooks/useUser";

const EMOJIS = [
  "🚣",
  "🗾",
  "🏔️",
  "⛰️",
  "🌋",
  "🗻",
  "🏕️",
  "🏖️",
  "🏜️",
  "🏝️",
  "🏞️",
  "🏟️",
  "🏛️",
  "🏗️",
  "🛖",
  "🏘️",
  "🏚️",
  "🏠",
  "🏡",
  "🏢",
  "🏣",
  "🏤",
  "🏥",
  "🏦",
  "🏨",
  "🏩",
  "🏪",
  "🏫",
  "🏬",
  "🏭",
  "🏯",
  "🏰",
  "💒",
  "🗼",
  "🗽",
  "⛪",
  "🕌",
  "🛕",
  "🕍",
  "⛩️",
  "🕋",
  "⛲",
  "⛺",
  "🌁",
  "🌃",
  "🏙️",
  "🌄",
  "🌅",
  "🌆",
  "🌇",
  "🌉",
  "🎠",
  "🛝",
  "🎡",
  "🎢",
  "🚂",
  "🚃",
  "🚄",
  "🚅",
  "🚆",
  "🚇",
  "🚈",
  "🚉",
  "🚊",
  "🚝",
  "🚞",
  "🚋",
  "🚌",
  "🚍",
  "🚎",
  "🚐",
  "🚑",
  "🚒",
  "🚓",
  "🚔",
  "🚕",
  "🚖",
  "🚗",
  "🚘",
  "🚙",
  "🛻",
  "🚚",
  "🚛",
  "🚜",
  "🏎️",
  "🏍️",
  "🛵",
  "🛺",
  "🚲",
  "🛴",
  "🚏",
  "🛣️",
  "🛤️",
  "⛽",
  "🛞",
  "🚨",
  "🚥",
  "🚦",
  "🚧",
  "⚓",
  "🛟",
  "⛵",
  "🚤",
  "🛳️",
  "⛴️",
  "🛥️",
  "🚢",
  "✈️",
  "🛩️",
  "🛫",
  "🛬",
  "🪂",
  "💺",
  "🚁",
  "🚟",
  "🚠",
  "🚡",
  "🛰️",
  "🚀",
  "🛸",
  "🪐",
  "🌠",
  "🌌",
  "⛱️",
  "🎆",
  "🎇",
  "🎑",
  "💴",
  "💵",
  "💶",
  "💷",
  "🗿",
  "🛂",
  "🛃",
  "🛄",
  "🛅",
];

const NavBar = () => {
  const { data: session } = useSession();
  const [emoji, setEmoji] = useState<string>("✈️");

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (!session) {
  //       console.log("ahhh");
  //       return null;
  //     }
  //     const user = await api.auth.getUser(session.user.email);
  //     console.log(user);
  //   };
  //   getUserData();
  // }, [session]);
  const user = useUser();

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
    }, 1000);

    // return () => {
    //   clearInterval(emojiInterval);
    // };
  }, []);

  return (
    <nav className="w-full fixed z-50 flex py-5 px-8 flex-row justify-between ">
      <NavLink url="/" label={emoji} key="home" />
      <div className="flex flex-row items-center justify-center gap-3">
        {!session && <NavLink url="/auth/login" label="Login" key="login" />}
        {!session && <NavLink url="/auth/register" label="Register" key="register" />}
        {!!session && !!session.user && (
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="text-[#71bfff] text-xl py-3 px-6 border-[1px] border-transparent font-semibold">
              Hey there, {session.user.name}
            </div>
            <button
              className="text-white text-xl py-3 px-6 border-[1px] border-white transition-all rounded-full active:scale-95 hover:text-[#aaa] hover:border-[#aaa]"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
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

export default NavBar;

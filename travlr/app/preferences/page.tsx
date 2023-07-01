"use client";

import ParkIcon from "@mui/icons-material/Park";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import CelebrationIcon from "@mui/icons-material/Celebration";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MosqueIcon from "@mui/icons-material/Mosque";
import ChairIcon from "@mui/icons-material/Chair";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PetsIcon from "@mui/icons-material/Pets";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";

import NavBar from "../components/navbar";
import { useSession } from "next-auth/react";
import { SetStateAction, useState } from "react";
import backend from "../api/backend";

interface PreferencesInterface {
  food: number;
  nature: number;
  adventure: number;
  culture: number;
  exercise: number;
  tourist_hotspot: number;
  cozy: number;
  family: number;
  wildlife: number;
  near_cbd: number;
  disabled_accessibility: number;
}

const PARAMETERS: {
  prefSelect: keyof PreferencesInterface;
  icon: React.ReactNode;
  label: string;
}[] = [
  {
    prefSelect: "food",
    icon: <DinnerDiningIcon />,
    label: "food",
  },
  {
    prefSelect: "nature",
    icon: <ParkIcon />,
    label: "nature",
  },
  {
    prefSelect: "adventure",
    icon: <DownhillSkiingIcon />,
    label: "adventure",
  },
  {
    prefSelect: "culture",
    icon: <CelebrationIcon />,
    label: "culture",
  },
  {
    prefSelect: "tourist_hotspot",
    icon: <MosqueIcon />,
    label: "tourism",
  },
  {
    prefSelect: "cozy",
    icon: <ChairIcon />,
    label: "cozy",
  },
  {
    prefSelect: "family",
    icon: <FamilyRestroomIcon />,
    label: "family",
  },
  {
    prefSelect: "wildlife",
    icon: <PetsIcon />,
    label: "wildlife",
  },
  {
    prefSelect: "near_cbd",
    icon: <LocationCityIcon />,
    label: "cbd",
  },
  {
    prefSelect: "disabled_accessibility",
    icon: <AccessibleForwardIcon />,
    label: "accessible",
  },
];

export default function Preferences() {
  const [preferences, setPreferences] = useState<PreferencesInterface>({
    food: 0,
    nature: 0,
    adventure: 0,
    culture: 0,
    exercise: 0,
    tourist_hotspot: 0,
    cozy: 0,
    family: 0,
    wildlife: 0,
    near_cbd: 0,
    disabled_accessibility: 0,
  });

  const session = useSession();
  if (!session) return <div>Please log in</div>;

  async function handlePrefSubmit() {
    const res = await backend({
      route: "/preferences",
      method: "POST",
      body: JSON.stringify({
        id: session?.data?.user.email,
        ...preferences,
      }),
    });

    if (!res || !res.ok) return { message: "Cannot set preferences", ok: false };
    return { message: "Welcome!", ok: true };
  }

  return (
    <>
      <NavBar />
      <main className="flex w-full h-screen flex-col items-center ">
        <h1
          className="text-6xl w-full px-24 pb-24 pt-32 text-center"
          style={{ backgroundImage: "url(/landscape.jpg)", backgroundSize: "cover" }}
        >
          Tell us about your travel preferences!
        </h1>

        <div className="flex flex-col w-full gap-10 justify-center items-center p-20">
          <p>I&apos;m looking for...</p>
          <div className="flex flex-row flex-wrap items-center justify-center max-w-[30%] gap-5">
            {PARAMETERS.map(({ prefSelect, icon, label }) => (
              <Bar
                key={prefSelect}
                prefSelect={prefSelect}
                icon={icon}
                label={label}
                preferences={preferences}
                setPreferences={setPreferences}
              />
            ))}
          </div>

          <button
            className="uppercase text-white font-semibold py-4 px-7 rounded-full bg-sky-400"
            onClick={handlePrefSubmit}
          >
            Explore! <span className="ml-[5px]">✈️</span>
          </button>
        </div>
      </main>
    </>
  );
}

const Bar = ({
  prefSelect,
  icon,
  label,
  preferences,
  setPreferences,
}: {
  prefSelect: keyof PreferencesInterface;
  icon: React.ReactNode;
  label: string;
  preferences: PreferencesInterface;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesInterface>>;
}) => {
  const prefContains = () => preferences[prefSelect] > 0.5;

  const togglePref = () => {
    if (prefContains()) {
      setPreferences({ ...preferences, [prefSelect]: 0.0 });
    } else {
      setPreferences({ ...preferences, [prefSelect]: 1.0 });
    }
  };

  return (
    <button
      className={`transition-all flex flex-row gap-3 p-5 rounded-lg ${
        prefContains() ? "bg-[#b7fbb7]" : "bg-[#fbe8e8]"
      }`}
      onClick={togglePref}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

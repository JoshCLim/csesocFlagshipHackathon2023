'use client';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import Stack from '@mui/material/Stack';

import ParkIcon from '@mui/icons-material/Park';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MosqueIcon from '@mui/icons-material/Mosque';
import ChairIcon from '@mui/icons-material/Chair';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PetsIcon from '@mui/icons-material/Pets';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

import NavBar from "../components/navbar";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import backend from '../api/backend';

interface PreferencesInterface {
    food: number,
    nature: number,
    adventure: number,
    culture: number,
    exercise: number,
    tourist_hotspot: number,
    cozy: number,
    family: number,
    wildlife: number,
    near_cbd: number,
    disabled_accessibility: number
}

export default function Preferences() {
    const session = useSession();
    if (!session) return <div>Please log in</div>;

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
        disabled_accessibility: 0
    });

    function handlePrefSelect(pref: string) {
        let possible_pref = [
            "food",
            "nature",
            "adventure",
            "culture",
            "exercise",
            "tourist_hotspot",
            "cozy",
            "family",
            "wildlife",
            "near_cbd",
            "disabled_accessibility",
        ]

        if (!possible_pref.includes(pref)) {
            return;
        }

        setPreferences({
            ...preferences,
            [pref]: 1.0,
        });
    }

    async function handlePrefSubmit() {
        const res = await backend({
            route: "/preferences",
            method: "POST",
            body: JSON.stringify({
                id: session?.data?.user.email,
                ...preferences
            }),
        });

        if (!res || !res.ok) return { message: "Cannot set preferences", ok: false };
        return { message: "Welcome!", ok: true };
    }

    return (
        <main className="flex w-full h-screen flex-col items-center">
            <NavBar />

            <div className="flex flex-col w-full h-full pt-24">
                <Stack direction="row" spacing={1}>
                    <Chip
                        onClick={() => { handlePrefSelect("food") }}
                        variant="outlined"
                        color={preferences.food == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<DinnerDiningIcon />}
                        label="food"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("nature") }}
                        variant="outlined"
                        color={preferences.nature == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<ParkIcon />}
                        label="nature"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("adventure") }}
                        variant="outlined"
                        color={preferences.adventure == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<DownhillSkiingIcon />}
                        label="adventure"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("culture") }}
                        variant="outlined"
                        color={preferences.culture == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<CelebrationIcon />}
                        label="culture"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("exercise") }}
                        variant="outlined"
                        color={preferences.exercise == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<FitnessCenterIcon />}
                        label="exercise"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("tourist_hotspot") }}
                        variant="outlined"
                        color={preferences.tourist_hotspot == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<MosqueIcon />}
                        label="tourism"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("cozy") }}
                        variant="outlined"
                        color={preferences.cozy == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<ChairIcon />}
                        label="cozy"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("family") }}
                        variant="outlined"
                        color={preferences.family == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<FamilyRestroomIcon />}
                        label="family"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("wildlife") }}
                        variant="outlined"
                        color={preferences.wildlife == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<PetsIcon />}
                        label="wildlife"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("near_cbd") }}
                        variant="outlined"
                        color={preferences.near_cbd == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<LocationCityIcon />}
                        label="cbd"
                    />
                    <Chip
                        onClick={() => { handlePrefSelect("disabled_accessibility") }}
                        variant="outlined"
                        color={preferences.disabled_accessibility == 1 ? "success" : "secondary"}
                        size="small"
                        icon={<AccessibleForwardIcon />}
                        label="accessible"
                    />
                </Stack>

                <button
                    className="uppercase text-white font-semibold py-4 px-7 rounded-full bg-sky-400"
                    onClick={handlePrefSubmit}
                >
                    Explore! <span className="ml-[5px]">✈️</span>
                </button>

            </div>
        </main>
    );
}
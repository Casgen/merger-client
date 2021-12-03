import Cookies from "js-cookie";
import { createContext } from "react";
import Merger from "../interfaces/Merger";
import { usePlayer } from "../utils/hooks";

export interface MergerSpotifyPlayerContextType {
    player: Merger.SpotifyPlayer | null
    setPlayer: React.Dispatch<React.SetStateAction<Merger.SpotifyPlayer | null>>
}

export const MergerSpotifyPlayerContext:React.Context<MergerSpotifyPlayerContextType> = createContext<MergerSpotifyPlayerContextType>({} as MergerSpotifyPlayerContextType);


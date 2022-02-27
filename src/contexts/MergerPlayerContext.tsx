import React, { createContext } from "react";
import { YouTubePlayer } from "youtube-player/dist/types";
import Merger from "../interfaces/Merger";

export interface MergerPlayerContextType {
    spotifyPlayer: Merger.SpotifyPlayer | null,
    setSpotifyPlayer: React.Dispatch<React.SetStateAction<Merger.SpotifyPlayer | null>>,
    youtubePlayer: YouTubePlayer | null,
    setYoutubePlayer: React.Dispatch<React.SetStateAction<YouTubePlayer | null>>,
    state: Merger.PlayerState | null,
    setState: React.Dispatch<React.SetStateAction<Merger.PlayerState | null>>,
    loop: boolean,
    setLoop: React.Dispatch<React.SetStateAction<boolean>>,
    queue: Array<string> | null;
    setQueue: React.Dispatch<React.SetStateAction<Array<string> | null>>,
    shuffle: boolean,
    setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MergerPlayerContext:React.Context<MergerPlayerContextType> = createContext<MergerPlayerContextType>({} as MergerPlayerContextType);


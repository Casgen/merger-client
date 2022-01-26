import React, { useState} from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { Routes } from "./router/routes";
import { MergerPlayerContext } from "./contexts/MergerPlayerContext";
import Merger from "./interfaces/Merger";
import { YouTubePlayer } from "youtube-player/dist/types";
import { mergerPlay } from "./utils/mergerUtils";

export const history: BrowserHistory = createBrowserHistory();

export const App: React.FC = () => {

  const [spotifyPlayer, setSpotifyPlayer] = useState<Merger.SpotifyPlayer | null>(null);
  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer | null>(null);
  const [loop, setLoop] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [queue, setQueue] = useState<string[] | null>(null);
  const [state, setState] = useState<Merger.PlayerState | null>(null);

  return (
    <MergerPlayerContext.Provider
    value = {{spotifyPlayer,setSpotifyPlayer,
    youtubePlayer, setYoutubePlayer,
    loop, setLoop,
    shuffle, setShuffle,
    queue, setQueue,
    state, setState}}>
        <Routes></Routes>
    </MergerPlayerContext.Provider>
  );
}

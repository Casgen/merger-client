import React, { useState} from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { Routes } from "./router/routes";
import { MergerPlayerContext } from "./contexts/MergerPlayerContext";
import Merger from "./interfaces/Merger";
import { YouTubePlayer } from "youtube-player/dist/types";
import { mergerPlay } from "./utils/mergerUtils";

export const history: BrowserHistory = createBrowserHistory();

export const App: React.FC = () => {

  const store = createStore();

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

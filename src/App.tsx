import React, { useState} from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { Routes } from "./router/routes";
import { MergerSpotifyPlayerContext } from "./contexts/MergerSpotifyPlayerContext";
import Merger from "./interfaces/Merger";

export const history: BrowserHistory = createBrowserHistory();

export const App: React.FC = () => {

  const [player, setPlayer] = useState<Merger.SpotifyPlayer | null>(null);

  return (
    <MergerSpotifyPlayerContext.Provider value = {{player, setPlayer}}>
      <Routes></Routes>
    </MergerSpotifyPlayerContext.Provider>
  );
}

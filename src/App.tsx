import React, { useState, useEffect, useContext} from "react";
import {Player} from "./components/Player";
import SideBar from "./components/SideBar";
import { Login } from "./components/Login";
import axios, { AxiosResponse } from "axios";
import { MainWindow } from "./pages/MainWindow";
import { Router } from "react-router";
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

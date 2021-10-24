import React, { useState, useEffect} from "react";
import {Player} from "./components/Player";
import SideBar from "./components/SideBar";
import MainWindow from "./components/MainWindow";
import { Login } from "./components/Login";
import axios, { AxiosResponse } from "axios";

export const App: React.FC = () => {

  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const response: Promise<AxiosResponse<unknown, any>>  = axios.get('http://localhost:8080/spotify/auth/token');
      const json: any = (await response).data;
      setToken(json.access_token);
    }

    getToken();
  },[]);

  return (
    <div id="main-container">
      <div id="horizontal-container">
        <SideBar>
          <Login></Login>
        </SideBar>
        <MainWindow>
          <></>
        </MainWindow>
      </div>
      <Player token={token}></Player>
    </div>
  );
}

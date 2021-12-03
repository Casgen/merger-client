import { useState } from "react";
import Merger from "../interfaces/Merger";

export const useSpotifyPlayer = (cookieToken: string | undefined): Merger.SpotifyPlayer | null => {
    console.log("Initializing player");

  let mergerPlayer: Merger.SpotifyPlayer | null = null;

  const spotifyScript = document.createElement("script");
  spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
  spotifyScript.async = true;
  document.body.appendChild(spotifyScript);

    window.onSpotifyWebPlaybackSDKReady = () => { 
      let spotifyPlayer: Spotify.Player = new window.Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb: (token: string) => void) => {
        let token: undefined | string = cookieToken;
        if (token !== undefined) {
          cb(token);
          return;
        }
        console.error("Couldn't create new player!, token is invalid!",token);
      },
      volume: 0.5,
    });

    
    spotifyPlayer.addListener("initialization_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.addListener("authentication_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.addListener("account_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.addListener("playback_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.addListener("account_error", ({ message } : {message:string}) => {
      console.error("Failed to validate Spotify account", message);
    });
    
    let deviceId: string = "";
    spotifyPlayer.addListener("ready", ({device_id}) => {
      deviceId = device_id;
      console.log("Ready with Device ID", device_id);
    });
    
    spotifyPlayer.connect();
    
    mergerPlayer = {spotify: spotifyPlayer, deviceId: deviceId}
  }
  return mergerPlayer;
}
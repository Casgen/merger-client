import { useState } from "react";

export const usePlayer = (token: string | undefined) => {
    const [player, setPlayer] = useState<Spotify.Player>();
    const [deviceId, setDeviceId] = useState<any>();

    const spotifyScript = document.createElement("script");
    spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
    spotifyScript.async = true;
    document.body.appendChild(spotifyScript);

    window.onSpotifyWebPlaybackSDKReady = () => { 
      let spotifyPlayer: Spotify.Player = new window.Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb: (token: string) => void) => {
        if (token !== undefined) {
          cb(token);
          return;
        }
        console.error("Couldn't create new player!, token is invalid!",token);
      },
      volume: 0.5,
    });

    setPlayer(spotifyPlayer);
    
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
    
    spotifyPlayer.addListener("ready", ({device_id}) => {
      setDeviceId(device_id);
      console.log("Ready with Device ID", device_id);
    });
    

    spotifyPlayer.connect();

    console.log('Player Initialized.')

    return [player, setPlayer];
    }
}
import { useEffect, useState } from "react";
import "../App.css";
import "../css/playerButton.css";
import PlayerButton from "./PlayerButton";
import { pause, play } from "../utils/spotifyUtils";

interface Props {
  token: string;
}

export const Player: React.FC<Props> = (props: Props) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const initPlayer = () => {
    console.log("Initializing player");

    const spotifyScript = document.createElement("script");
    spotifyScript.async = true;
    spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(spotifyScript);

    window.onSpotifyWebPlaybackSDKReady = () => { 
      let spotifyPlayer: Spotify.Player = new window.Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb: (token: string) => void) => {
        cb(props.token);
      },
      volume: 0.5,
    });

    spotifyPlayer.on("initialization_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.on("authentication_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.on("account_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.on("playback_error", ({ message } : {message:string}) => {
      console.log(message);
    });
    
    spotifyPlayer.on("account_error", ({ message } : {message:string}) => {
      console.error("Failed to validate Spotify account", message);
    });
    
    spotifyPlayer.on("ready", ({ device_id } : {device_id:string}) => {
      setDeviceId(device_id);
      console.log("Ready with Device ID", device_id);
    });
    
    setPlayer(spotifyPlayer);

    spotifyPlayer.connect();

    console.log('Player Initialized.')
    }
  };

  const resume = () => {
    player?.resume();
  };

  useEffect(() => {
    initPlayer();
  }, [props.token]);

  return (
    <div id="player">
      <div id="info-container"></div>
      <div>
        <div id="player-buttons-container">
          <PlayerButton id="prev-button" src="/PrevButton.svg" execFunc={resume} />
          <PlayerButton
            src="/PlayButton.svg"
            text="Start"
            id="play-button"
            execFunc={() =>
              play(player,{
                spotify_uri: ["spotify:track:4VFGpluBaU1WcquEMzhSz6"],
              },deviceId)
            }
          />
          <PlayerButton id="pause-button" src="/PauseButton.svg" text="Pause" execFunc={() => pause(player, deviceId)} />
          <PlayerButton id="next-button" src="/NextButton.svg" execFunc={() => {}} />
        </div>
        <div id="progress-bar-container"></div>
      </div>
      <div id="volume-container"></div>
    </div>
  );
}

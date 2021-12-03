import { useContext, useEffect, useState } from "react";
import "../App.css";
import "../css/playerButton.css";
import PlayerButton from "./PlayerButton";
import Cookies from 'js-cookie';
import { MergerSpotifyPlayerContext, MergerSpotifyPlayerContextType } from "../contexts/MergerSpotifyPlayerContext";
import InfoPlayerContainer from "./InfoPlayerContainer";

export const Player: React.FC = () => {
    const playerContext: MergerSpotifyPlayerContextType = useContext(MergerSpotifyPlayerContext);
    const [togglePlaySvg, setTogglePlaySvg] = useState<string>("/images/PlayButton.svg");
    const [currentTrack, setCurrentTrack] = useState<Spotify.Track | undefined>(); 

    const initPlayer = () => {
      console.log("Initializing player");

      const spotifyScript = document.createElement("script");
      spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
      spotifyScript.async = true;
      document.body.appendChild(spotifyScript);

        window.onSpotifyWebPlaybackSDKReady = () => { 
          let spotifyPlayer: Spotify.Player = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb: (token: string) => void) => {
            let token: undefined | string = Cookies.get("access_token");
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

        spotifyPlayer.addListener('player_state_changed', (state: Spotify.PlaybackState) => {
          if (state !== null) {
            setCurrentTrack(state.track_window.current_track);
            console.log('Currently Playing', state.track_window.current_track);
            console.log('Position in Song', state.position);
            console.log('Duration of Song', state.duration);
          }
        });
        
        let id: string = "null";
        spotifyPlayer.addListener("ready", ({device_id}) => {
          id = device_id;
          playerContext.setPlayer({
            spotify: spotifyPlayer,
            deviceId: id
          })
          console.log("Ready with Device ID", device_id);
        });
        
        spotifyPlayer.connect();
        
      }
  };

  const togglePlayback = async () => {
    if (playerContext !== null && playerContext.player !== null) {
      let playback: Spotify.PlaybackState | null = await playerContext.player.spotify.getCurrentState();
      if (playback !== null) {
        playback.paused ? setTogglePlaySvg("/images/PlayButton.svg") : setTogglePlaySvg("/images/PauseButton.svg");
        playerContext.player.spotify.togglePlay();
        return;
      }
    }
    console.error("Couldn't execute resume function. Player is undefined!");
  };

  useEffect(() => {
    initPlayer();
    return playerContext.player?.spotify.disconnect();
  },[]);

  return (
    <div id="player">
      <InfoPlayerContainer track={currentTrack}/>
      <div>
        <div id="player-buttons-container">
          <PlayerButton id="prev-button" src="/images/PrevButton.svg" execFunc={togglePlayback} />
          <PlayerButton src={togglePlaySvg} text="Toggle Play" id="play-button" execFunc={togglePlayback} />
          <PlayerButton id="next-button" src="/images/NextButton.svg" execFunc={() => {}} />
        </div>
        <div id="progress-bar-container"></div>
      </div>
      <div id="volume-container"></div>
    </div>
  );
}

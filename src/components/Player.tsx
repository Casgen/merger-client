import { useContext, useEffect, useState } from "react";
import "../scss/playerButton.scss";
import PlayerButton from "./PlayerButton";
import Cookies from 'js-cookie';
import { MergerPlayerContext, MergerPlayerContextType } from "../contexts/MergerPlayerContext";
import InfoPlayerContainer from "./InfoPlayerContainer";
import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";
import YoutubePlayer from "youtube-player";
import { Options, YouTubePlayer } from "youtube-player/dist/types";

export const Player: React.FC = () => {
  const opts: Options = {
      height: '480',
      width: '640',
      playerVars: {
          autoplay: 0,
          enablejsapi: 1,
      }
  };
  const playerContext: MergerPlayerContextType = useContext(MergerPlayerContext);

  const [togglePlaySvg, setTogglePlaySvg] = useState<string>("/images/PlayButton.svg");
  const [currentState, setCurrentState] = useState<Spotify.PlaybackState | undefined>(); 

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

      spotifyPlayer.addListener('player_state_changed', (state) => {
        if (state !== null) {
          setCurrentState(state);
          state.paused ? setTogglePlaySvg("/images/PlayButton.svg") : setTogglePlaySvg("/images/PauseButton.svg");
          console.log('Currently Playing', state);
        }
      });
      
      let id: string = "null";
      spotifyPlayer.addListener("ready", ({device_id}) => {
        id = device_id;
        playerContext.setSpotifyPlayer({
          spotify: spotifyPlayer,
          deviceId: id
        })

        console.log("Ready with Device ID", device_id);
      });
      
      spotifyPlayer.connect();
      
    }
    
    playerContext.setYoutubePlayer(YoutubePlayer("main-window",opts));
  };

  const togglePlayback = async () => {
    if (playerContext !== null && playerContext.spotifyPlayer !== null) {
      if (currentState !== undefined) {
        if (currentState.paused) {
          setTogglePlaySvg("/images/PauseButton.svg")
        } else {
          setTogglePlaySvg("/images/PlayButton.svg");
        } 
        playerContext.spotifyPlayer.spotify.togglePlay();
        return;
      }
    }
    console.error("Couldn't execute resume function. Player is undefined!");
  };

  useEffect(() => {
    initPlayer();
    return playerContext.spotifyPlayer?.spotify.disconnect();
  },[]);

  return (
    <div id="player">
      <InfoPlayerContainer track={currentState?.track_window.current_track}/>
      <div>
        <div id="player-buttons-container">
          <PlayerButton id="prev-button" src="/images/PrevButton.svg" execFunc={togglePlayback} />
          <PlayerButton src={togglePlaySvg} text="Toggle Play" id="play-button" execFunc={togglePlayback} />
          <PlayerButton id="next-button" src="/images/NextButton.svg" execFunc={() => {}} />
        </div>
        <ProgressBar duration={currentState?.duration} progressVal={currentState?.progress_ms}> </ProgressBar>
      </div>
      <VolumeSlider></VolumeSlider>
    </div>
  );
}

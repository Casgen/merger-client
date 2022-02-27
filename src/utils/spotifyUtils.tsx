import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { MergerPlayerContextType } from "../contexts/MergerPlayerContext";
import Merger from "../interfaces/Merger";

export const pause = async (player: Merger.SpotifyPlayer | null): Promise<void> => {
    if (player !== null) {
        player.spotify._options.getOAuthToken((access_token: string) => {
          if (player.deviceId !== null) {
            return fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${player.deviceId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            });
          }
          throw new Error("Couldn't pause, device ID is null!");
        });
        return;
    }
    throw new Error("Couldn't pause, player is undefined!");
}

export const play = async (player: Merger.SpotifyPlayer, spotify_uris?: string[]): Promise<void> => {
    player.spotify._options.getOAuthToken((access_token: string) => {
      if (player.deviceId !== null) {
          return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player.deviceId}`, {
          method: "PUT",
          body: JSON.stringify({uris:spotify_uris}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
      }
      throw new Error("Couldn't pause, device ID is null!");
    });
};

export const spotifySeek = async (player: Merger.SpotifyPlayer, position: number): Promise<void> => {
  player.spotify._options.getOAuthToken((access_token: string) => {
    if (player.deviceId !== null) {
        return fetch(`https://api.spotify.com/v1/me/player/seek?device_id=${player.deviceId}&position_ms=${position}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
    throw new Error("Couldn't pause, device ID is null!");
  });
}

export const searchByQuery = async (query: string) => {
  const result: Promise<AxiosResponse<SpotifyApi.SearchResponse, any>> = axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album&include_external=audio`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get('access_token')}`
    }
  });
  return (await result).data;
}

export const spotifySetVolume = async (player: Merger.SpotifyPlayer, value: number): Promise<void> => {
  player.spotify._options.getOAuthToken((access_token: string) => {
    if (player.deviceId !== null) {
        return fetch(`https://api.spotify.com/v1/me/player/volume?device_id=${player.deviceId}&volume_percent=${value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
    throw new Error("Couldn't pause, device ID is null!");
  });
}

export const spotifyUpdateState = async (ctx: MergerPlayerContextType, spotifyState: Spotify.PlaybackState): Promise<void> => {
  if (spotifyState !== null) {
    let ctxState: Merger.PlayerState = {
      currentPlayer: Merger.PlayerType.Spotify,
      paused: spotifyState.paused,
      currentSong: spotifyState.track_window,
      progressMs: spotifyState.position,
      duration: spotifyState.duration,
    }
    ctx.setState(ctxState);
    console.log('Currently Playing', ctxState);
  }
}

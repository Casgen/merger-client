import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import {SpotifyPlayer} from "react-spotify-web-playback-sdk";
import Merger from "../interfaces/Merger";

export const pause = (player: Merger.SpotifyPlayer | null) => {
    if (player !== null) {
        player.spotify._options.getOAuthToken((access_token: string) => {
          if (player.deviceId !== null) {
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${player.deviceId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            });
            return;
          }
          console.error("Couldn't pause, Device ID is undefined!");
        });
        return;
      }
    console.error("Couldn't pause, player is undefined!");
}

export const play = (player: Merger.SpotifyPlayer | null, spotify_uris: string[]) => {
  
  if (player !== null) {
    player.spotify._options.getOAuthToken((access_token: string) => {
      if (player.deviceId !== null) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player.deviceId}`, {
          method: "PUT",
          body: JSON.stringify({uris:spotify_uris}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        return;
      }
      console.error("Couldn't pause, Device ID is undefined!");
    });
    return;
  }
  console.error("Couldn't pause, player is undefined!");
};

export const searchByQuery = async (query: string) => {
  const result: Promise<AxiosResponse<SpotifyApi.SearchResponse, any>> = axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album&include_external=audio`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get('access_token')}`
    }
  });
  return (await result).data;
}

import {SpotifyPlayer} from "react-spotify-web-playback-sdk";

export const pause = (player: Spotify.Player | undefined, deviceId: string | null) => {
    if (player !== undefined) {
        player._options.getOAuthToken((access_token: string) => {
          if (deviceId !== null) {
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
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

export const play = (player: Spotify.Player | undefined, {spotify_uri}: {spotify_uri: string[]}, deviceId: string | null ) => {
  if (player !== undefined) {
    player._options.getOAuthToken((access_token: string) => {
      if (deviceId !== null) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: "PUT",
          body: JSON.stringify({uris:spotify_uri}),
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

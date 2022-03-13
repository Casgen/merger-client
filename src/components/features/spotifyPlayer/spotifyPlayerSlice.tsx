import { YouTubePlayer } from "youtube-player/dist/types";

export enum ActionTypeSpotifyPlayer {
    SET_SPOTIFY_PLAYER = "SET_SPOTIFY_PLAYER",
}

interface ActionSetYoutubePlayer {
    type: ActionTypeSpotifyPlayer.SET_SPOTIFY_PLAYER,
    payload: YouTubePlayer
}

type Action = ActionSetYoutubePlayer

const initState: boolean = false;

export const spotifyPlayerReducer = (state: boolean = initState, action: Action): YouTubePlayer => {
    switch (action.type) {
        case ActionTypeSpotifyPlayer.SET_SPOTIFY_PLAYER: return action.payload;
    }
}
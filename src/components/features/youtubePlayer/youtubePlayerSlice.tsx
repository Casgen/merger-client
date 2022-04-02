import { YouTubePlayer } from "youtube-player/dist/types";

export enum ActionTypeYoutubePlayer {
    SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER",
}

interface ActionSetYoutubePlayer {
    type: ActionTypeYoutubePlayer.SET_YOUTUBE_PLAYER,
    payload: YouTubePlayer
}

type Action = ActionSetYoutubePlayer

type initState = YouTubePlayer | null;

export const youtubePlayerReducer = (state: initState = null, action: Action): YouTubePlayer | null => {
    switch (action.type) {
        case ActionTypeYoutubePlayer.SET_YOUTUBE_PLAYER: return action.payload;
        default: return state;
    }
}
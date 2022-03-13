import { YouTubePlayer } from "youtube-player/dist/types";

export enum ActionTypeYoutubePlayer {
    SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER",
}

interface ActionSetYoutubePlayer {
    type: ActionTypeYoutubePlayer.SET_YOUTUBE_PLAYER,
    payload: YouTubePlayer
}

type Action = ActionSetYoutubePlayer

const initState: boolean = false;

export const youtubePlayerReducer = (state: boolean = initState, action: Action): YouTubePlayer => {
    switch (action.type) {
        case ActionTypeYoutubePlayer.SET_YOUTUBE_PLAYER: return action.payload;
    }
}
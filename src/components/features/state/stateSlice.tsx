import Merger from "../../../interfaces/Merger";

export enum ActionTypeState {
    STATE_CHANGE = "STATE_CHANGE",
    PAUSE = "PAUSE",
    RESUME = "RESUME",
    SET_PREV_AND_NEXT_SONG = "SET_PREV_AND_NEXT_SONG",
    PAUSE_BY_USER = "PAUSE_BY_USER",
    PLAY_BY_USER = "PLAY_BY_USER",
    SEEK_CHANGE = "SEEK_CHANGE"
}

interface ActionChange {
    type: ActionTypeState.STATE_CHANGE,
    payload: Merger.PlayerState
}

interface ActionPauseByUser {
    type: ActionTypeState.PAUSE_BY_USER;
}

interface ActionPlayByUser {
    type: ActionTypeState.PLAY_BY_USER,
}

interface ActionSetPrevAndNextSong {
    type: ActionTypeState.SET_PREV_AND_NEXT_SONG,
    payload: {
        previous: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video,
        next: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video
    }
}

interface ActionSetSeek {
    type: ActionTypeState.SEEK_CHANGE,
    payload: number
}

const initState: Merger.PlayerState = {
    pausedByUser: false,
    paused: false,
};

type Action = ActionChange | ActionPauseByUser | ActionPlayByUser | ActionSetPrevAndNextSong | ActionSetSeek;

export const stateReducer = (state: Merger.PlayerState = initState, action: Action): Merger.PlayerState => {
    switch (action.type) {
        case ActionTypeState.STATE_CHANGE: {
            return {
                ...state,
                currentPlayer: action.payload.currentPlayer,
                paused: action.payload.paused,
                previousSong: action.payload.previousSong,
                currentSong: action.payload.currentSong,
                nextSong: action.payload.nextSong,
                progressMs: action.payload.progressMs,
                duration: action.payload.duration,
                pausedByUser: action.payload.pausedByUser,
                ytState: action.payload.ytState
            }
        }

        case ActionTypeState.PAUSE_BY_USER: {
            return {
                ...state,
                paused: true,
                pausedByUser: true,
            }
        }

        case ActionTypeState.PLAY_BY_USER: {
            return {
                ...state,
                paused: false,
                pausedByUser: false,
            }
        }

        case ActionTypeState.SET_PREV_AND_NEXT_SONG: {
            return {
                ...state,
                nextSong: action.payload.next,
                previousSong: action.payload.previous
            }
        }

        case ActionTypeState.SEEK_CHANGE: {
            return {
                ...state,
                progressMs: action.payload
            }
        }

        default:
            return state;
    }
}

import Merger from "../../../interfaces/Merger";

export enum ActionTypeState {
    STATE_CHANGE = "STATE_CHANGE",
    PAUSE = "PAUSE",
    RESUME = "RESUME"
}

interface ActionChange {
    type: ActionTypeState.STATE_CHANGE,
    payload: Merger.PlayerState
}

interface ActionPause {
    type: ActionTypeState.PAUSE
}

interface ActionResume {
    type: ActionTypeState.RESUME
}

const initState: Merger.PlayerState = {
  resuming: false,
  paused: false,
};

type Action = ActionChange | ActionPause | ActionResume;

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
                resuming: action.payload.resuming,
                ytState: action.payload.ytState
            }
        }

        case ActionTypeState.PAUSE: {
            return {
                ...state,
                paused: false,
                resuming: false,
            }
        }

        case ActionTypeState.RESUME: {
            return {
                ...state,
                paused: true,
                resuming: true,
            }
        }

        default: return state;
    }
}

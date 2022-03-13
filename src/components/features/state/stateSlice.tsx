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
                currentPlayer: action.payload.currentPlayer ? action.payload.currentPlayer : state.currentPlayer,
                paused: action.payload.paused ? action.payload.paused : state.paused,
                previousSong: action.payload.previousSong ? action.payload.previousSong : state.previousSong,
                currentSong: action.payload.currentSong ? action.payload.currentSong : state.currentSong,
                nextSong: action.payload.nextSong ? action.payload.nextSong : state.nextSong,
                progressMs: action.payload.progressMs ? action.payload.progressMs : state.progressMs,
                duration: action.payload.duration ? action.payload.duration : state.duration,
                resuming: action.payload.resuming ? action.payload.resuming : state.resuming,
                ytState: action.payload.ytState ? action.payload.ytState : state.ytState,
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
    }
}

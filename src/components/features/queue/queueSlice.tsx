export enum ActionTypeQueue {
    ADD_SONG = "ADD_SONG",
    SET_QUEUE = "SET_QUEUE"
}

interface ActionSetQueue {
    type: ActionTypeQueue.SET_QUEUE,
    payload: string[]
}

interface ActionAddSong {
    type: ActionTypeQueue.ADD_SONG,
    payload: string
}

type Action = ActionSetQueue | ActionAddSong

const initState: string[] = [];

export const queueReducer = (state: string[] = initState, action: Action): string[] => {
    switch (action.type) {
        case ActionTypeQueue.ADD_SONG: return [...state, action.payload];
        case ActionTypeQueue.SET_QUEUE: return {...state, };
        default: return state;
    }
}
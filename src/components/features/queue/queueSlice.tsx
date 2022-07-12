import Merger from "../../../interfaces/Merger";

export enum ActionTypeQueue {
    ADD_SONG = "ADD_SONG",
    SET_QUEUE = "SET_QUEUE",
    SET_QUEUE_ARRAY = "SET_QUEUE_ARRAY",
    SET_QUEUE_COUNTER = "SET_PROGRAM_COUNTER",
    INC_QUEUE_COUNTER = "INC_QUEUE_COUNTER",
    DEC_QUEUE_COUNTER = "DEC_QUEUE_COUNTER"
}

interface ActionSetQueue {
    type: ActionTypeQueue.SET_QUEUE,
    payload: Merger.Queue
}

interface ActionSetQueueCounter {
    type: ActionTypeQueue.SET_QUEUE_COUNTER,
    payload: number
}

interface ActionIncQueueCounter {
    type: ActionTypeQueue.INC_QUEUE_COUNTER
}

interface ActionDecQueueCounter {
    type: ActionTypeQueue.DEC_QUEUE_COUNTER
}


interface ActionAddSong {
    type: ActionTypeQueue.ADD_SONG,
    payload: SpotifyApi.TrackObjectFull;
}

type Action = ActionSetQueue | ActionAddSong | ActionSetQueueCounter | ActionIncQueueCounter | ActionDecQueueCounter

const initState: Merger.Queue = {queue: [], counter: 0};

export const queueReducer = (state: Merger.Queue = initState, action: Action): Merger.Queue => {
    switch (action.type) {
        case ActionTypeQueue.SET_QUEUE:
            return {...state, queue: action.payload.queue, counter: action.payload.counter};
        case ActionTypeQueue.ADD_SONG:
            return {...state, queue: [...state.queue, action.payload]}
        case ActionTypeQueue.SET_QUEUE_COUNTER:
            return {...state, counter: action.payload};
        case ActionTypeQueue.INC_QUEUE_COUNTER: {
            let newIndex = state.counter + 1;
            return {...state, counter: newIndex};
        }
        case ActionTypeQueue.DEC_QUEUE_COUNTER: {
            let newIndex = state.counter - 1;
            return {...state, counter: newIndex};
        }
        default:
            return state;
    }
}
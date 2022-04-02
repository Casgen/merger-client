export enum ActionTypeShuffle {
    SET_SHUFFLE_TRUE = "SET_SHUFFLE_TRUE",
    SET_SHUFFLE_FALSE = "SET_SHUFFLE_FALSE"
}

interface ActionSetShuffleIsTrue {
    type: ActionTypeShuffle.SET_SHUFFLE_TRUE
}

interface ActionSetShuffleIsFalse {
    type: ActionTypeShuffle.SET_SHUFFLE_FALSE
}

type Action = ActionSetShuffleIsFalse | ActionSetShuffleIsTrue

const initState: boolean = false;

export const shuffleReducer = (state: boolean = initState, action: Action): boolean => {
    switch (action.type) {
        case ActionTypeShuffle.SET_SHUFFLE_TRUE: return true;
        case ActionTypeShuffle.SET_SHUFFLE_FALSE: return false;
        default: return state;
    }
}
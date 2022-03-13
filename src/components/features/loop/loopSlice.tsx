export enum ActionTypeLoop {
    SET_LOOP_TRUE = "SET_LOOP_TRUE",
    SET_LOOP_FALSE = "SET_LOOP_FALSE"
}

interface ActionSetLoopIsTrue {
    type: ActionTypeLoop.SET_LOOP_TRUE
}

interface ActionSetLoopIsFalse {
    type: ActionTypeLoop.SET_LOOP_FALSE
}

type Action = ActionSetLoopIsFalse | ActionSetLoopIsTrue

const initState: boolean = false;

export const loopReducer = (state: boolean = initState, action: Action): boolean => {
    switch (action.type) {
        case ActionTypeLoop.SET_LOOP_TRUE: return true;
        case ActionTypeLoop.SET_LOOP_FALSE: return false;
    }
}
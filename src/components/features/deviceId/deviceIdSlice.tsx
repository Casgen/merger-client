export enum ActionTypeDeviceID {
    SET_DEVICE_ID = "SET_DEVICE_ID"
}

interface ActionSetDeviceId {
    type: ActionTypeDeviceID.SET_DEVICE_ID,
    payload: string
}

const initState: string = "";

export const deviceIDReducer = (state: string = initState, action: ActionSetDeviceId): string => {
    switch (action.type) {
        case ActionTypeDeviceID.SET_DEVICE_ID: return action.payload;
        default: return state;
    }
}
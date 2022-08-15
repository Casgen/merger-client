import { combineReducers } from "redux";
import { queueReducer } from "./queue/queueSlice";
import {deviceIDReducer} from "./deviceId/deviceIdSlice";
import { stateReducer } from "./state/stateSlice";
import { youtubePlayerReducer } from "./youtubePlayer/youtubePlayerSlice";


export const rootReducer = combineReducers({
    deviceId: deviceIDReducer,
    state: stateReducer,
    queue: queueReducer,
})

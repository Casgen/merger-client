import { combineReducers } from "redux";
import { loopReducer } from "./loop/loopSlice";
import { queueReducer } from "./queue/queueSlice";
import { shuffleReducer } from "./shuffle/shuffleSlice";
import {deviceIDReducer} from "./deviceId/deviceIdSlice";
import { stateReducer } from "./state/stateSlice";
import { youtubePlayerReducer } from "./youtubePlayer/youtubePlayerSlice";


export const rootReducer = combineReducers({
    deviceId: deviceIDReducer,
    youtubePlayer: youtubePlayerReducer,
    state: stateReducer,
    queue: queueReducer,
    shuffle: shuffleReducer,
    loop: loopReducer
})
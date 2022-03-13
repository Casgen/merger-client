import { combineReducers } from "redux";
import { loopReducer } from "./loop/loopSlice";
import { queueReducer } from "./queue/queueSlice";
import { shuffleReducer } from "./shuffle/shuffleSlice";
import { spotifyPlayerReducer } from "./spotifyPlayer/spotifyPlayerSlice";
import { stateReducer } from "./state/stateSlice";
import { youtubePlayerReducer } from "./youtubePlayer/youtubePlayerSlice";

export const rootReducer = combineReducers({
    spotifyPlayer: spotifyPlayerReducer,
    youtubePlayer: youtubePlayerReducer,
    state: stateReducer,
    queue: queueReducer,
    shuffle: shuffleReducer,
    loop: loopReducer
})

export type RootState = ReturnType<typeof rootReducer>;
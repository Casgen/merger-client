import { combineReducers } from "redux"
import { loopReducer } from "./components/features/loop/loopSlice"
import { queueReducer } from "./components/features/queue/queueSlice"
import { shuffleReducer } from "./components/features/shuffle/shuffleSlice"
import { spotifyPlayerReducer } from "./components/features/spotifyPlayer/spotifyPlayerSlice"
import { stateReducer } from "./components/features/state/stateSlice"
import { youtubePlayerReducer } from "./components/features/youtubePlayer/youtubePlayerSlice"

const rootReducer = combineReducers({
    queue: queueReducer,
    spotifyPlayer: spotifyPlayerReducer,
    youtubePlayer: youtubePlayerReducer,
    state: stateReducer,
    loop: loopReducer,
    shuffle: shuffleReducer
})
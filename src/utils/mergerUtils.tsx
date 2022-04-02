import Merger from "../interfaces/Merger";
import {spotifyPause, spotifyPlay, spotifySeek, spotifySetVolume} from "./spotifyUtils";
import {store} from "../App";
import {ActionTypeQueue} from "../components/features/queue/queueSlice";

export const mergerPlay = (uri: string) => {
    let state: Merger.PlayerState = store.getState().state;
    let spotifyRegExp = new RegExp(/spotify/g);

    if (spotifyRegExp.test(uri) && window.Spotify !== undefined) {
        if (state.currentPlayer === Merger.PlayerType.Youtube) {
            window.youtubePlayer.stopVideo();
            return;
        }
        spotifyPlay([uri]);
        return;
    }
    throw new Error(initializationError);
}

export const mergerPause = () => {
    let state: Merger.PlayerState = store.getState().state;

    if (state !== undefined) {
        if (state.currentPlayer === Merger.PlayerType.Spotify) {
            return spotifyPause();
        }
        return window.youtubePlayer.pauseVideo();
    }
    throw new Error(initializationError);
}

export const mergerTogglePlayBack = () => {
    let state: Merger.PlayerState = store.getState().state;
    if (state.currentPlayer !== undefined) {
        if (state.currentPlayer === Merger.PlayerType.Spotify) {
            if (!state.paused) return spotifyPause();
            return spotifyPlay();
        }
        if (!state.paused) return window.youtubePlayer.pauseVideo();
        return window.youtubePlayer.playVideo();
    }
    throw new Error(initializationError);
}

export const mergerSetVolume = (value: number) => {
    if (store.getState().state.currentPlayer !== undefined) {
        if (store.getState().state.currentPlayer === Merger.PlayerType.Spotify)
            spotifySetVolume(value);

        if (window.youtubePlayer !== undefined)
            window.youtubePlayer.setVolume(value);
    }
}

export const mergerSeek = async (value: number): Promise<void> => {
    let state: Merger.PlayerState = store.getState().state;

    if (state.currentPlayer !== undefined) {
        if (state.currentPlayer === Merger.PlayerType.Spotify) {
            return spotifySeek(value);
        }
        return window.youtubePlayer.seekTo(Math.round(value / 1000), true);
    }
    throw new Error(initializationError);
}

export const addNextSpotifySongsToQueue = (uri: string, tracks: SpotifyApi.PlaylistTrackObject[]) => {
    let index: number = tracks.findIndex((element) => element.track.uri === uri);

    let array: Array<string> = new Array<string>();

    for (let i = index; i < tracks.length; i++) {
        array.push(tracks[i].track.uri);
    }

    store.dispatch({type: ActionTypeQueue.SET_QUEUE, payload: array})
}

export const initializationError: string = "State hasn't been initialized!";
export const fetchError: string = "Fetch failed!";
export const deviceIdIsNullError: string = "Couldn't execute. Device ID is null!";
export const currentPlayerIsNull: string = "current Player is null!";
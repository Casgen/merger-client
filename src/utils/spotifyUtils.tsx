import axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import Merger from "../interfaces/Merger";
import {store} from "../App";
import {ActionTypeState} from "../components/features/state/stateSlice";
import {resolve} from "dns/promises";

export const spotifyPause = async (): Promise<void> => {
    if (window.Spotify.Player === undefined) throw new Error(spotifyIsUndefinedError);
    return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/pause?device_id=${store.getState().deviceId}`)
}

export const spotifyPlay = (spotify_uris?: string[]): Promise<void> => {
    if (window.Spotify === undefined) throw new Error(spotifyIsUndefinedError);
    if (spotify_uris !== undefined)
        return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/play?device_id=${store.getState().deviceId}`, spotify_uris)
    return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/play?device_id=${store.getState().deviceId}`)

};

export const spotifySeek = (position: number): Promise<void> => {
    if (window.Spotify === undefined) throw new Error(spotifyIsUndefinedError);
    return window.Spotify.Player.prototype.seek(position);
}

export const searchByQuery = async (query: string) => {
    const result: Promise<AxiosResponse<SpotifyApi.SearchResponse, any>> = axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album&include_external=audio`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get('access_token')}`
        }
    });
    return (await result).data;
}

export const spotifySetVolume = (value: number) => {
    if (store.getState().deviceId === undefined) throw new Error(spotifyIsUndefinedError);
        window.Spotify.Player.prototype.setVolume(value/100);
    /*return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/setVolume`, {
        device_id: store.getState().deviceId,
        value: value,
    });*/
}

export const spotifyUpdateState = async (s: Spotify.PlaybackState): Promise<void> => {
    if (s !== undefined) {

        let currentState: Merger.PlayerState = store.getState().state;

        const newState: Merger.PlayerState = {
            ...currentState,
            currentPlayer: Merger.PlayerType.Spotify,
            paused: s.paused,
            currentSong: s.track_window,
            progressMs: s.position,
            duration: s.duration
        }

        store.dispatch({type: ActionTypeState.STATE_CHANGE, payload: newState});
    }
}

export const waitForSpotifyWebPlaybackSDKToLoad = async () => {
    return new Promise(resolve => {
        if (window.Spotify) {
            resolve(window.Spotify);
        } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
                resolve(window.Spotify);
            }
        }
    })
}

export const spotifyIsUndefinedError: string = "Spotify Player is Undefined!";

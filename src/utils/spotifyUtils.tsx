import axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import Merger from "../interfaces/Merger";
import {store} from "../App";
import {ActionTypeState} from "../components/features/state/stateSlice";

export const spotifyPause = async (): Promise<void> => {
    if (window.Spotify.Player === undefined) throw new Error(spotifyIsUndefinedError);

    store.dispatch({type: ActionTypeState.PAUSE_BY_USER});

    return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/pause?device_id=${store.getState().deviceId}`);
}

export const spotifyPlay = async (spotify_uris?: string[]): Promise<void> => {
    if (window.Spotify === undefined) throw new Error(spotifyIsUndefinedError);

    if (spotify_uris !== undefined) {
        let track: SpotifyApi.TrackObjectFull = await getSpotifyTrack(getTrackUniqueId(spotify_uris[0]));

        let currentState: Merger.PlayerState = store.getState().state;

        let newState: Merger.PlayerState = {
            duration: track.duration_ms,
            progressMs: 0,
            pausedByUser: false,
            paused: false,
            currentSong: track,
            nextSong: currentState.nextSong,
            previousSong: currentState.previousSong,
            currentPlayer: Merger.PlayerType.Spotify
        };

        store.dispatch({type: ActionTypeState.STATE_CHANGE, payload: newState});
        return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/play?device_id=${store.getState().deviceId}`, spotify_uris);
    }
    store.dispatch({type: ActionTypeState.PLAY_BY_USER});
    return axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/play?device_id=${store.getState().deviceId}`);
};

export const spotifySeek = async (position: number): Promise<void> => {
    if (window.Spotify === undefined) throw new Error(spotifyIsUndefinedError);

    let res: AxiosResponse<void> = await axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/seek?device_id=${store.getState().deviceId}&position_ms=${position}`)

    return updatePlaybackState();
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
    window.Spotify.Player.prototype.setVolume(value / 100);
}

export const spotifyUpdateState = async (s: Spotify.PlaybackState): Promise<void> => {
    if (s) {

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
export const getSpotifyTrack = async (uri: string): Promise<SpotifyApi.TrackObjectFull> => {
    let res: Promise<AxiosResponse<SpotifyApi.TrackObjectFull>> = axios.get<SpotifyApi.TrackObjectFull>(`${process.env.REACT_APP_API_LINK}/spotify/track/${uri}`);
    return (await res).data;
}

export const getTrackUniqueId = (uri: string): string => {
    return uri.split(":")[2];
}

export const getPlaybackState = async (): Promise<SpotifyApi.CurrentlyPlayingObject> => {
    let res: Promise<AxiosResponse<SpotifyApi.CurrentlyPlayingObject>> = axios.get<SpotifyApi.CurrentPlaybackResponse>(`${process.env.REACT_APP_API_LINK}/spotify/player/playbackState`)
    return (await res).data;
}

export const updatePlaybackState = async (): Promise<void> => {
    let pbState: SpotifyApi.CurrentlyPlayingObject = await getPlaybackState();
    console.log(pbState);
    store.dispatch({type: ActionTypeState.SEEK_CHANGE, payload: pbState.progress_ms})
}

export const isSpotifyTrackObjectFull = (obj: any): obj is SpotifyApi.TrackObjectFull => {
    return (obj as SpotifyApi.TrackObjectFull).popularity !== undefined;
}

export const isSpotifyTrackObject = (obj: any): obj is SpotifyApi.TrackObjectSimplified => {
    return (obj as SpotifyApi.TrackObjectSimplified).type === "track";
}

export const isSpotifyUri = (uri: string): boolean => {
    let spotifyRegExp = new RegExp(/spotify/g);
    return spotifyRegExp.test(uri);
}

export const splitSpotifyUri = (uri: string): string => {
    return uri.split(":")[2];
}

export const spotifyIsUndefinedError: string = "Spotify Player is Undefined!";

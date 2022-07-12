import { Options, YouTubePlayer } from "youtube-player/dist/types";

namespace Merger {

    export interface SpotifyPlayer {
        spotify?: Spotify.Player,
        deviceId: string
    }


    export enum PlayerType {
        Youtube,
        Spotify
    }

    /**
     * @param ytState -1 = not started | 0 = ended | 1 = is playing | 2 = paused | 3 = loading | 5 = video cued
     */

    export interface PlayerState {
        currentPlayer?: PlayerType.Spotify | PlayerType.Youtube,
        paused: boolean,
        previousSong?: gapi.client.youtube.Video | SpotifyApi.TrackObjectFull,
        currentSong?: gapi.client.youtube.Video | SpotifyApi.TrackObjectFull,
        nextSong?:  gapi.client.youtube.Video | SpotifyApi.TrackObjectFull,
        progressMs?: number,
        duration?: number, 
        pausedByUser?: boolean,
        ytState?: number
    }

    export interface Queue {
        queue: Array<SpotifyApi.TrackObjectFull>,
        counter: number
    }
}

declare global {
    interface Window {
        youtubePlayer: YouTubePlayer,
    }
}

export const YoutubeOptions: Options = {
    height: '480',
    width: '640',
    playerVars: {
        autoplay: 1,
        enablejsapi: 1,
        controls: 0
    }
};

export default Merger;
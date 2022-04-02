import { Options, YouTubePlayer } from "youtube-player/dist/types";
import Cookies from "js-cookie";

namespace Merger {

    export interface SpotifyPlayer{
        spotify?: Spotify.Player,
        deviceId: string
    }

    export interface PlayerCurrentSongInfo {
        img: string | null,
        artist: string | null,
        songTitle: string | null,
        imgUrl: string | null,
        artistUrl: string | null
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
        previousSong?: Spotify.PlaybackTrackWindow | gapi.client.youtube.ResourceId,
        currentSong?: Spotify.PlaybackTrackWindow | gapi.client.youtube.Video,
        nextSong?: Spotify.PlaybackTrackWindow | gapi.client.youtube.ResourceId,
        progressMs?: number,
        duration?: number, 
        resuming?: boolean,
        ytState?: number
    }

    export interface State {
        spotifyPlayer: Merger.SpotifyPlayer | null,
        youtubePlayer: YouTubePlayer | null,
        state: Merger.PlayerState,
        loop: boolean,
        queue: Array<string>;
        shuffle: boolean,
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

export const SpotifyOptions: Spotify.PlayerInit = {
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: (cb: (token: string) => void) => {
        let token: undefined | string = Cookies.get("access_token");
        if (token !== undefined) {
            cb(token);
            return;
        }
        console.error("Couldn't create new player!, token is invalid!",token);
    },
    volume: 0.5,
}

export default Merger;
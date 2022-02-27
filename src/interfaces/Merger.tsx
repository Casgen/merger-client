import { Options } from "youtube-player/dist/types";

namespace Merger {
    export interface SpotifyPlayer{
        spotify: Spotify.Player,
        deviceId: string
    }

    export interface PlayerCurrentSongInfo {
        img: string | null,
        artist: string | null,
        songTitle: string | null,
        imgUrl: string | null,
        artistUrl: string | null
    }

    export interface YoutubePlayerOpts {
        height: string,
        width: string,
        playerVars: {
            autoplay: 1 | 0,
            enablejsapi: 1 | 0,
        }
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
        paused?: boolean,
        previousSong?: Spotify.PlaybackTrackWindow | gapi.client.youtube.ResourceId,
        currentSong?: Spotify.PlaybackTrackWindow | gapi.client.youtube.Video,
        nextSong?: Spotify.PlaybackTrackWindow | gapi.client.youtube.ResourceId,
        progressMs?: number,
        duration?: number, 
        resuming?: boolean,
        ytState?: number
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
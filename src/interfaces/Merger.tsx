import { YouTubePlayer } from "youtube-player/dist/types";

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
        Youtube = 'Y',
        Spotify = 'S'
    }

    export enum PlaybackState {
        Playing = "Playing",
        Stopped = "Stopped",
        Paused = "Paused",

    }

    export interface PlayerState {
        currentPlayer: PlayerType.Spotify | PlayerType.Spotify | null,
        currentState: PlaybackState | null
        currentSong: Spotify.PlaybackTrackWindow;
    }
}

export default Merger;
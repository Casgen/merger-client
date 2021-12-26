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
}

export default Merger;
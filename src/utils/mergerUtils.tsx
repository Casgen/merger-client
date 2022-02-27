import { MergerPlayerContextType } from "../contexts/MergerPlayerContext";
import Merger, { YoutubeOptions } from "../interfaces/Merger";
import { pause, play, spotifySeek} from "./spotifyUtils";
import YouTubePlayer from "youtube-player";
import axios from "axios";
import moment from "moment";

export const mergerPlay = (ctx: MergerPlayerContextType, uri: string): void => {
    let spotifyRegExp = new RegExp(/spotify/g);
    if (spotifyRegExp.test(uri) && ctx.spotifyPlayer !== null) {
        if (ctx.state?.currentPlayer === Merger.PlayerType.Youtube) ctx.youtubePlayer?.stopVideo();
        play(ctx.spotifyPlayer,[uri])
    }
    return;
}

export const mergerPause = async (ctx: MergerPlayerContextType): Promise<void> => {
    if (ctx !== null) {
        if (ctx.state?.currentPlayer === Merger.PlayerType.Spotify) {
            return pause(ctx.spotifyPlayer);
        }
        return ctx.youtubePlayer?.pauseVideo();
    }
    throw new Error(contextError);
}

export const mergerTogglePlayBack = async (ctx: MergerPlayerContextType): Promise<void> => {
    if (ctx.state !== null && ctx.spotifyPlayer !== null) {
        let state = ctx.state;
        if (state.currentPlayer === Merger.PlayerType.Spotify) {
            if (!state.paused) {
                return pause(ctx.spotifyPlayer);
            }
            return play(ctx.spotifyPlayer);
        }

        if (!state.paused) {
            return ctx.youtubePlayer?.pauseVideo();
        }
        return ctx.youtubePlayer?.playVideo();
    }
    throw new Error(contextError);
}

export const mergerSetVolume = async (value: number, ctx: MergerPlayerContextType): Promise<void> => {
    if (ctx !== null) {
        if (ctx.state?.currentPlayer === Merger.PlayerType.Spotify) {
            if (ctx.spotifyPlayer !== null) {
                ctx.spotifyPlayer.spotify.setVolume(value/100);
                return;
            }
        }

        if (ctx.youtubePlayer !== null) {
            ctx.youtubePlayer.setVolume(value);
            return;
        }
    }
    throw new Error(contextError);
}

export const mergerSeek = async (ctx: MergerPlayerContextType, value: number): Promise<void> => {
    if (ctx !== null) {
        if (ctx.state?.currentPlayer === Merger.PlayerType.Spotify) {
            if (ctx.spotifyPlayer !== null) {
                return spotifySeek(ctx.spotifyPlayer, value);
            }
        }
        return ctx.youtubePlayer?.seekTo(Math.round(value/1000),true);
    }
    throw new Error(contextError);
}

export const setupYoutubePlayer = (ctx: MergerPlayerContextType, uri?: gapi.client.youtube.ResourceId) => {
    if (ctx.youtubePlayer == null) {
        let player = YouTubePlayer('youtube-player-window',{...YoutubeOptions, videoId: uri?.videoId});

        let video: gapi.client.youtube.Video;
        axios.get<gapi.client.youtube.VideoListResponse>(`${process.env.REACT_APP_API_LINK}/youtube/video/${uri?.videoId}`).then((res) => {
            if (res.data.items !== undefined) {
                video = res.data.items[0];
            }
        });

        ctx.spotifyPlayer?.spotify.pause();

        let mainWindow: HTMLElement | null = document.getElementById("main-window");

        if (mainWindow !== null) {
            mainWindow.scrollTo(0,0);
            mainWindow.style.overflowY = "hidden";
        }

        player.on("stateChange",async (event) => {
            let duration: number | undefined;
            let progress: number = (await player.getCurrentTime())*1000;

            if (video !== undefined) {
                duration = (await moment.duration(video.contentDetails?.duration).asMilliseconds());
            } else {
                duration = ctx.state?.duration;
            }

            switch (event.data) {
                case -1: {
                    ctx.setState({
                        currentPlayer: Merger.PlayerType.Youtube,
                        paused: undefined,
                        currentSong: video,
                        progressMs: 0,
                        duration: duration});
                    break;
                }

                case 0:
                    ctx.setState({
                        currentPlayer: Merger.PlayerType.Youtube,
                        paused: true,
                        resuming: true,
                        currentSong: video ? video : ctx.state?.currentSong,
                        progressMs: progress,
                        duration: duration});
                        break;
                case 2:
                    ctx.setState({
                        currentPlayer: Merger.PlayerType.Youtube,
                        ytState:event.data,
                        paused: true,
                        resuming: false,
                        duration: duration,
                        currentSong: video ? video : ctx.state?.currentSong,
                        progressMs: progress
                    }); break;
                case 1: {
                    ctx.setState({
                        currentPlayer: Merger.PlayerType.Youtube,
                        paused: false,
                        currentSong: video ? video : ctx.state?.currentSong,
                        resuming: true,
                        progressMs: progress,
                        duration: duration,
                    }); break;
                }
        
            }
        })
        ctx.setYoutubePlayer(player);

        let element = document.getElementById("youtube-player-window");
        if (element !== null ) element.style.visibility = "visible";
    }
}

export const youtubePlay = (ctx: MergerPlayerContextType, uri?: gapi.client.youtube.ResourceId) => {
    if (uri?.videoId !== undefined) {

        axios.get(`${process.env.API_LINK}/video/${uri.videoId}`)

        ctx.youtubePlayer?.cueVideoById(uri?.videoId);
        ctx.youtubePlayer?.playVideo();
    }
}

export const addNextSpotifySongsToQueue = (ctx: MergerPlayerContextType ,uri: string, tracks: SpotifyApi.PlaylistTrackObject[]) => {
    let index: number = tracks.findIndex((element) => element.track.uri === uri);

    let array: Array<string> = new Array<string>();

    for (let i = index; i < tracks.length; i++) {
        array.push(tracks[i].track.uri);
    }

    ctx.setQueue(array);
    console.log(ctx.queue);
}

export const updateState = (ctx: MergerPlayerContextType, spotifyState: Spotify.PlaybackState) => {

}

export const contextError: string = "Context is null!";
export const fetchError: string = "Fetch failed!";
export const deviceIdIsNullError: string = "Couldn't execute. Device ID is null!";
export const tokenError: string = "No token provied";
export const currentPlayerIsNull: string = "current Player is null!";
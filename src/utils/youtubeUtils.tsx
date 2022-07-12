import YouTubePlayer from "youtube-player";
import Merger, {YoutubeOptions} from "../interfaces/Merger";
import axios, {AxiosResponse} from "axios";
import moment from "moment";
import {store} from "../App";
import {ActionTypeState} from "../components/features/state/stateSlice";

export const youtubeIsUndefinedError: string = "Youtube Player is undefined!";

export const setupYoutubePlayer = (uri?: gapi.client.youtube.ResourceId) => {
    if (window.youtubePlayer == null) {
        let youtubePlayer = YouTubePlayer('youtube-player-window', {...YoutubeOptions, videoId: uri?.videoId});

        let video: gapi.client.youtube.Video;
        axios.get<gapi.client.youtube.VideoListResponse>(`${process.env.REACT_APP_API_LINK}/youtube/video/${uri?.videoId}`).then((res) => {
            if (res.data.items !== undefined) {
                video = res.data.items[0];
            }
        });


        let mainWindow: HTMLElement | null = document.getElementById("main-window");

        if (mainWindow !== null) {
            mainWindow.scrollTo(0, 0);
            mainWindow.style.overflowY = "hidden";
        }

        youtubePlayer.on("stateChange", async (event) => {
            let duration: number | undefined;
            let progress: number = await window.youtubePlayer.getCurrentTime() * 1000;

            if (video !== undefined) {
                duration = await moment.duration(video.contentDetails?.duration).asMilliseconds();
            } else {
                duration = store.getState().state.duration;
            }

            switch (event.data) {
                case -1: {
                    store.dispatch({
                            type: ActionTypeState.STATE_CHANGE,
                            payload: {
                                currentPlayer: Merger.PlayerType.Youtube,
                                paused: false,
                                currentSong: video,
                                progressMs: progress,
                                duration: duration
                            }
                        }
                    );
                    break;
                }
                case 0:
                    store.dispatch({
                        type: ActionTypeState.STATE_CHANGE, payload: {
                            currentPlayer: Merger.PlayerType.Youtube,
                            paused: true,
                            resuming: true,
                            currentSong: video ? video : store.getState().state.currentSong,
                            progressMs: progress,
                            duration: duration
                        }
                    });
                    break;
                case 2:
                    store.dispatch({
                        type: ActionTypeState.STATE_CHANGE, payload: {
                            currentPlayer: Merger.PlayerType.Youtube,
                            ytState: event.data,
                            paused: true,
                            resuming: false,
                            duration: duration,
                            currentSong: video ? video : store.getState().state.currentSong,
                            progressMs: progress,
                        }
                    });
                    break;
                case 1: {
                    store.dispatch({
                        type: ActionTypeState.STATE_CHANGE, payload: {
                            currentPlayer: Merger.PlayerType.Youtube,
                            paused: false,
                            currentSong: video ? video : store.getState().state.currentSong,
                            resuming: true,
                            progressMs: progress,
                            duration: duration,
                        }
                    });
                    break;
                }

            }
        })
        window.youtubePlayer = youtubePlayer;
        let element = document.getElementById("youtube-player-window");
        if (element !== null) element.style.visibility = "visible";
    }

    window.youtubePlayer.playVideo();
}

const requestPlay = async (id: string) => {
    const res: Promise<AxiosResponse<unknown, any>> = axios.get(`${process.env.API_LINK}/video/${id}`)
    const video = (await res).data;
    if (window.youtubePlayer !== undefined) {
            window.youtubePlayer.cueVideoById(id);
            window.youtubePlayer.playVideo();
            return;
    }
    throw new Error(youtubeIsUndefinedError);
}

const isResourceId = (obj: any): obj is gapi.client.youtube.ResourceId => {
    return (obj as gapi.client.youtube.ResourceId).videoId !== undefined;
}

export const youtubePlay = async (uri?: gapi.client.youtube.ResourceId | string) => {
    if (uri !== undefined) {
        if (isResourceId(uri)) {
            let resourceId: gapi.client.youtube.ResourceId = uri as gapi.client.youtube.ResourceId;
            if (resourceId.videoId)
                requestPlay(resourceId.videoId);
            return;
        }

        let uriString: string = uri as string;
        if (uriString)
            requestPlay(uriString);
        return;
    }
}


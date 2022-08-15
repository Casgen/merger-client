import YouTubePlayer from "youtube-player";
import Merger, { YoutubeOptions } from "../interfaces/Merger";
import axios, { AxiosResponse } from "axios";
import { store } from "../App";
import { ActionTypeState } from "../components/features/state/stateSlice";
import { mergerNextSong } from "./mergerUtils";

export const youtubeIsUndefinedError = "Youtube Player is undefined!";

export const setupYoutubePlayer = (track: gapi.client.youtube.Video | gapi.client.youtube.ResourceId | string) => {

	let videoId: string;

	if (isResourceId(track) && track.videoId) {
		videoId = track.videoId;
	} else if (isYoutubeVideo(track) && track.id) {
		videoId = track.id;
	} else {
		videoId = track as string;
	}

	if (window.youtubePlayer == null) {
		let youtubePlayer = YouTubePlayer('youtube-player-window', { ...YoutubeOptions, videoId: videoId });

		let container = document.getElementById("youtube-container");
		if (container) container.style.display = "block";

		let mainWindow: HTMLElement | null = document.getElementById("main-window");

		if (mainWindow !== null) {
			mainWindow.scrollTo(0, 0);
			mainWindow.style.overflowY = "hidden";
		}

		youtubePlayer.on("stateChange", async (event) => {
			let duration: number;
			let progress: number = await window.youtubePlayer.getCurrentTime() * 1000;

			duration = await window.youtubePlayer.getDuration() * 1000; 
			console.log(duration);

			switch (event.data) {
				case -1: {
					store.dispatch({
						type: ActionTypeState.STATE_CHANGE,
						payload: {
							currentPlayer: Merger.PlayerType.Youtube,
							...store.getState().state,
							ytState: -1
						}
					}
					);
					break;
				}
				case 0:
					mergerNextSong();
					break;
				case 2:
					store.dispatch({
						type: ActionTypeState.STATE_CHANGE, payload: {
							currentPlayer: Merger.PlayerType.Youtube,
							...store.getState().state,
							paused: true,
							resuming: false,
							progressMs: progress,
							ytState: 2
						}
					});
					break;
				case 1: {
					store.dispatch({
						type: ActionTypeState.STATE_CHANGE, payload: {
							currentPlayer: Merger.PlayerType.Youtube,
							...store.getState().state,
							paused: false,
							resuming: true,
							duration: duration,
							progressMs: progress,
							ytState: 1
						}
					});
					break;
				}

				case 3: {
					store.dispatch({
						type: ActionTypeState.STATE_CHANGE, payload: {
							...store.getState().state,
							currentPlayer: Merger.PlayerType.Youtube,
							paused: true,
							resuming: true,
							progressMs: progress,
							duration: duration,
							ytState: 3
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
	try {

		if (!id) throw new Error("Video or its ID is undefined!");

		let video: gapi.client.youtube.Video = (await getYoutubeVideo(id)).data;

		if (!window.youtubePlayer) {
			setupYoutubePlayer(id);
		} else {
			window.youtubePlayer.loadVideoById(id);
		}

		store.dispatch({
			type: ActionTypeState.STATE_CHANGE, payload: {
				...store.getState().state,
				currentPlayer: Merger.PlayerType.Youtube,
				currentSong: video,
				progressMs: 0
			}
		})


	} catch (e: unknown) {
		console.error(e)
	}
}

export const isResourceId = (obj: any): obj is gapi.client.youtube.ResourceId => {
	return (obj as gapi.client.youtube.ResourceId).videoId !== undefined;
}

export const isYoutubeVideo = (obj: any): obj is gapi.client.youtube.Video => {
	return (obj as gapi.client.youtube.Video).kind === "youtube#video";
}

export const youtubePlay = async (uri?: gapi.client.youtube.ResourceId | string) => {
	if (uri !== undefined) {
		if (isResourceId(uri)) {
			if (uri.videoId) requestPlay(uri.videoId);
			return;
		}

		if (uri) requestPlay(uri);
		return;
	}
	console.error("URI is undefined!");
}

export const youtubePause = () => {
	if (!window.youtubePlayer) return console.error("Coudln't pause! Youtube window is undefined!");

	window.youtubePlayer.pauseVideo();
}

export const getYoutubeVideo = (uri: string): Promise<AxiosResponse<gapi.client.youtube.Video>> => {
	return axios.get<gapi.client.youtube.Video>(`${process.env.REACT_APP_API_LINK}/youtube/video/${uri}`);
}

export const getYoutubePlaylist = (playlistId: string) => {
	return axios.get<gapi.client.youtube.Playlist>(`${process.env.REACT_APP_API_LINK}/youtube/playlist/${playlistId}`);
}

export const getPlaylistItems = (playlistId: string, maxResults?: number): Promise<AxiosResponse<Array<gapi.client.youtube.PlaylistItem>>> => {
	let url: string = `${process.env.REACT_APP_API_LINK}/youtube/playlist/${playlistId}/items`;
	if (maxResults) url = url.concat(`?max_results=${maxResults}`);

	return axios.get<Array<gapi.client.youtube.PlaylistItem>>(url);
}

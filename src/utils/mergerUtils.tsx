import Merger from "../interfaces/Merger";
import {
	isSpotifyTrackObject,
	isSpotifyTrackObjectFull,
	spotifyPause,
	spotifyPlay,
	spotifySeek,
	spotifySetVolume
} from "./spotifyUtils";
import { store } from "../App";
import { ActionTypeQueue } from "../components/features/queue/queueSlice";
import { ActionTypeState } from "../components/features/state/stateSlice";
import { isYoutubeVideo, youtubePause, youtubePlay } from "./youtubeUtils";
import axios from "axios";

export const mergerTogglePlayBack = () => {
	let state: Merger.PlayerState = store.getState().state;
	if (state.currentPlayer !== undefined) {
		if (state.currentPlayer === Merger.PlayerType.Spotify) {
			if (!state.paused) return spotifyPause();
			return spotifyPlay();
		}
		if (!state.paused) return window.youtubePlayer.pauseVideo();
		return window.youtubePlayer.playVideo();
	}
	throw new Error(initializationError);
}

export const mergerLoadAndPlay = async (track: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video | gapi.client.youtube.ResourceId | string) => {

	let state: Merger.PlayerState = store.getState().state;

	store.dispatch({ type: ActionTypeState.RESUME })

	if (isSpotifyTrackObject(track)) {

		if (state.currentPlayer === Merger.PlayerType.Youtube)
			window.youtubePlayer.stopVideo();

		if (!window.Spotify) throw new Error(initializationError);

		spotifyPlay([track.uri]);

		return;
	}
	if (state.currentPlayer === Merger.PlayerType.Spotify)
		axios.put(`${process.env.REACT_APP_API_LINK}/spotify/player/pause?device_id=${store.getState().deviceId}`);

	if (isYoutubeVideo(track))
		return youtubePlay(track.id);

	return youtubePlay(track);
}


export const mergerPrevSong = async () => {
	let state: Merger.PlayerState = store.getState().state;
	if (state.previousSong !== undefined) {

		if (isSpotifyTrackObjectFull(state.previousSong)) {
			if (!state.paused && state.currentPlayer === Merger.PlayerType.Youtube)
				youtubePause();
			spotifyPlay([state.previousSong.uri]);
		} else {
			if (!state.paused && state.currentPlayer === Merger.PlayerType.Spotify)
				spotifyPause();
			youtubePlay(state.previousSong.id);
		}

		/*This needs to be done in order to prevent unexpected behaviour, if I really depend on getting the value straight
		from the state, the value can't be guaranteed to be updated right away*/
		let oldIndex: number = store.getState().queue.counter - 1;
		store.dispatch({ type: ActionTypeQueue.DEC_QUEUE_COUNTER });

		let queue: Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video> = store.getState().queue.queue;

		store.dispatch({
			type: ActionTypeState.SET_PREV_AND_NEXT_SONG, payload: {
				previous: queue[oldIndex - 1],
				next: queue[1 + oldIndex]
			}
		})
	}
}

export const mergerNextSong = async () => {
	let state: Merger.PlayerState = store.getState().state;
	if (state.nextSong !== undefined) {
		if (isSpotifyTrackObjectFull(state.nextSong)) {
			if (!state.paused && state.currentPlayer === Merger.PlayerType.Youtube)
				youtubePause();
			spotifyPlay([state.nextSong.uri]);
		} else {
			if (!state.paused && state.currentPlayer === Merger.PlayerType.Spotify)
				spotifyPause();
			youtubePlay(state.nextSong.id);
		}

		let oldIndex: number = 1 + store.getState().queue.counter;
		store.dispatch({ type: ActionTypeQueue.INC_QUEUE_COUNTER });

		let queue: Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video> = store.getState().queue.queue;

		store.dispatch({
			type: ActionTypeState.SET_PREV_AND_NEXT_SONG, payload: {
				previous: queue[oldIndex - 1],
				next: queue[1 + oldIndex]
			}
		})
	}
};


export const mergerSetVolume = (value: number) => {
	if (store.getState().state.currentPlayer !== undefined) {
		if (store.getState().state.currentPlayer === Merger.PlayerType.Spotify)
			spotifySetVolume(value);

		if (window.youtubePlayer !== undefined)
			window.youtubePlayer.setVolume(value);
	}
}

export const mergerSeek = async (value: number): Promise<void> => {
	let state: Merger.PlayerState = store.getState().state;

	if (state.currentPlayer !== undefined) {
		if (state.currentPlayer === Merger.PlayerType.Spotify) {
			return spotifySeek(value);
		}
		return window.youtubePlayer.seekTo(Math.round(value / 1000), true);
	}
	throw new Error(initializationError);
}

export const addOtherSongsToQueuePlaylist = (uri: string, tracks: Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video>) => {

	let index: number = tracks.findIndex((element) => {
		if (isSpotifyTrackObject(element))
			return element.uri === uri;
		return element.id === uri;
	});


	store.dispatch({ type: ActionTypeQueue.SET_QUEUE, payload: { queue: tracks, counter: index } });

	store.dispatch({
		type: ActionTypeState.SET_PREV_AND_NEXT_SONG,
		payload: { next: tracks[1 + index], previous: tracks[index - 1] }
	});
}

export const addOtherSpotifySongsToQueueAlbum = (uri: string, tracks: SpotifyApi.TrackObjectSimplified[]) => {

	let index: number = tracks.findIndex((element) => element.uri === uri);

	let array: Array<string> = new Array<string>();

	for (let i = 0; i < tracks.length; i++) {
		array.push(tracks[i].uri);
	}

	store.dispatch({ type: ActionTypeQueue.SET_QUEUE, payload: { queue: array, counter: index } });

	store.dispatch({
		type: ActionTypeState.SET_PREV_AND_NEXT_SONG,
		payload: { next: array[1 + index], previous: array[index - 1] }
	});
}


export const initializationError: string = "State hasn't been initialized!";

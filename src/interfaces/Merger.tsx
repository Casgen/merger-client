import { Options, YouTubePlayer } from "youtube-player/dist/types";

namespace Merger {

	export interface SpotifyPlayer {
		spotify?: Spotify.Player,
		deviceId: string
	}


	export enum PlayerType {
		Youtube = 'Y',
		Spotify = 'S'
	}

	//BACKEND RELATED INTERFACES
	export interface Playlist {
		id?: number,
		name: string,
		creator: Merger.User,
		desc: string,
		tracks: Array<Merger.Song>
	}

	export interface User {
		id: number,
		username: string,
		email: string,
		password: string
		img?: string,
	}

	export interface Song {
		uri: string,
		type: PlayerType,
		object: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video
	}

	export interface Error {
		status?: number,
		message: string,
		stacktrace?: string,
	}

	export interface PlaylistFull {
		id?: number,
		creator: User,
		songs: Array<Song>
		title: string,
		desc: string
	}

	//--------------------------------------------------------
	/**
	 * @param ytState -1 = not started | 0 = ended | 1 = is playing | 2 = paused | 3 = loading | 5 = video cued
	 */

	export interface PlayerState {
		currentPlayer?: PlayerType.Spotify | PlayerType.Youtube,
		paused: boolean,
		previousSong?: gapi.client.youtube.Video | SpotifyApi.TrackObjectFull,
		currentSong?: gapi.client.youtube.Video | SpotifyApi.TrackObjectFull,
		nextSong?: gapi.client.youtube.Video | SpotifyApi.TrackObjectFull,
		progressMs?: number,
		duration?: number,
		pausedByUser?: boolean,
		ytState?: number
	}


	export interface Queue {
		queue: Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video>,
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

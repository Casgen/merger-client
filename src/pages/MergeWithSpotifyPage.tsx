import axios, { AxiosResponse } from "axios";
import React, { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { YoutubePlaylistSearchResult } from "../components/search/YoutubePlaylistSearchResult";
import { TextField } from "../components/TextField";
import { getUsersPlaylists } from "../utils/spotifyUtils";
import { getYoutubePlaylist } from "../utils/youtubeUtils";
import "../scss/mergeWithSpotify.scss";
import { RadioGroupSpotify } from "../components/primitive/RadioGroupSpotify";
import Merger from "../interfaces/Merger";

export const MergeWithSpotify: React.FC = () => {

	const { playlistId } = useParams<{ playlistId: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const history = useHistory();

	const [index, setIndex] = useState<number>();

	const [youtubePlaylist, setYoutubePlaylist] = useState<gapi.client.youtube.Playlist>();
	const [usersPlaylists, setUsersPlaylists] = useState<Array<SpotifyApi.PlaylistObjectSimplified>>();
	const [searchedPlaylists, setSearchedPlaylists] = useState<Array<SpotifyApi.PlaylistObjectSimplified>>();

	const [typingTimeout, setTypingTimeout] = useState<number>(0);
	const [orderValue, setOrderValue] = useState<Merger.Order>(Merger.Order.Random);
	const selected = useRef<SpotifyApi.PlaylistObjectSimplified | undefined>();

	const backgroundColor: CSSProperties = { backgroundColor: '#1e1e1e' };

	const handleSearch = (value: string) => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setTypingTimeout(setTimeout((time: string) => search(value), 500));
	}

	const search = async (value: string) => {
		try {
			let res = await axios.post<SpotifyApi.SearchResponse>(`${process.env.REACT_APP_API_LINK}/spotify/search?q=${value}`, {
				types: ["playlist"]
			})

			if (!res.data.playlists) throw new Error("Playlists are not defined!")

			setSearchedPlaylists(res.data.playlists.items);

		} catch (e: unknown) {
			console.error(e);
		}
	}

	const loadYoutubePlaylist = async () => {
		if (!playlistId) return console.error("Playlist id is undefined!");

		try {
			let res: AxiosResponse<gapi.client.youtube.Playlist> = await getYoutubePlaylist(playlistId);

			setYoutubePlaylist(res.data);

		} catch (e: unknown) {
			console.error("Failed to load a youtube playlist")
		}
	}

	const loadUsersPlaylists = async () => {
		try {
			const playlists = (await getUsersPlaylists()).data;

			setUsersPlaylists(playlists);

		} catch (e: unknown) {
			console.error("Failed to fetch user's playlists", e);
		}

	}

	const merge = async (e: FormEvent<HTMLFormElement>) => {

		e.preventDefault();

		if (!selected.current?.id) console.error("You haven't selected any spotify playlist");

		try {
			let playlistId = (await axios.put<{playlistId: number}>(`${process.env.REACT_APP_API_LINK}/merger/merge`, {
				spotifyId: selected.current?.id,
				youtubeId: youtubePlaylist?.id,
				order: orderValue
			}, { withCredentials: true })).data.playlistId;
		
			history.push(`/merger/playlist/${playlistId}`)

		} catch (e: unknown) {
			console.error(e);
		}

	}

	const selectTab = () => {
		selected.current = undefined;

		switch (index) {
			case 0: return (
				<div id="playlist-results">
					{
						usersPlaylists &&
						<RadioGroupSpotify objects={usersPlaylists} onSelect={handleSelect}>
						</RadioGroupSpotify>
					}
				</div>
			)
			case 1: return (
				<div id="search-window" >
					<TextField id="text-field" type="text" onChange={handleSearch} placeholder="Your search string" />
					<div id="playlist-results">
						{
							searchedPlaylists &&
							<RadioGroupSpotify objects={searchedPlaylists} onSelect={handleSelect}>
							</RadioGroupSpotify>
						}
					</div>
				</div>
			)
		}


	}

	const handleSelect = (obj: SpotifyApi.PlaylistObjectSimplified) => {
		selected.current = obj;
	}

	const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setOrderValue(parseInt(e.target.value) as Merger.Order);
	}

	useEffect(() => {
		loadUsersPlaylists();
		loadYoutubePlaylist();
	}, [playlistId])

	return (
		<div id="merge-with-spotify">
			<div id="lists">
				<div id="spotify-playlists">
					<div id="tabs">
						<div onClick={() => setIndex(0)} style={index === 0 ? backgroundColor : {}} id="users-playlists-tab">
							My Playlists
						</div>
						<div onClick={() => setIndex(1)} style={index === 1 ? backgroundColor : {}} id="search-tab">
							Search playlist
						</div>
					</div>
					{selectTab()}
				</div>
				<div id="youtube-playlist">
					{
						youtubePlaylist && <YoutubePlaylistSearchResult
							playlistId={youtubePlaylist?.id}
							img={youtubePlaylist?.snippet?.thumbnails?.default?.url}
							title={youtubePlaylist?.snippet?.title} />

					}
				</div>
			</div>
			<form onSubmit={merge}>
				<select value={orderValue} onChange={handleOrderSelect}>
					<option value={Merger.Order.Random}>Randomly</option>
					<option value={Merger.Order.SpotifyFirst}>Spotify first</option>
					<option value={Merger.Order.YoutubeFirst}>Youtube first</option>
				</select>
				<input type="submit" value="Merge"/>
			</form>
		</div>
	)
}

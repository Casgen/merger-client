
import axios, { AxiosResponse } from "axios";
import React, { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { YoutubePlaylistSearchResult } from "../components/search/YoutubePlaylistSearchResult";
import { TextField } from "../components/TextField";
import { getPlaylist } from "../utils/spotifyUtils";
import Merger from "../interfaces/Merger";
import { SpotifyPlaylistRow } from "../components/merger/SpotifyPlaylistRow";
import "../scss/mergeWithYoutube.scss";
import { RadioGroupYoutube } from "../components/primitive/RadioGroupYoutube";

export const MergeWithYoutube: React.FC = () => {

	const { playlistId } = useParams<{ playlistId: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const history = useHistory();

	const [spotifyPlaylist, setSpotifyPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified>();
	const [searchedPlaylists, setSearchedPlaylists] = useState<Array<gapi.client.youtube.SearchResult>>();

	const [typingTimeout, setTypingTimeout] = useState<number>(0);
	const [orderValue, setOrderValue] = useState<Merger.Order>(Merger.Order.Random);
	const selected = useRef<gapi.client.youtube.SearchResult | undefined>();

	const handleSearch = (value: string) => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setTypingTimeout(setTimeout((time: string) => search(value), 500));
	}

	const search = async (value: string) => {
		try {
			let res = await axios.post<gapi.client.youtube.SearchListResponse>(`${process.env.REACT_APP_API_LINK}/youtube/search?query=${value}`, {
				types: ["playlist"]
			})

			if (!res.data.items) throw new Error("Playlists are not defined!")

			setSearchedPlaylists(res.data.items)
		} catch (e: unknown) {
			console.error(e);
		}
	}

	const loadSpotifyPlaylist = async () => {
		if (!playlistId) return console.error("Playlist id is undefined!");

		try {
			let res: SpotifyApi.PlaylistObjectFull = (await getPlaylist(playlistId)).data;
			setSpotifyPlaylist(res);

		} catch (e: unknown) {
			console.error("Failed to load a youtube playlist")
		}
	}

	const merge = async (e: FormEvent<HTMLFormElement>) => {

		e.preventDefault();

		if (!selected.current?.id) return console.error("You haven't selected any epotify playlist");

		try {
			let playlistId = (await axios.put<{playlistId: number}>(`${process.env.REACT_APP_API_LINK}/merger/merge`, {
				youtubeId: selected.current?.id.playlistId,
				spotifyId: spotifyPlaylist?.id,
				order: orderValue
			}, { withCredentials: true })).data.playlistId;

			history.push(`/merger/playlist/${playlistId}`)

		} catch (e: unknown) {
			console.error(e);
		}

	}


	const handleSelect = (obj: gapi.client.youtube.SearchResult) => {
		selected.current = obj;
	}

	const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setOrderValue(parseInt(e.target.value) as Merger.Order);
	}

	useEffect(() => {
		loadSpotifyPlaylist();
	}, [playlistId])

	return (
		<div id="merge-with-youtube">
			<div id="lists">
				<div id="spotify-playlist">
					{spotifyPlaylist && <SpotifyPlaylistRow playlist={spotifyPlaylist} />}
				</div>
				<div id="search-window" >
					<TextField id="text-field" type="text" onChange={handleSearch} placeholder="your search string" />
					<div id="playlist-results">
						{
							searchedPlaylists && <RadioGroupYoutube objects={searchedPlaylists} onSelect={handleSelect}/>
						}
					</div>
				</div>
			</div>
			<form onSubmit={merge}>
				<select value={orderValue} onChange={handleOrderSelect}>
					<option value={Merger.Order.Random}>Randomly</option>
					<option value={Merger.Order.SpotifyFirst}>Spotify first</option>
					<option value={Merger.Order.YoutubeFirst}>Youtube first</option>
				</select>
				<input type="submit" value="Merge" />
			</form>
		</div>
	)
}

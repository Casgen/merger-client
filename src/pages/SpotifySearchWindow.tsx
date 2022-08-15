import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SearchBar } from '../components/search/SearchBar';
import Merger from '../interfaces/Merger';
import "../scss/spotifySearchWindow.scss";
import { PlaylistCollection } from '../components/collections/PlaylistCollection';
import { TrackCollection } from '../components/collections/TrackCollection';
import { ArtistCollection } from '../components/collections/ArtistCollection';
import { AlbumCollection } from '../components/collections/AlbumCollection';

export const SpotifySearchWindow: React.FC = () => {

	const [results, setResults] = useState<SpotifyApi.SearchResponse | null>(null);
	const [typingTimeout, setTypingTimeout] = useState<number>(0);

	const handleSearch = (value: string): void => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setTypingTimeout(setTimeout((time: string) => { search(value) }, 500));
	}

	const search = async (value: string) => {
		try {
			let res = await axios.post<SpotifyApi.SearchResponse>(`${process.env.REACT_APP_API_LINK}/spotify/search?q=${value}`, {
				types: ["album", "track", "episode", "playlist", "show", "artist"]
			})

			setResults(res.data);

			window.history.replaceState(null, '', `search?query=${value}`);

		} catch (e: unknown) {
			console.error(e);
		}
	}

	useEffect(() => {

		if (!window.location.search) return undefined;

		let query: string = decodeURIComponent(window.location.search.substring(1).split("=")[1]);

		search(query);
	}, [])

	return (
		<div id="spotify-search-window">
			<SearchBar type={Merger.PlayerType.Spotify} func={handleSearch}></SearchBar>
			{

				results !== null &&
				<div id="search-result-container">
					<h1>Albums</h1>
					{(results.albums && results.albums?.items.length > 0) &&
						<AlbumCollection albums={results.albums.items} />}

					<h1>Tracks</h1>
					{(results.tracks && results.tracks?.items.length > 0) &&
						<TrackCollection tracks={results.tracks.items} />}

					<h1>Artists</h1>
					{(results.artists && results.artists.items.length > 0) &&
						<ArtistCollection artists={results.artists?.items} />}

					<h1>Playlists</h1>
					{(results.playlists && results.playlists?.items.length > 0) &&
						<PlaylistCollection playlists={results.playlists.items} />}
				</div>
			}
		</div>
	)
}

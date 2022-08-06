import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { AlbumBlock } from '../components/album/AlbumBlock';
import { SearchBar } from '../components/search/SearchBar';
import { TrackRowMinimal } from '../components/TrackRowMinimal';
import Merger from '../interfaces/Merger';
import "../scss/spotifySearchWindow.scss";
import { ArtistBlock } from "../components/artist/ArtistBlock";
import { PlaylistBlock } from '../components/playlist/PlaylistBlock';

export const SpotifySearchWindow: React.FC = () => {

	const [results, setResults] = useState<SpotifyApi.SearchResponse | null>(null);
	const [typingTimeout, setTypingTimeout] = useState<number>(0);

	const handleSearch = (value: string): void => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setTypingTimeout(setTimeout((time: string) => search(value), 500));
	}

	const search = async (value: string) => {
		try {
			let res = await axios.post<SpotifyApi.SearchResponse>(`${process.env.REACT_APP_API_LINK}/spotify/search?q=${value}`, {
				types: ["album", "track", "episode", "playlist", "show", "artist"]
			})

			setResults(res.data);

		} catch (e: unknown) {
			console.error(e);
		}
	}

	return (
		<div id="spotify-search-window">
			<SearchBar type={Merger.PlayerType.Spotify} func={handleSearch}></SearchBar>
			{

				results !== null &&
				<div id="search-result-container">
					<h1>Albums</h1>
					{results.albums !== undefined && results.albums?.items.length > 0 &&
						<div id="albums">
							{
								results?.albums?.items.map((value: SpotifyApi.AlbumObjectSimplified): JSX.Element => {
									return <AlbumBlock showArtist={true} key={value.id} album={value} />
								})
							}
						</div>}

					<h1>Tracks</h1>
					{results.tracks !== undefined && results.tracks?.items.length > 0 &&
						<div id="tracks">
							{results?.tracks.items.map((value: SpotifyApi.TrackObjectFull): JSX.Element => {
								return <TrackRowMinimal showArtist={true} key={value.id} track={value} />
							})}
						</div>}
					<h1>Artists</h1>
					{results.artists !== undefined && results.artists.items.length > 0 &&
						<div id="artists">
							{results.artists.items.map((value: SpotifyApi.ArtistObjectFull): JSX.Element => {
								return <ArtistBlock artist={value} key={value.id} />
							})}
						</div>}
					<h1>Playlists</h1>
					{results.playlists !== undefined && results.playlists.items.length > 0 &&
						<div id="playlists">
							{results.playlists?.items.map((playlist: SpotifyApi.PlaylistObjectSimplified): JSX.Element => {
								return <PlaylistBlock playlist={playlist} key={playlist.id} />
							})}
						</div>
					}
				</div>
			}
		</div>
	)
}

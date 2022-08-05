import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUsersPlaylists } from '../../utils/spotifyUtils';

interface Props {
	display: string
}

export const SpotifyPlaylists: React.FC<Props> = (props: Props) => {

	const [playlists, setPlaylists] = useState<Array<SpotifyApi.PlaylistObjectSimplified>>();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const fetchPlaylists = async () => {
		try {
			const playlists = (await getUsersPlaylists()).data;

			setIsLoggedIn(true);
			setPlaylists(playlists);
			
		} catch (e: unknown) {
			console.error("Failed to fetch user's playlists", e);
		}
	}

	useEffect(() => {
		fetchPlaylists();
	}, [])

	return (
		<div id="spotify-playlists" style={{ display: props.display }}>
			{isLoggedIn ?
				playlists && playlists.map((playlist: SpotifyApi.PlaylistObjectSimplified): JSX.Element => {
					return <Link to={`/spotify/playlist/${playlist.id}`} key={playlist.id}>{playlist.name}</Link>
				}) : <p><a href={`${process.env.REACT_APP_API_LINK}/spotify/auth/login`}>Login</a> to view your spotify playlists!</p>
			}
		</div>
	)
}

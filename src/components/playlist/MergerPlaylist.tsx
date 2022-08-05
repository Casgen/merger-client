import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import Merger from "../../interfaces/Merger";

interface Props {
	display: string
}

export const MergerPlaylist: React.FC<Props> = (props: Props) => {

	const [playlists, setPlaylists] = useState<Merger.Playlist[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const fetchPlaylists = () => {
		axios.get<Merger.Playlist[]>(`${process.env.REACT_APP_API_LINK}/merger/getPlaylistsByUser`, { withCredentials: true }).then((res: AxiosResponse<Merger.Playlist[]>) => {
			setIsLoggedIn(true);
			if (res.data[0]) setPlaylists(res.data);
		}).catch((err: Merger.Error) => {
			if (err.status as number === 403) return setIsLoggedIn(false);
			console.error("Failed to fetch user's playlists", err);
		});
	}

	useEffect(() => {
		fetchPlaylists();
	}, [])

	return (
		<div id="merger-playlists" style={{ display: props.display }}>
			<Link to="/createPlaylist" id="create-playlist-link">Create a new playlist</Link>
			{console.log(playlists)}
			{ isLoggedIn ?
				playlists !== null && playlists.map((playlist: Merger.Playlist): JSX.Element => {
					return <Link to={`/merger/playlist/${playlist.id}`} key={playlist.id}>{playlist.title}</Link>
				}) :
				<p><Link to="/login">Login</Link> or<Link to={"/register"}>Sign up</Link> to create and view your merger playlists!</p>
			}
		</div>
	)
}

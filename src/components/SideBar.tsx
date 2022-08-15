import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Playlists } from "./playlist/Playlists";
import Merger from '../interfaces/Merger';
import { SidebarButton } from './SidebarButton';


export const SideBar: React.FC = () => {

	const [spotifyUserInfo, setSpotifyUserInfo] = useState<SpotifyApi.UserObjectPublic | undefined>();
	const [mergerUserInfo, setMergerUserInfo] = useState<Merger.User | undefined>();

	const fetchUserInfo = async () => {
		try {

			const spotify = await axios.get(`${process.env.REACT_APP_API_LINK}/spotify/me`);
			setSpotifyUserInfo(spotify.data as SpotifyApi.UserObjectPrivate);

			const merger: Merger.User = (await axios.get(`${process.env.REACT_APP_API_LINK}/merger/users/session`, { withCredentials: true })).data as Merger.User;
			setMergerUserInfo(merger);

		} catch (e: unknown) {
			console.log(e);
		}
	}

	useEffect(() => {
		fetchUserInfo();
	}, [])

	return (
		<div id="side-bar">
			<div id="buttons">
				{(spotifyUserInfo || mergerUserInfo) ? 
					<>
						<SidebarButton 
							img="/images/defaultUser.svg" 
							link="/account" text="Accounts" />
						<SidebarButton 
							img="/images/addimg.png" 
							link="/createPlaylist" 
							text="Create Playlist" />
					</>
					: <SidebarButton 
						img="/images/defaultUser.svg" 
						link="/login" 
						text="Login" />}
				{spotifyUserInfo && 
					<SidebarButton 
						text="Search" 
						img="/images/search.png" 
						link="/spotify/search" />}
				{mergerUserInfo && 
					<SidebarButton 
						text="Liked songs"
						img="/images/heart.png"
						link="/likedSongs" />}
			</div>
			<Playlists />
		</div>
	)
}

export default SideBar;

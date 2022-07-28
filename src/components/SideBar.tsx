import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react'
import AccountBar from './account/AccountBar';
import { Login } from './Login';
import { Playlists } from "./playlist/Playlists";
import { Link } from 'react-router-dom';


export const SideBar: React.FC = () => {

	const [userInfo, setUserInfo] = useState<SpotifyApi.UserObjectPublic | undefined>();

	async function fetchUserInfo() {
		const response: Promise<AxiosResponse<SpotifyApi.UserObjectPrivate>> = axios.get(`${process.env.REACT_APP_API_LINK}/spotify/me`);
		setUserInfo((await response).data);
	}

	const accountComp = (): JSX.Element => {
		if (userInfo !== undefined && userInfo.display_name) {
			if (userInfo.images !== undefined && userInfo.images.length > 0) {
				return <AccountBar src={userInfo.images[0].url} name={userInfo.display_name}></AccountBar>;
			}
			return <AccountBar src="/images/defaultUser.svg" name={userInfo.display_name}></AccountBar>
		}
		return <Login></Login>;
	}

	useEffect(() => {
		fetchUserInfo();
	}, [])

	return (
		<div id="side-bar">
			{accountComp()}
			<Link id="search-button" to="/spotify/search">
				<div>
					<img src="/images/search.png" alt="Wasn't found!"></img>
				</div>
				<h3>Search</h3>
			</Link>
			<Link id="liked-songs-button" to="/likedSongs">
				<div>
					<img src="/images/heart.png" alt="Wasn't found!"></img>
				</div>
				<h3>Liked songs</h3>
			</Link>
			<Playlists />
		</div>
	)
}

export default SideBar;

import axios from "axios";
import { useEffect, useState } from "react"
import Merger from "../interfaces/Merger";
import "../scss/pages/accountPage.scss"

export const AccountPage: React.FC = () => {

	const [spotifyUserInfo, setSpotifyUserInfo] = useState<SpotifyApi.UserObjectPublic | undefined>();
	const [mergerUserInfo, setMergerUserInfo] = useState<Merger.User | undefined>();

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {

				const spotify: SpotifyApi.UserObjectPrivate = (await axios.get(`${process.env.REACT_APP_API_LINK}/spotify/me`)).data as SpotifyApi.UserObjectPrivate;
				if (spotify.display_name)
					setSpotifyUserInfo(spotify);

				const merger: Merger.User = (await axios.get(`${process.env.REACT_APP_API_LINK}/merger/users/session`, { withCredentials: true })).data as Merger.User;
				setMergerUserInfo(merger);

			} catch (e: unknown) {
				console.error(e);
			}
		}

		fetchUserInfo();
	}, [])

	return (
		<div id="account-page">
			<div id="merger">
				<img id="merger-img" src="/images/mergericon.png" alt="Merger icon" />
				{mergerUserInfo ?
					<>
						<img id="merger-profile" src={mergerUserInfo?.img ? mergerUserInfo.img : "/images/artistimg.png"} alt="Account img" />
						<div className="username">
							<h4>Username: </h4><h4>{mergerUserInfo?.username}</h4>
						</div>
						<a className="logout-btn" href={`${process.env.REACT_APP_API_LINK}/merger/users/logout`}>Log out</a>
					</> :
					<>
						<h1>You are not logged into Merger!</h1>
						<a className="login-btn" href={`/login`}>
							Login
						</a>
					</>
				}
			</div>
			<div id="spotify">
				<img id="spotify-img" src="/images/spotify.png" alt="Merger icon" />
				{spotifyUserInfo ?
					<>
						<img id="spotify-profile" src={spotifyUserInfo.images ? spotifyUserInfo.images[0].url : "/images/artistimg.png"} alt="Account img" />
						<div className="username">
							<h4>Username: </h4><h4>{spotifyUserInfo.display_name}</h4>
						</div>
						<a className="logout-btn" href={`${process.env.REACT_APP_API_LINK}/spotify/me/logout`}>Log out</a>
					</>
					: <>
						<h1>You are not logged into Spotify!</h1>
						<a className="login-btn" href={`${process.env.REACT_APP_API_LINK}/spotify/auth/login`}>
							Login
						</a>
					</>
				}
			</div>
		</div>
	)
}

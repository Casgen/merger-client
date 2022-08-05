import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import "../../scss/playerInfoContainer.scss";
import { useAppSelector } from "../hooks";
import { rootState } from "../../App";
import { isSpotifyTrackObjectFull, splitSpotifyUri } from "../../utils/spotifyUtils";
import { trimString } from '../../utils/utils';


const InfoPlayerContainer: React.FC = () => {

	const currentSong = useAppSelector(rootState).state.currentSong;

	const handleInfo = (): JSX.Element => {
		if (currentSong !== undefined) {
			if (isSpotifyTrackObjectFull(currentSong)) {
				return <>
					<img src={currentSong.album.images[0].url} alt="Error"></img>
					<div id="headers-container">
						<h3 id="song-name">{currentSong.name}</h3>
						{currentSong.artists.map((value: Spotify.Artist, index: number): JSX.Element => {
							if (index === 0) return <Link to={`/spotify/artist/${splitSpotifyUri(value.uri)}`} id="artist"
								key={value.uri}>{value.name}</Link>;
							return <Link to={splitSpotifyUri(value.uri)} id="artist" key={value.uri}>, {value.name}</Link>
						})}
					</div>
				</>
			}
			return <>
				<img style={{width: '100px', height: '75px'}}src={currentSong.snippet?.thumbnails?.default?.url} alt="Error"></img>
				<div id="headers-container">
					{currentSong.snippet?.title && <h3 id="song-name">{trimString(currentSong.snippet?.title,22)}</h3>}
					<h4 id="artist">{currentSong.snippet?.channelTitle}</h4>
				</div>
			</>
		}
		return <></>
	}

	useEffect(() => { }, [currentSong])

	return (
		<div id="player-info-container">
			{handleInfo()}
		</div>
	)
}

export default InfoPlayerContainer

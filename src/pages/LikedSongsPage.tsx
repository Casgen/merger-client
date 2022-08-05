import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpotifyTrackRow } from "../components/player/SpotifyTrackRow";
import { TrackListHeader } from "../components/player/TrackListHeader";
import { YoutubeTrackRow } from "../components/player/YoutubeTrackRow";
import { addOtherSongsToQueuePlaylist, mergerLoadAndPlay } from "../utils/mergerUtils";
import { isSpotifyTrackObject } from "../utils/spotifyUtils";
import "../scss/likedSongsPage.scss";

export const LikedSongsPage: React.FC = () => {

	const { id } = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video>>([]);

	const handlePlay = (track: SpotifyApi.TrackObjectSimplified | gapi.client.youtube.Video) => {
		if (isSpotifyTrackObject(track)) {
			addOtherSongsToQueuePlaylist(track.uri, tracks);
		} else if (track.id){
			addOtherSongsToQueuePlaylist(track.id, tracks);
		}

		mergerLoadAndPlay(track);
	}

	const fetchLikedSongs = () => {
		axios.get<Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video>>
			(`${process.env.REACT_APP_API_LINK}/merger/getLikedSongsByUser`, { withCredentials: true })
			.then((res) => {
				setTracks(res.data)
			}).catch((err) => {
				console.error("failed to fetch liked songs", err);
			})
	}

	const generateRows = (value: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video): JSX.Element => {
		if (isSpotifyTrackObject(value))
			return <SpotifyTrackRow showAlbum={true} handleOnClick={handlePlay} track={value} key={value.uri} />

		return <YoutubeTrackRow key={value.id} video={value} handleOnClick={handlePlay} />
	}

	useEffect(() => {
		fetchLikedSongs()
	}, [id])

	return (
		<div id="liked-songs-page">
			<h1>Liked songs</h1>
			<TrackListHeader />
			{tracks.map(generateRows)}
		</div>
	)
}

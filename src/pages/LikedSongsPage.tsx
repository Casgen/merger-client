import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpotifyTrackRow } from "../components/player/SpotifyTrackRow";
import { TrackListHeader } from "../components/player/TrackListHeader";
import { YoutubeTrackRow } from "../components/player/YoutubeTrackRow";
import Merger from "../interfaces/Merger";
import { addOtherSongsToQueuePlaylist, mergerLoadAndPlay } from "../utils/mergerUtils";
import { isSpotifyTrackObject } from "../utils/spotifyUtils";
import "../scss/likedSongsPage.scss";

export const LikedSongsPage: React.FC = () => {

	const { id } = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video>>([]);

	const handlePlay = (track: SpotifyApi.TrackObjectSimplified | gapi.client.youtube.Video) => {
		if (isSpotifyTrackObject(track)) {
			addOtherSongsToQueuePlaylist(track.uri, tracks);
			mergerLoadAndPlay(track);
			return;
		}

		if (track.id) {
			addOtherSongsToQueuePlaylist(track.id, tracks);
			mergerLoadAndPlay(track);
			return;
		}
	}

	const fetchLikedSongs = () => {
		axios.get<Merger.Song[]>(`${process.env.REACT_APP_API_LINK}/merger/getLikedSongsByUser`,{withCredentials: true})
			.then((res: AxiosResponse<Merger.Song[]>) => {
				setTracks(res.data.map((value: Merger.Song) => {
					if (isSpotifyTrackObject(value.object))
						return value.object;
					return value.object as gapi.client.youtube.Video;
				}));
			}).catch((err) => {
				console.error("failed to fetch liked songs", err);
			})
	}

	const generateRows = (value: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video): JSX.Element => {
		if (isSpotifyTrackObject(value))
			return <SpotifyTrackRow showAlbum={true} handleOnClick={handlePlay} track={value} key={value.uri}/>

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

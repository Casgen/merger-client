import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerHeader } from "../components/player/PlayerHeader";
import { SpotifyTrackRow } from "../components/player/SpotifyTrackRow";
import { TrackListHeader } from "../components/player/TrackListHeader";
import { YoutubeTrackRow } from "../components/player/YoutubeTrackRow";
import Merger from "../interfaces/Merger";
import "../scss/playlistWindow.scss";
import { addOtherSongsToQueuePlaylist, mergerLoadAndPlay } from "../utils/mergerUtils";
import { isSpotifyTrackObject } from "../utils/spotifyUtils";
import { generateRandomString } from "../utils/utils";

export const MergerPlaylistPage: React.FC = () => {


	const { id } = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const [playlist, setPlaylist] = useState<Merger.PlaylistFull>();
	const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectFull | gapi.client.youtube.Video>>([]);

	const handlePlay = (track: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video) => {
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

	const loadPlaylist = async () => {
		try {

			let playlistRes = (await axios.get<Merger.PlaylistFull>(`${process.env.REACT_APP_API_LINK}/merger/playlist/${id}`, { withCredentials: true })).data as Merger.PlaylistFull;
			setPlaylist(playlistRes);	

			if (playlistRes.tracks) {
				setTracks(playlistRes.tracks);
				return;
			}

			setTracks([]);
		} catch (e: unknown) {
			console.error(e);
		}
	}

	const generateRows = (value: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video, index: number): JSX.Element | null => {
		if (isSpotifyTrackObject(value))
			return <SpotifyTrackRow img={value.album.images[2].url} showArtist={true} showLike={true} album={value.album} onClick={handlePlay} track={value} key={generateRandomString(14)} /> /* stylelint-disable-line react/jsx-no-undef */ /* stylelint-disable-line react/jsx-no-undef */

		return <YoutubeTrackRow showLike={true} key={generateRandomString(14)} video={value} handleOnClick={handlePlay} /> /* stylelint-disable-line react/jsx-no-undef */
	}

	useEffect(() => {
		loadPlaylist();
	}, [id])

	return (
		<div id="playlist-window">
			<PlayerHeader title={playlist?.title} creator={playlist?.creator.username} desc={playlist?.desc} numOfTracks={playlist?.tracks?.length}/>
			<div id="merger-playlist">
				<TrackListHeader />
				{tracks.map(generateRows)}
			</div>
		</div>
	)
}

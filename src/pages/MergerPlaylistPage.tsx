import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerHeader } from "../components/player/PlayerHeader";
import { SpotifyTrackRow } from "../components/player/SpotifyTrackRow";
import { TrackListHeader } from "../components/player/TrackListHeader";
import { YoutubeTrackRow } from "../components/player/YoutubeTrackRow";
import Merger from "../interfaces/Merger";
import { addOtherSongsToQueuePlaylist, mergerLoadAndPlay } from "../utils/mergerUtils";
import { isSpotifyTrackObject } from "../utils/spotifyUtils";
import { generateRandomString } from "../utils/utils";

export const MergerPlaylistPage: React.FC = () => {


	const { id } = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const [playlist, setPlaylist] = useState<Merger.Playlist | undefined>();
	const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectSimplified | gapi.client.youtube.Video>>([]);

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
		let uri: string[] | undefined = id?.split(":");

		if (uri !== undefined) {

			let res: Promise<AxiosResponse<Merger.Playlist>> = axios.get(`${process.env.REACT_APP_API_LINK}/merger/playlist/${id}`);

			let playlist: Merger.Playlist = (await res).data;

			setPlaylist(playlist);

			let arrayOfTracks: Array<SpotifyApi.TrackObjectSimplified | gapi.client.youtube.Video> = [];

			if (playlist !== undefined) {
				playlist.tracks.forEach((item: Merger.Song) => {
					if (isSpotifyTrackObject(item.object))
						return arrayOfTracks.push(item.object);
					return arrayOfTracks.push(item.object as gapi.client.youtube.Video);
				})

				setTracks(arrayOfTracks);
			}
		}
	}

	const generateRows = (value: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video, index: number): JSX.Element | null => {
		if (isSpotifyTrackObject(value))
			return <SpotifyTrackRow showAlbum={true} handleOnClick={handlePlay} track={value} key={generateRandomString(14)} /> /* stylelint-disable-line react/jsx-no-undef */ /* stylelint-disable-line react/jsx-no-undef */

		return <YoutubeTrackRow key={generateRandomString(14)} video={value} handleOnClick={handlePlay} /> /* stylelint-disable-line react/jsx-no-undef */
	}

	useEffect(() => {
		loadPlaylist();
	}, [id])

	return (
		<div>
			<PlayerHeader src="#" title={playlist?.name} creator={playlist?.creator.username} />
			<div id="merger-playlist">
				<TrackListHeader />
				{generateRows}
			</div>
		</div>
	)
}

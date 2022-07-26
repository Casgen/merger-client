import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerHeader } from "../components/player/PlayerHeader";
import { PlayerTable } from "../components/player/PlayerTable";
import Merger from "../interfaces/Merger";
import { isSpotifyTrackObject } from "../utils/spotifyUtils";

export const MergerPlaylistPage: React.FC = () => {


	const { id } = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const [playlist, setPlaylist] = useState<Merger.Playlist | undefined>();
	const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectSimplified | gapi.client.youtube.Video>>();


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

	useEffect(() => {
		loadPlaylist();
	}, [id])

	return (
		<div id="merger-playlist">
			<PlayerHeader title={playlist?.name} creator={playlist?.creator.username} src={"#"}  />
			<PlayerTable  content
		</div>
	)
}

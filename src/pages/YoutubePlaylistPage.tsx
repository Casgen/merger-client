import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YoutubeTrackRow } from "../components/player/YoutubeTrackRow";
import { addOtherSongsToQueuePlaylist, mergerLoadAndPlay } from "../utils/mergerUtils";
import "../scss/playlists/youtubePlaylistPage.scss";import { generateRandomString } from "../utils/utils";
import { getYoutubePlaylist } from "../utils/youtubeUtils";


export const YoutubePlaylistPage: React.FC = () => {

	const { id } = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
	const [playlist, setPlaylist] = useState<gapi.client.youtube.Playlist>();
	const [playlistVideos, setPlaylistVideos] = useState<Array<gapi.client.youtube.Video>>();


	const handlePlay = (item: gapi.client.youtube.Video) => {

		if (!item.id) return console.error("item is undefined!");

		const slicedArray = playlistVideos?.slice(

			//Have to watch out. that found id has to be there in order to add the played song as currently played.
			playlistVideos?.findIndex(video => video.id === item.id)
		)

		if (!slicedArray) return console.error("Sliced array is undefined!");

		addOtherSongsToQueuePlaylist(item.id, slicedArray);

		mergerLoadAndPlay(item);

	}

	const loadPlaylist = async () => {

		if (!id) return console.error("Id is undefined!");

		try {
			const playlist: AxiosResponse<gapi.client.youtube.Playlist> = await getYoutubePlaylist(id);
			setPlaylist(playlist.data);

			const videos: AxiosResponse<Array<gapi.client.youtube.Video>> = await axios.get(`${process.env.REACT_APP_API_LINK}/youtube/playlist/${id}/videos`);
			return setPlaylistVideos(videos.data);

		} catch (e: unknown) {
			return console.error(e);
		}

	}

	useEffect(() => {
		loadPlaylist()
	}, [id])

	return (
		<div id="youtube-playlist-window">
			<div id="header">
				<div id="thumbnail">
					<img src={playlist?.snippet?.thumbnails?.default?.url} alt="Couldn't load" />
				</div>
				<div id="details">
					<h2 id="title">{playlist?.snippet?.title}</h2>
					<h3 id="channel-title">{playlist?.snippet?.channelTitle}</h3>
					<p id="desc">{playlist?.snippet?.description}</p>
				</div>
			</div>
			<div id="video-list">
				{playlistVideos && playlistVideos?.length > 0 ?
					playlistVideos?.map((video: gapi.client.youtube.Video) => {
						return <YoutubeTrackRow key={video.id + generateRandomString(2)} video={video} handleOnClick={handlePlay} showLike={true} />
					}) : <h1>No videos have been added yet...</h1>

				}
			</div>
		</div>
	)
}

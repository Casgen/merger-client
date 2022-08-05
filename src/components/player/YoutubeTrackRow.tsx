import React, { useState } from 'react'
import { convertStringToDuration } from '../../utils/utils';
import { ContextMenuTrigger } from "react-contextmenu";
import { htmlUnescape } from "escape-goat";
import { TrackContextMenu } from '../contextmenu/TrackContextMenu';
import axios from 'axios';
import { ActionTypeQueue } from '../features/queue/queueSlice';
import { store } from '../../App';
import Merger from '../../interfaces/Merger';
import "../../scss/track/youtubeTrackRow.scss";

interface Props {
	video: gapi.client.youtube.Video,
	showLike?: boolean,
	handleOnClick: Function
}

export const YoutubeTrackRow: React.FC<Props> = ({ video, handleOnClick }: Props) => {

	const [isLikeHovered, setIsLikeHovered] = useState<boolean>(false);

	// Have to do it like this. for some reason if I declare that, the function should be executed right in the onClick
	// listener, the function is executed when rendered either way
	const handleClick = () => {
		handleOnClick(video);
	}

	const likeTrack = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

		e.stopPropagation(); // this function prevents the event from bubbling up the element's parents

		try {
			axios.put(`${process.env.REACT_APP_API_LINK}/merger/likeTrack`, {uri: video.id}, { withCredentials: true });
		} catch (e: unknown) {
			console.error(e)
		}
	}


	const handleAddToQueue = () => store.dispatch({ type: ActionTypeQueue.ADD_SONG, payload: video })

	const handleAddToPlaylist = async (playlist: Merger.Playlist) => {

		try {

			axios.put(`${process.env.REACT_APP_API_LINK}/merger/addToPlaylist`, {
				playlistId: playlist.id,
				track: video,
			})

		} catch (e: unknown) {
			console.error("failed to add a youtube video to playlist!", e);
		}
	}

	const fill = () => setIsLikeHovered(true);
	const drain = () => setIsLikeHovered(false);

	return (
		<>
			<ContextMenuTrigger id={`track-context-${video.id}`}>
				<div onClick={handleClick} className="youtube-track-row">
					<div className="title">
						<img src={video.snippet?.thumbnails?.default?.url} alt="Err"></img>
						<h5>{htmlUnescape(video.snippet?.title as string)}</h5>
					</div>
					<div className="channel">
						{video.snippet?.channelTitle}
					</div>
					<div className="blank-album"></div>
					<div className="duration">
						{video.contentDetails?.duration && convertStringToDuration(video.contentDetails.duration)}
					</div>
					<div className="like">
						<img src={isLikeHovered ? "/images/heartFilledYoutube.png" : "/images/heartYoutube.png"}
							onMouseOver={fill}
							onMouseOut={drain}
							onClick={likeTrack}
							alt="Heart"
						/>
					</div>
				</div>
			</ContextMenuTrigger>
			<TrackContextMenu id={`track-context-${video.id}`} onAddToQueue={handleAddToQueue} onAddToPlaylist={handleAddToPlaylist} />
		</>
	)
}

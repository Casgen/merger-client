import React, { useState } from 'react'
import { convertStringToDuration } from '../../utils/utils';
import { ContextMenuTrigger } from "react-contextmenu";
import { VideoContextMenu } from "../contextmenu/VideoContextMenu";
import { htmlUnescape } from "escape-goat";
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
						<img src={isLikeHovered ? "/images/heartFilledYoutube.png" : "/images/heartYoutube.png"} onMouseOver={fill} onMouseOut={drain} alt="couldn't load!" />
					</div>
				</div>
			</ContextMenuTrigger>
			<VideoContextMenu id={`track-context-${video.id}`} video={video} />
		</>
	)
}

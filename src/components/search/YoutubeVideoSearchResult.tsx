import { htmlUnescape } from "escape-goat";
import { ContextMenuTrigger } from "react-contextmenu";
import axios, { AxiosResponse } from "axios";
import { store } from "../../App";
import { ActionTypeQueue } from "../features/queue/queueSlice";
import { getYoutubeVideo } from "../../utils/youtubeUtils";
import "../../scss/search/youtubeVideoSearchResult.scss";
import { useState } from "react";
import { mergerLoadAndPlay } from "../../utils/mergerUtils";
import Merger from "../../interfaces/Merger";
import { TrackContextMenu } from "../contextmenu/TrackContextMenu";

interface Props {
	item: gapi.client.youtube.SearchResult,
	playVideo: (uri: gapi.client.youtube.ResourceId) => void;
}


export const YoutubeVideoSearchResult: React.FC<Props> = ({ item, playVideo }: Props) => {

	const [isLikeHovered, setIsLikeHovered] = useState<boolean>(false);

	const fill = () => setIsLikeHovered(true);
	const drain = () => setIsLikeHovered(false);

	const handleClick = () => {
		if (!item.id?.videoId) return console.log("Failed to play a video. ResourceId is Undefined!");

		mergerLoadAndPlay(item.id.videoId);
	}

	const likeVideo = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

		e.stopPropagation(); // this function prevents the event from bubbling up the element's parents

		try {
			axios.put(`${process.env.REACT_APP_API_LINK}/merger/likeTrack`, {uri: item.id?.videoId}, { withCredentials: true });
		} catch (e: unknown) {
			console.error(e)
		}
	}

	const handleAddToPlaylist = async (playlist: Merger.PlaylistFull) => {
		try {
			console.log(playlist.id)
			axios.put(`${process.env.REACT_APP_API_LINK}/merger/addToPlaylist`, {
				playlistId: playlist.id,
				trackId: item.id?.videoId
			}, { withCredentials: true })
		} catch (e: unknown) {
			console.error("Failed to add a track to playlist", e);
		}
	}

	const handleAddToQueue = () => {
		if (!item.id?.videoId) return console.log("Failed to play a video. videoId is undefined!");

		getYoutubeVideo(item.id?.videoId).then((res: AxiosResponse<gapi.client.youtube.VideoListResponse>) => {
			if (res.data && res.data.items) {
				store.dispatch({ type: ActionTypeQueue.ADD_SONG, payload: res.data.items[0] })
				return;
			}

			console.error("Data or an item is undefined!")

		}).catch((err) => {
			console.error("failed to fetch a video for adding to queue!", err)
		})
	}

	return (
		//TODO: Only results in videos, next time show also channels
		item.id?.videoId ?
			<>
				<ContextMenuTrigger id={`video-${item.id.videoId as string}`}>
					<div className="youtube-video" onClick={handleClick}>
						<div className="thumbnail-div">
							<img src={item.snippet?.thumbnails?.medium?.url} alt="Error!" />
						</div>
						<div className="details">
							<h2>{htmlUnescape(item.snippet?.title as string)}</h2>
							<p>{item.snippet?.description}</p>
						</div>
						<div className="like">
							<img onClick={likeVideo}
								src={isLikeHovered ? "/images/heartFilledYoutube.png" : "/images/heartYoutube.png"}
								onMouseOver={fill}
								onMouseOut={drain}
								alt="Couldn't load" />
						</div>
					</div>
				</ContextMenuTrigger>
				<TrackContextMenu onAddToPlaylist={handleAddToPlaylist} onAddToQueue={handleAddToQueue} id={`video-${item.id.videoId as string}`} />
			</> :
			<h2>Error! couldn't load a search result!</h2>

	)
}

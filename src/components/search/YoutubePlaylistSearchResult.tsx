import { htmlUnescape } from "escape-goat";
import { Link, useHistory } from "react-router-dom";
import "../../scss/search/youtubePlaylistSearchResult.scss";
import { getPlaylistItems } from "../../utils/youtubeUtils";
import { useEffect, useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem, SubMenu } from "react-contextmenu";
import axios from "axios";

interface Props {
	playlistId: string | undefined,
	title: string | undefined,
	img: string | undefined
}


export const YoutubePlaylistSearchResult: React.FC<Props> = ({ playlistId, title, img}: Props) => {

	const history = useHistory()

	const [items, setItems] = useState<Array<gapi.client.youtube.PlaylistItem>>([]);

	const loadItems = async () => {

		if (!playlistId)
			return console.error("playlistId is undefined!");

		try {
			let resItems: Array<gapi.client.youtube.PlaylistItem> = (await getPlaylistItems(playlistId, 2)).data;

			return setItems(resItems.slice(0, 2));

		} catch (e: unknown) {
			return console.error(e);
		}
	}


	const mergeWithPlaylist = () =>	history.push(`/merger/mergeWithSpotify/${playlistId}`)

	useEffect(() => {
		loadItems()
	}, [])



	return (
		playlistId ?
			<>
				<ContextMenuTrigger id={`context-playlist-${playlistId}`}>
					<Link to={`/youtube/playlist/${playlistId}`} className="youtube-playlist">
						<div className="thumbnail-div">
							<img src={img} alt="Error!"></img>
							<h6>P</h6>
						</div>
						<div className="details">
							<div className="title">
								<h2>{title && htmlUnescape(title)}</h2>
							</div>
							<div className="items">
								{items.map((item): JSX.Element => {
									return <h6>{item.snippet?.title}</h6>
								})}
							</div>
						</div>
					</Link>
				</ContextMenuTrigger>
				<ContextMenu id={`context-playlist-${playlistId}`}>
					<MenuItem onClick={mergeWithPlaylist}>
						Combine with ...
					</MenuItem>
				</ContextMenu>
			</> :

			<h2>Error! couldn't load a search result!</h2>

	)
}

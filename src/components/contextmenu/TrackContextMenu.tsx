import React, { useState } from "react";
import { ContextMenu, MenuItem, SubMenu } from "react-contextmenu";
import "../../scss/track/trackContextMenu.scss";
import axios, { AxiosResponse } from "axios";
import Merger from "../../interfaces/Merger";

interface Props {
	id: string,
	onAddToQueue: Function,
	onAddToPlaylist?: {(data: Merger.Playlist): void} | Function
}

export const TrackContextMenu: React.FC<Props> = (props: Props) => {

	const [playlists, setPlaylists] = useState<Array<Merger.Playlist>>([]);

	const loadPlaylists = async () => {
		try {
			let res: Promise<AxiosResponse<Array<Merger.Playlist>>> = axios.get(`${process.env.REACT_APP_API_LINK}/merger/getPlaylistsByUser`, { withCredentials: true })

			setPlaylists((await res).data);

		} catch (e: unknown) {
			console.error("failed to fetch playlists!", e);
		}
	}

	const handlePlaylistClick = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>, data: Merger.Playlist) => {
		if (props.onAddToPlaylist) props.onAddToPlaylist(data);
	}

	const handleClick = () => props.onAddToQueue();

	return (
		<ContextMenu id={props.id}>
			<MenuItem onClick={handleClick}>
				Add to queue
			</MenuItem>
			<SubMenu onClick={loadPlaylists} preventCloseOnClick={true} title="Add to playlist">
				{
					playlists.length > 0 &&
					playlists.map((value: Merger.Playlist) => {
						return <MenuItem onClick={handlePlaylistClick} data={value} key={value.id}>
							{value.title}
						</MenuItem>
					})
				}
			</SubMenu>
		</ContextMenu>
	)
}

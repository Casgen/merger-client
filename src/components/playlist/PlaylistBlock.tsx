
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { trimString } from '../../utils/utils';
import "../../scss/playlists/PlaylistBlock.scss";
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

interface Props {
	playlist: SpotifyApi.PlaylistObjectSimplified;
}

export const PlaylistBlock: React.FC<Props> = ({ playlist }: Props) => {

	const history = useHistory();

	const mergeWithPlaylist = () =>	history.push(`/merger/mergeWithYoutube/${playlist.id}`)

	return (
		<>
			<ContextMenuTrigger id={`playlist-${playlist.id}`}>
				<div className="playlist-block">
					<img src={playlist.images[0].url} alt="Error loading!"></img>
					<div>
						<Link className='playlist-title' to={`/spotify/playlist/${playlist.id}`}>{trimString(playlist.name, 22)}</Link>
						<div>
							{playlist.owner.display_name}
						</div>
					</div>
				</div>
			</ContextMenuTrigger >
			<ContextMenu id={`playlist-${playlist.id}`}>
				<MenuItem onClick={mergeWithPlaylist}>
					Combine with...
				</MenuItem>
			</ContextMenu>
		</>
	)
}

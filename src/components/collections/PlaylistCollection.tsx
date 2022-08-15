import React from "react";
import { PlaylistBlock } from "../playlist/PlaylistBlock";

interface PlaylistCollectionProps {
	playlists: Array<SpotifyApi.PlaylistObjectSimplified>,
}

export const PlaylistCollection: React.FC<PlaylistCollectionProps> = ({ playlists }: PlaylistCollectionProps) => {
	return (
		<div id="playlists">
			{playlists?.map((playlist: SpotifyApi.PlaylistObjectSimplified): JSX.Element => {
				return <PlaylistBlock playlist={playlist} key={playlist.id} />
			})}
		</div>
	)
}

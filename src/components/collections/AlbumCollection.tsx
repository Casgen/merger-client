import React from "react";
import { AlbumBlock } from "../album/AlbumBlock";

interface AlbumCollectionProps {
	albums: Array<SpotifyApi.AlbumObjectSimplified>,
	showArtists?: boolean
}

export const AlbumCollection: React.FC<AlbumCollectionProps> = ({ albums, showArtists }: AlbumCollectionProps) => {
	return (
		<div id="albums">
			{albums.map((value: SpotifyApi.AlbumObjectSimplified): JSX.Element => {
				return <AlbumBlock showArtist key={value.id} album={value} />
			})}
		</div>
	)
}


import React from "react";
import { ArtistBlock } from "../artist/ArtistBlock";

interface ArtistCollectionProps {
	artists: Array<SpotifyApi.ArtistObjectFull>
}

export const ArtistCollection: React.FC<ArtistCollectionProps> = ({ artists }: ArtistCollectionProps) => {
	return (
		<div id="artists">
			{artists.map((value: SpotifyApi.ArtistObjectFull): JSX.Element => {
				return <ArtistBlock artist={value} key={value.id} />
			})}
		</div>
	)
}

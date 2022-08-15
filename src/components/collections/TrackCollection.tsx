import React from "react";
import { TrackRowMinimal } from "../TrackRowMinimal";

interface TrackCollectionProps {
	tracks: Array<SpotifyApi.TrackObjectFull>,
	showArtists?: boolean
}

export const TrackCollection: React.FC<TrackCollectionProps> = ({ tracks, showArtists }: TrackCollectionProps) => {
	return (
		<div id="tracks">
			{tracks.map((value: SpotifyApi.TrackObjectFull): JSX.Element => {
				return <TrackRowMinimal showArtist={true} key={value.id} track={value} />
			})}
		</div>
	)
}

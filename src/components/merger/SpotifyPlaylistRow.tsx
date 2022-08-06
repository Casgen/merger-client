import React from "react";
import "../../scss/playlists/SpotifyPlaylistRow.scss";
import { RadioProps } from "../primitive/RadioGroupSpotify";


export interface SpotifyPlaylistRowProps extends RadioProps {
	playlist: SpotifyApi.PlaylistObjectSimplified,
	onClick?: Function | { (obj: SpotifyApi.PlaylistObjectSimplified): void }
	showConfirm?: boolean;
}

export const SpotifyPlaylistRow: React.FC<SpotifyPlaylistRowProps> = (props: SpotifyPlaylistRowProps) => {

	const callOnClick = () => {
		if (props.onClick)
			props.onClick(props.playlist);

		if (props.onSelect) {
			props.onSelect(props.id);
		}
	};


	return (
		<div className="spotify-playlist-row" onClick={callOnClick}>
			<img src={props.playlist.images[0].url} alt="couldn't load" />
			<div className="details">
				<h1>{props.playlist.name}</h1>
				<h2>{props.playlist.owner.display_name}</h2>
			</div>
			<div style={props.selected ? { display: 'block' } : { display: 'none' }} className="confirm"></div>
		</div>
	)
}

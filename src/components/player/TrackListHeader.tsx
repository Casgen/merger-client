import React from 'react'
import "../../scss/track/trackListHeader.scss"

interface TrackListHeaderProps {
	showNum?: boolean,
	showAlbum?: boolean,
	showArtist?: boolean
}

export const TrackListHeader: React.FC<TrackListHeaderProps> = ({showNum, showAlbum, showArtist} : TrackListHeaderProps) => {
	return (
		<div id="header-row">
			<div id="num">
				{showNum && <h6>#</h6>}
			</div>
			<div id="name">
			</div>
			<div id="artist">
				{showArtist && <h6>Artist</h6>}
			</div>
			<div id="album">
				{showAlbum && <h6>Album</h6>}
			</div>
			<div id="duration">
				<h6>Duration</h6>
			</div>
			<div id="like"></div>
		</div>
	)
}

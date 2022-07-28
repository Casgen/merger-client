import React from 'react'
import "../../scss/track/trackListHeader.scss"

export const TrackListHeader: React.FC = () => {
	return (
		<div id="header-row">
			<div id="name">
				<h5>Name</h5>
			</div>
			<div id="artist">
				<h6>Artist</h6>
			</div>
			<div id="album">
				<h6>Album</h6>
			</div>
			<div id="duration">
				<h6>Duration</h6>
			</div>
			<div id="like"></div>
		</div>
	)
}

import React from 'react'
import "../../scss/mediaHeader.scss";

interface PlayerHeaderProps {
	img?: string,
	title: string | undefined,
	creator: string | undefined,
	numOfTracks?: number,
	desc?: string | null
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = (props: PlayerHeaderProps) => {

	return (
		<div id="media-header">
			<div>
				<img src={props.img ? props.img : "/images/noteimg.png"} alt="Playlist" />
			</div>
			<div>
				<h1>{props.title}</h1>
				<h6>
					{props.creator}
					{props.numOfTracks && <> ● {props.numOfTracks} tracks</>}
				</h6>
				{props.desc && <h6>{props.desc}</h6>}
			</div>
		</div>
	)
}

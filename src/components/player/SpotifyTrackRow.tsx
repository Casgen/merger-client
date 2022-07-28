import React, { MouseEventHandler, useState } from 'react'
import { Link } from 'react-router-dom';
import { convertNumberToDuration } from '../../utils/utils';
import { ContextMenuTrigger } from "react-contextmenu";
import { TrackContextMenu } from "../contextmenu/TrackContextMenu";
import "../../scss/track/spotifyTrackRow.scss";
import axios from 'axios';

interface Props {
	track: SpotifyApi.TrackObjectFull,
	key: string,
	handleOnClick: Function,
	showAlbum: boolean,
	showLike?: boolean,
}

export const SpotifyTrackRow: React.FC<Props> = ({ track, handleOnClick, showAlbum, showLike}: Props) => {

	const [isLikeHovered, setIsLikeHovered] = useState<boolean>(false);

	// Have to do it like this. for some reason if i declare that the function should be executed right in the onClick
	// listener, the function is executed when rendered either way
	const handleClick = () => {
		handleOnClick(track);
	}

	const fill = () => setIsLikeHovered(true);
	const drain = () => setIsLikeHovered(false);

	const likeTrack = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

		e.stopPropagation(); // this function prevents the event from bubbling up the element's parents

		try {
			axios.put(`${process.env.REACT_APP_API_LINK}/merger/likeTrack`,track, {withCredentials: true});
		} catch (e: unknown) {
			console.error(e)
		}
	}

	return (
		<>
			<ContextMenuTrigger id={`track-context-${track.id}`}>
				<div onClick={handleClick} className="track-row">
					<div className="name">
						<img src={track.album.images[2]?.url} alt="Err"></img>
						<h5>{track.name}</h5>
					</div>
					<div className="artist">
						{track.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
							if (index === 0) return <Link key={artist.id} to={artist.href}>{artist.name}</Link>;
							return <Link key={artist.id} to={artist.href}>, {artist.name}</Link>;
						})}
					</div>
					{showAlbum &&
						<div className="album">
							<Link to={track.album.uri}>{track.album.name}</Link>
						</div>
					}
					<div className="duration">
						{convertNumberToDuration(track.duration_ms)}
					</div>
					<div className="like">
						{showLike &&
							<img onClick={(e) => likeTrack(e)}
								src={isLikeHovered ? "/images/heartFilledSpotify.png" : "/images/heartSpotify.png"}
								onMouseOver={fill}
								onMouseOut={drain}
								alt="couldn't load!" />
						}
					</div>
				</div>
			</ContextMenuTrigger>
			<TrackContextMenu id={`track-context-${track.id}`} track={track} />
		</>
	)
}

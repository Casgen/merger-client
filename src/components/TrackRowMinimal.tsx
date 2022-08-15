import React from 'react'
import { Link } from 'react-router-dom';
import { convertNumberToDuration } from '../utils/utils';
import "../scss/track/trackRowSearch.scss";
import { mergerLoadAndPlay } from "../utils/mergerUtils";
import { ContextMenuTrigger } from "react-contextmenu";
import { TrackContextMenu } from './contextmenu/TrackContextMenu';
import axios from 'axios';
import Merger from '../interfaces/Merger';
import { ActionTypeQueue } from './features/queue/queueSlice';
import { store } from '../App';

interface TrackRowMinimalProps {
	track: SpotifyApi.TrackObjectFull,
	showArtist: boolean;
}

export const TrackRowMinimal: React.FC<TrackRowMinimalProps> = ({ track, showArtist }: TrackRowMinimalProps) => {

	const handlePlay = () => {
		mergerLoadAndPlay(track);
	}

	const handleAddToQueue = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		store.dispatch({ type: ActionTypeQueue.ADD_SONG, payload: track })
	}

	const handleAddToPlaylist = async (playlist: Merger.PlaylistFull) => {
		try {
			console.log(playlist.id)
			axios.put(`${process.env.REACT_APP_API_LINK}/merger/addToPlaylist`, {
				playlistId: playlist.id,
				trackId: track.uri
			}, { withCredentials: true })
		} catch (e: unknown) {
			console.error("Failed to add a track to playlist", e);
		}
	}


	return (
		<>
			<ContextMenuTrigger id={`track-minimal-${track.id}`}>
				<div className='track-row-search' onClick={handlePlay}>
					<div className='image'>
						<img src={track?.album.images[0].url} alt="Couldn't load!"></img>
					</div>
					<div className='titles'>
						<h2>{track?.name}</h2>
						{showArtist && <div className='artists'>
							{track?.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
								if (index === 0) return <Link className='artist-title' key={artist.id}
									to={artist.href}>{artist.name}</Link>;
								return <Link className='artist-title' key={artist.id}
									to={artist.href}>, {artist.name}</Link>;
							})}
						</div>}
					</div>
					<div className='duration'>
						{
							track?.duration_ms !== undefined ? <h2>{convertNumberToDuration(track.duration_ms)}</h2> :
								<h2>NaN</h2>
						}
					</div>
				</div>
			</ContextMenuTrigger>
			<TrackContextMenu onAddToPlaylist={handleAddToPlaylist} onAddToQueue={handleAddToQueue} id={`track-minimal-${track.id}`} />
		</>
	)
}

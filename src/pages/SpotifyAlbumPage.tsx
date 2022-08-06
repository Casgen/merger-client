import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../scss/albumWindow.scss'
import { TrackListHeader } from '../components/player/TrackListHeader';
import { addOtherSongsToQueuePlaylist, mergerLoadAndPlay } from '../utils/mergerUtils';
import { SpotifyTrackRow } from '../components/player/SpotifyTrackRow';
import { PlayerHeader } from '../components/player/PlayerHeader';


export const SpotifyAlbumPage: React.FC = () => {

	const { id } = useParams<{ id: string | undefined }>();
	const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();
	const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectFull>>();

	const loadAlbum = async () => {
		if (!id) return console.error("Can't load, Id is undefined!");

		try {
			let album = await axios.get<SpotifyApi.AlbumObjectFull>(`${process.env.REACT_APP_API_LINK}/spotify/albums/${id}`);
			setAlbum(album.data);

			let tracks = await axios.get<Array<SpotifyApi.TrackObjectFull>>(`${process.env.REACT_APP_API_LINK}/spotify/albums/${id}/tracks`);
			setTracks(tracks.data);

		} catch (e: unknown) {
			console.error(e);
		}

	}
	const handlePlay = (track: SpotifyApi.TrackObjectSimplified) => {
		if (tracks) addOtherSongsToQueuePlaylist(track.uri, tracks);
		mergerLoadAndPlay(track);
	}

	useEffect(() => {
		loadAlbum();
	}, [id])

	return (
		<div id="spotify-album-page">
			{album && <PlayerHeader img={album.images[0] && album.images[0].url}title={album.name} creator={album.artists[0].name} numOfTracks={album.tracks.total} />}
			{album && <TrackListHeader showNum={true} showArtist={false} />}
			{tracks && tracks.map((track: SpotifyApi.TrackObjectSimplified) => {
				return <SpotifyTrackRow onClick={handlePlay} showArtist={false} num={track.track_number} track={track} />
			})}
		</div>
	)
}

import {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router';
import "../scss/playlistWindow.scss"
import {addOtherSongsToQueuePlaylist, mergerLoadAndPlay} from "../utils/mergerUtils";
import {TrackListHeader} from "../components/player/TrackListHeader";
import {SpotifyTrackRow} from "../components/player/SpotifyTrackRow";
import { PlayerHeader } from '../components/player/PlayerHeader';
import { getPlaylist } from '../utils/spotifyUtils';

const PlaylistWindow: React.FC = () => {

    const {id} = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
    const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull | undefined>();
    const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectFull>>();

    const handlePlay = (track: SpotifyApi.TrackObjectFull) => {
        if (tracks) addOtherSongsToQueuePlaylist(track.uri, tracks);
        mergerLoadAndPlay(track);
    }

    const loadPlaylist = async () => {

        if (id !== undefined) {

            let res: Promise<AxiosResponse<SpotifyApi.PlaylistObjectFull>> = getPlaylist(id);

            let playlist: SpotifyApi.PlaylistObjectFull = (await res).data;

            setPlaylist(playlist);

            let arrayOfTracks: Array<SpotifyApi.TrackObjectFull> = new Array<SpotifyApi.TrackObjectFull>();

            if (playlist !== undefined) {
                playlist.tracks.items.forEach((item: SpotifyApi.PlaylistTrackObject) => {
                    arrayOfTracks.push(item.track);
                })

                setTracks(arrayOfTracks);
            }
        }
    }

    useEffect(() => {
        loadPlaylist()
    }, [id]) //For rendering on changing ID in url, it needs to be added into the dependency array

    return (
        <div id="playlist-window">
            <div id="playlist-table">
		<PlayerHeader desc={playlist?.description} numOfTracks={playlist?.tracks.total} img={playlist?.images[0] && playlist.images[0].url} creator={playlist?.owner.display_name} title={playlist?.name}  />
                <TrackListHeader showArtist={true} showAlbum={true}/>
                {
                    playlist?.tracks && playlist?.tracks.items.map((value: SpotifyApi.PlaylistTrackObject): JSX.Element | null => {
                        return <SpotifyTrackRow showLike={true} showArtist={true} img={value.track.album.images[2] && value.track.album.images[2].url} onClick={handlePlay} album={value.track.album} track={value.track} key={value.track.id}/>
                    })
                }
            </div>        </div>
    )
}

export default PlaylistWindow

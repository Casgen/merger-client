import axios, {AxiosError, AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router';
import {PlayerHeader} from '../components/player/PlayerHeader';
import {PlayerTable} from '../components/player/PlayerTable';
import "../scss/playlistWindow.scss"
import {Simulate} from "react-dom/test-utils";

const PlaylistWindow: React.FC = () => {

    const {id} = useParams<{ id: string | undefined }>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
    const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull | undefined>();
    const [tracks, setTracks] = useState<Array<SpotifyApi.TrackObjectFull>>();

    const loadPlaylist = async () => {
        let uri: string[] | undefined = id?.split(":");

        if (uri !== undefined) {

            let res: Promise<AxiosResponse<SpotifyApi.PlaylistObjectFull>> = axios.get(`${process.env.REACT_APP_API_LINK}/spotify/playlist/${uri[2]}`);

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
            <PlayerHeader src={playlist && playlist.images[0].url} title={playlist && playlist.name}
                          creator={playlist && playlist.owner}/>
            <PlayerTable content={tracks}/>
        </div>
    )
}

export default PlaylistWindow

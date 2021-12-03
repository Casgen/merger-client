import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { PlayerHeader } from '../components/PlayerHeader';
import { PlayerTable } from '../components/PlayerTable';
import "../css/playlistWindow.css"

const PlaylistWindow: React.FC = () => {

    const { id } = useParams<{id: string | undefined}>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
    const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull | undefined>();

    async function fetchPlaylist() :Promise<void> { //If we don't want to return anything, use this
        const response: Promise<AxiosResponse<unknown,any>> = axios.get(`http://localhost:8080/spotify/playlist/4HvTCpcRNE6h8vhC9RgKys`,{withCredentials: true});
        const json = (await response).data as SpotifyApi.PlaylistObjectFull;
        setPlaylist(json);
    }

    useEffect(() => {
        fetchPlaylist();
    }, [])

    return (
        <div id="playlist-window">
            <PlayerHeader src={playlist && playlist.images[0].url} title={playlist && playlist.name} creator={playlist && playlist.owner}/>
            <PlayerTable content={playlist?.tracks.items}/>
        </div>
    )
}

export default PlaylistWindow

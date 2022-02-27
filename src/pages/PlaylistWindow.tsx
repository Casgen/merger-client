import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { PlayerHeader } from '../components/player/PlayerHeader';
import { PlayerTable } from '../components/player/PlayerTable';
import "../scss/playlistWindow.scss"

const PlaylistWindow: React.FC = () => {

    const { id } = useParams<{id: string | undefined}>(); //Can be used ONLY IF IT'S UNDER THE ROUTE COMPONENT!
    const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull | undefined>();

    useEffect(() => {
        let uri: string[] | undefined = id?.split(":");
        if (uri !== undefined) {
            axios.get(`${process.env.REACT_APP_API_LINK}/spotify/playlist/${uri[2]}`).then((response: AxiosResponse<unknown, any>) => {
            setPlaylist(response.data as SpotifyApi.PlaylistObjectFull);
            });
        }
    }, [id]) //For rendering on changing ID in url, it needs to be added into the dependency array

    return (
        <div id="playlist-window">
            <PlayerHeader src={playlist && playlist.images[0].url} title={playlist && playlist.name} creator={playlist && playlist.owner}/>
            <PlayerTable content={playlist?.tracks.items}/>
        </div>
    )
}

export default PlaylistWindow

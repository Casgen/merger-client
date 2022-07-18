import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const PlaylistList: React.FC = () => {

    const [playlists, setPlaylists] = useState<SpotifyApi.ListOfUsersPlaylistsResponse| null>(null);

    //TODO maybe catch the errors?
    const fetchPlaylists = async () => {
        axios.get<SpotifyApi.ListOfUsersPlaylistsResponse>(`${process.env.REACT_APP_API_LINK}/spotify/me/playlists`).then((res: AxiosResponse<SpotifyApi.ListOfUsersPlaylistsResponse>) => {
            setPlaylists(res.data);
        }).catch((err) => {
            console.error("Failed to fetch user's playlists",err);
        });
    }

    useEffect(() => {
        fetchPlaylists();
    }, [])

    return (
        <div id="playlist-list">
            {
                playlists !== null && playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified): JSX.Element => {
                    return <Link to={`/playlist/${playlist.uri}`} key={playlist.id}> {playlist.name}</Link>
                })
            }
        </div>
    )
}

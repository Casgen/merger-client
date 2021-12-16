import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

export const PlaylistList: React.FC = () => {

    const [playlists, setPlaylists] = useState<SpotifyApi.ListOfUsersPlaylistsResponse| null>(null);

    //TODO maybe catch the errors?
    const fetchPlaylists = async () => {
        const response: Promise<AxiosResponse<SpotifyApi.ListOfUsersPlaylistsResponse>> = axios.get("https://api.spotify.com/v1/me/playlists",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        });
        setPlaylists((await response).data);
    }

    useEffect(() => {
        fetchPlaylists();
    }, [])

    return (
        <div id="playlist-list">
            {
                playlists !== null && playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified): JSX.Element => {
                    return <a href={`/playlist/${playlist.uri}`}> {playlist.name}</a>
                })
            }
        </div>
    )
}

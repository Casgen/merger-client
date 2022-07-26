import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    display: string
}

export const SpotifyPlaylists: React.FC<Props> = (props: Props) => {

    const [playlists, setPlaylists] = useState<SpotifyApi.ListOfUsersPlaylistsResponse| null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    //TODO maybe catch the errors?
    const fetchPlaylists = async () => {
        axios.get<SpotifyApi.ListOfUsersPlaylistsResponse>(`${process.env.REACT_APP_API_LINK}/spotify/me/playlists`).then((res: AxiosResponse<SpotifyApi.ListOfUsersPlaylistsResponse>) => {
            setIsLoggedIn(true);
            setPlaylists(res.data);
        }).catch((err) => {
            if (err.status as number === 401)  {
                setIsLoggedIn(false);
                return;
            }
            console.error("Failed to fetch user's playlists",err);
        });
    }

    useEffect(() => {
        fetchPlaylists();
    }, [])

    return (
        <div id="spotify-playlists" style={{display: props.display}}>
            { isLoggedIn ?
                playlists !== null && playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified): JSX.Element => {
                    return <Link to={`/playlist/${playlist.uri}`} key={playlist.id}> {playlist.name}</Link>
                }) : <p><a href={`${process.env.REACT_APP_API_LINK}/spotify/auth/login`}>Login</a> to view your spotify playlists!</p>
            }
        </div>
    )
}

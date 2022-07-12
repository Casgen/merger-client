import axios, {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import AlbumTable from '../components/album/AlbumTable';
import '../scss/albumWindow.scss'
import {AlbumHeading} from "../components/album/AlbumHeading";


export const SpotifyAlbumPage: React.FC = () => {

    const {id} = useParams<{ id: string | undefined }>();
    const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();

    const loadAlbum = (): void => {
        if (id !== undefined) {
            axios.get<SpotifyApi.AlbumObjectFull>(`${process.env.REACT_APP_API_LINK}/spotify/album/${id}`).then((res: AxiosResponse<SpotifyApi.AlbumObjectFull>) => {
                setAlbum(res.data);
            })
        }
    }

    useEffect(() => {
        loadAlbum();
    }, [id])

    return (
        <div id="spotify-album-page">
            {album && <AlbumHeading album={album}/>}
            {album?.tracks.items && <AlbumTable content={album?.tracks.items}/>}
        </div>
    )
}
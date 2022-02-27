import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AlbumTable from '../components/album/AlbumTable';
import '../scss/albumWindow.scss'


export const SpotifyAlbumPage: React.FC = () => {

    const { id } = useParams<{id: string | undefined}>();
    const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();

    const loadAlbum = (): void => {
        if (id !== undefined) {
            axios.get(`${process.env.REACT_APP_API_LINK}/spotify/album/${id}`).then((res) => {
                setAlbum(res.data as SpotifyApi.AlbumObjectFull);
            })
        }
    }

    useEffect(() => {
        loadAlbum();
    }, [id])

  return (
    <div id="spotify-album-page">

        {album?.tracks.items && <AlbumTable content={album?.tracks.items}></AlbumTable>}
    </div>
  )
}
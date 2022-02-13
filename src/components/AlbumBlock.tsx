import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { trimString } from '../utils/utils';

interface Props {
    album: SpotifyApi.AlbumObjectSimplified;
}

export const AlbumBlock: React.FC<Props> = ({album}: Props) => {

    const [artists, setArtists] = useState<string[] | undefined>(undefined);

    return (
        <div className="album-block">
            <img src={album.images[0].url} alt="Error loading!"></img>
            <div>
                <Link className='album-title' to={`/spotify/album/${album.id}`}>{trimString(album.name,22)}</Link>
                <div>
                    {album.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                        if (index === 0) return <Link className='artist-title' key={artist.id} to={artist.href}>{artist.name}</Link>;
                        return  <Link className='artist-title' key={artist.id} to={artist.href}>, {artist.name}</Link>;
                    })}
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
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
                <a className='album-title' href={album.href}>{trimString(album.name,22)}</a>
                <div>
                    {album.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                        if (index === 0) return <a className='artist-title' key={artist.id} href={artist.href}>{artist.name}</a>;
                        return  <a className='artist-title' key={artist.id} href={artist.href}>, {artist.name}</a>;
                    })}
                </div>
            </div>
        </div>
    )
}

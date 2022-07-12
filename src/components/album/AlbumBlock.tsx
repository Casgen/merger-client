import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { trimString, listArtists } from '../../utils/utils';
import "../../scss/artists/artistBlock.scss";
import "../../scss/albums/albumBlock.scss";

interface Props {
    album: SpotifyApi.AlbumObjectSimplified;
}

export const AlbumBlock: React.FC<Props> = ({album}: Props) => {

    return (
        <div className="album-block">
            <img src={album.images[0].url} alt="Error loading!"></img>
            <div>
                <Link className='album-title' to={`/spotify/album/${album.id}`}>{trimString(album.name,22)}</Link>
                <div>
                    {listArtists(album.artists)}
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom';
import { convertToMins } from '../utils/utils';

interface Props {
    track: SpotifyApi.TrackObjectFull | undefined
}

export const TrackRow:React.FC<Props> = ({track} : Props) => {
    return (
        <div className='track-row-search'>
            <div className='image'>
                <img src={track?.album.images[0].url} alt="Couldn't load!"></img>
            </div>
            <div className='titles'>
                <Link to={track?.uri}>{track?.name}</Link>
                <div className='artists'>
                    {track?.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                            if (index === 0) return <Link className='artist-title' key={artist.id} to={artist.href}>{artist.name}</Link>;
                            return  <Link className='artist-title' key={artist.id} to={artist.href}>, {artist.name}</Link>;
                    })}
                </div>
            </div>
            <div className='duration'>
                {
                    track?.duration_ms !== undefined ? <h2>{convertToMins(track.duration_ms)}</h2> : <h2>NaN</h2>
                }
            </div>
        </div>
    )
}

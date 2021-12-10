import React from 'react'
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
                <a href={track?.uri}>{track?.name}</a>
                <div className='artists'>
                    {track?.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                            if (index === 0) return <a className='artist-title' key={artist.id} href={artist.href}>{artist.name}</a>;
                            return  <a className='artist-title' key={artist.id} href={artist.href}>, {artist.name}</a>;
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

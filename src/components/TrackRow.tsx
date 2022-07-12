import React from 'react'
import { Link } from 'react-router-dom';
import { convertToMins } from '../utils/utils';
import "../scss/track/trackRow.scss";
import {mergerLoadAndPlay} from "../utils/mergerUtils";

interface Props {
    track: SpotifyApi.TrackObjectFull | undefined,
    showArtist: boolean;
}

export const TrackRow: React.FC<Props> = ({track, showArtist} : Props) => {

    const handlePlay = () => {
        if (track !== undefined) mergerLoadAndPlay(track);
    }

    return (
        <div className='track-row-search' onClick={handlePlay}>
            <div className='image'>
                <img src={track?.album.images[0].url} alt="Couldn't load!"></img>
            </div>
            <div className='titles'>
                <h2>{track?.name}</h2>
                {showArtist && <div className='artists'>
                    {track?.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                            if (index === 0) return <Link className='artist-title' key={artist.id} to={artist.href}>{artist.name}</Link>;
                            return  <Link className='artist-title' key={artist.id} to={artist.href}>, {artist.name}</Link>;
                    })}
                </div>}
            </div>
            <div className='duration'>
                {
                    track?.duration_ms !== undefined ? <h2>{convertToMins(track.duration_ms)}</h2> : <h2>NaN</h2>
                }
            </div>
        </div>
    )
}

import React from 'react'
import {Link} from 'react-router-dom';
import {convertNumberToDuration} from '../utils/utils';
import "../scss/track/trackRowSearch.scss";
import {mergerLoadAndPlay} from "../utils/mergerUtils";
import { ContextMenuTrigger } from "react-contextmenu";

interface TrackRowMinimalProps {
    track: SpotifyApi.TrackObjectFull | undefined,
    showArtist: boolean;
}

export const TrackRowMinimal: React.FC<TrackRowMinimalProps> = ({track, showArtist}: TrackRowMinimalProps) => {

    const handlePlay = () => {
        if (track !== undefined) mergerLoadAndPlay(track);
    }


    return (
        <>
            <ContextMenuTrigger id="track-context">
                <div className='track-row-search' onClick={handlePlay}>
                    <div className='image'>
                        <img src={track?.album.images[0].url} alt="Couldn't load!"></img>
                    </div>
                    <div className='titles'>
                        <h2>{track?.name}</h2>
                        {showArtist && <div className='artists'>
                            {track?.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                                if (index === 0) return <Link className='artist-title' key={artist.id}
                                                              to={artist.href}>{artist.name}</Link>;
                                return <Link className='artist-title' key={artist.id}
                                             to={artist.href}>, {artist.name}</Link>;
                            })}
                        </div>}
                    </div>
                    <div className='duration'>
                        {
                            track?.duration_ms !== undefined ? <h2>{convertNumberToDuration(track.duration_ms)}</h2> :
                                <h2>NaN</h2>
                        }
                    </div>
                </div>
            </ContextMenuTrigger>
        </>
    )
}

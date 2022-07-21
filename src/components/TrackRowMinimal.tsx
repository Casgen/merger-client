import React, {MouseEventHandler} from 'react'
import {Link} from 'react-router-dom';
import {convertNumberToDuration} from '../utils/utils';
import "../scss/track/trackRowSearch.scss";
import {mergerLoadAndPlay} from "../utils/mergerUtils";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";

interface Props {
    track: SpotifyApi.TrackObjectFull | undefined,
    showArtist: boolean;
}

export const TrackRowMinimal: React.FC<Props> = ({track, showArtist}: Props) => {

    const handlePlay = () => {
        if (track !== undefined) mergerLoadAndPlay(track);
    }

    const handleContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        const xPos: string = event.pageX + "px";
        const yPos: string = event.pageY + "px";
    }

    function handleAddToQueue(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) {

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

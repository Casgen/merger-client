import React from 'react'
import {Link} from 'react-router-dom';
import {convertNumberToDuration} from '../../utils/utils';
import {ContextMenuTrigger} from "react-contextmenu";
import {TrackContextMenu} from "../contextmenu/TrackContextMenu";
import "../../scss/track/spotifyTrackRow.scss";

interface Props {
    track: SpotifyApi.TrackObjectFull,
    key: string
    handleOnClick: Function
    showAlbum: boolean
}

export const SpotifyTrackRow: React.FC<Props> = ({track, handleOnClick, showAlbum}: Props) => {

    // Have to do it like this. for some reason if i declare that the function should be executed right in the onClick
    // listener, the function is executed when rendered either way
    const handleClick = () => {
        handleOnClick(track);
    }
    return (
        <>
            <ContextMenuTrigger id={`track-context-${track.id}`}>
                <div onClick={handleClick} className="track-row">
                    <div className="name">
                        <img src={track.album.images[2]?.url} alt="Err"></img>
                        <h5>{track.name}</h5>
                    </div>
                    <div className="artist">
                        {track.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                            if (index === 0) return <Link key={artist.id} to={artist.href}>{artist.name}</Link>;
                            return <Link key={artist.id} to={artist.href}>, {artist.name}</Link>;
                        })}
                    </div>
                    {showAlbum &&
                        <div className="album">
                            <Link to={track.album.uri}>{track.album.name}</Link>
                        </div>
                    }
                    <div className="duration">
                        {convertNumberToDuration(track.duration_ms)}
                    </div>
                </div>
            </ContextMenuTrigger>
            <TrackContextMenu id={`track-context-${track.id}`} track={track}/>
        </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom';
import { convertToMins } from '../utils/utils';

interface Props {
    track: SpotifyApi.TrackObjectFull,
    key: string
    execFunc: VoidFunction
}

// TODO: Seperate the names of the artists, when there are multiple of them (by comma or whitespac)

export const PlayerTableRow: React.FC<Props> = ({track,execFunc}: Props) => {

    const handleClick = () => {
        execFunc();
    }

    return (
        <tr onClick={handleClick} className="track-row">
            <td>
                <img src={track.album.images[2]?.url} alt="Err"></img>
                <h5>{track.name}</h5>
            </td>
            <td>
                {track.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                    if (index === 0) return <Link key={artist.id} to={artist.href}>{artist.name}</Link>;
                    return <Link key={artist.id} to={artist.href}>, {artist.name}</Link>;
                })}
            </td>
            <td>
                <Link to={track.album.uri}>{track.album.name}</Link>
            </td>
            <td>
                <Link to="#">{convertToMins(track.duration_ms)}</Link>
            </td>
        </tr>
    )
}

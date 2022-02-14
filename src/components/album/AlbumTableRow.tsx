import React from 'react'
import { Link } from 'react-router-dom';
import { convertToMins } from '../../utils/utils';

type Props = {
    track: SpotifyApi.TrackObjectSimplified;
    key: string
    execFunc: VoidFunction
}

export const AlbumTableRow = ({track, key, execFunc}: Props) => {


    const handleClick = () => {
        execFunc();
    }

    return (
        <tr onClick={handleClick} className="track-row">
            <td>
                <h5>{track.name}</h5>
            </td>
            <td>
                <Link to="#">{convertToMins(track.duration_ms)}</Link>
            </td>
        </tr>
    )
}

export default AlbumTableRow
import React from 'react'
import { Link } from 'react-router-dom';
import { convertToMins } from '../../utils/utils';

type Props = {
    count: number,
    track: SpotifyApi.TrackObjectSimplified;
    key: string
    execFunc: Function
}

export const AlbumTableRow = ({track, key, execFunc, count}: Props) => {


    const handleClick = () => {
        execFunc(track);
    }

    return (
        <tr onClick={handleClick} key={key} className="album-row">
            <td>
                <h4>{count}</h4>
            </td>
            <td>
                <h5>{track.name}</h5>
            </td>
            <td>
                <h4>{convertToMins(track.duration_ms)}</h4>
            </td>
        </tr>
    )
}

export default AlbumTableRow
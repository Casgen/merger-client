import React from 'react'
import {
    addOtherSpotifySongsToQueueAlbum,
    mergerLoadAndPlay
} from '../../utils/mergerUtils'
import {AlbumTableHeader} from './AlbumTableHeader'
import AlbumTableRow from './AlbumTableRow'

type Props = {
    content: SpotifyApi.TrackObjectSimplified[];
}

export const AlbumTable: React.FC<Props> = ({content}: Props) => {

    const handlePlay = (track: SpotifyApi.TrackObjectSimplified) => {
        mergerLoadAndPlay(track);
        addOtherSpotifySongsToQueueAlbum(track.uri, content);
    }

    return (
        <table id="album-table">
            <tbody>
            <AlbumTableHeader/>
            {
                content !== undefined ? content.map((value: SpotifyApi.TrackObjectSimplified, index: number): JSX.Element | null => {
                    if (value != null) {
                        return <AlbumTableRow execFunc={handlePlay} count={index} track={value}
                                              key={value.uri}/>
                    }
                    return null;
                }) : <tr>
                    <td><h6>Error: Loading table failed!</h6></td>
                </tr>
            }
            </tbody>
        </table>
    )
}

export default AlbumTable

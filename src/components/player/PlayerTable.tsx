import React from 'react'
import {addOtherSpotifySongsToQueuePlaylist, mergerLoadAndPlay} from '../../utils/mergerUtils'
import { PlayerTableHeader } from './PlayerTableHeader'
import { PlayerTableRow } from './PlayerTableRow'
interface Props {
    content: Array<SpotifyApi.TrackObjectFull> | undefined
}

export const PlayerTable: React.FC<Props> = ({ content }: Props) => {

    const handlePlay = (track: SpotifyApi.TrackObjectFull) => {
        if (content !== undefined) addOtherSpotifySongsToQueuePlaylist(track.uri, content);
        mergerLoadAndPlay(track);
    }

    return (
        <table id="playlist-table">
            <tbody>
            <PlayerTableHeader/>
            {
                content && content.map((value: SpotifyApi.TrackObjectFull): JSX.Element | null => {
                        return <PlayerTableRow execFunc={handlePlay} track={value} key={value.id}/>
                })
            }
            </tbody>
        </table>
    )
}

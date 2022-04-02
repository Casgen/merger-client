import React, { useContext } from 'react'
import { addNextSpotifySongsToQueue, mergerPlay } from '../../utils/mergerUtils'
import { PlayerTableHeader } from './PlayerTableHeader'
import { PlayerTableRow } from './PlayerTableRow'
import {useSelector} from "react-redux";
import {RootState} from "../../App";

interface Props {
    content: SpotifyApi.PlaylistTrackObject[] | undefined
}

const merger = (state: RootState) => state;

export const PlayerTable: React.FC<Props> = ({ content }: Props) => {

    const handlePlay = (uri: string) => {
        mergerPlay(uri);
        if (content !== undefined) addNextSpotifySongsToQueue(uri, content);
    }

    return (
        <table id="playlist-table">
            <tbody>
            <PlayerTableHeader/>
            {
                content !== undefined ? content.map((value: SpotifyApi.PlaylistTrackObject): JSX.Element | null => {
                    if (value.track != null) {
                        return <PlayerTableRow
                        execFunc={() => handlePlay(value.track.uri)}
                        track={value.track}
                        key={value.track.id}/>
                    }
                    return null;
                }) : <tr><td><h6>Error: Loading table failed!</h6></td></tr>
            }
            </tbody>
        </table>
    )
}

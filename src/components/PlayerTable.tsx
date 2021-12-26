import React, { useContext } from 'react'
import { MergerSpotifyPlayerContext, MergerSpotifyPlayerContextType } from '../contexts/MergerSpotifyPlayerContext'
import { play } from '../utils/spotifyUtils'
import { PlayerTableHeader } from './PlayerTableHeader'
import { PlayerTableRow } from './PlayerTableRow'

interface Props {
    content: SpotifyApi.PlaylistTrackObject[] | undefined
}

export const PlayerTable: React.FC<Props> = ({ content }: Props) => {

    const {player} : MergerSpotifyPlayerContextType = useContext<MergerSpotifyPlayerContextType>(MergerSpotifyPlayerContext);

    const handlePlay = (uri: string) => {
        play(player,[uri])
    }

    return (
        <table id="playlist-table">
            <tbody>
            <PlayerTableHeader></PlayerTableHeader>
            {
                content !== undefined ? content.map((value: SpotifyApi.PlaylistTrackObject) :JSX.Element | null => {
                    if (value.track != null) {
                        return <PlayerTableRow execFunc={() => handlePlay(value.track.uri)} track={value.track} key={value.track.id}></PlayerTableRow>
                    }
                    return null;
                }) : <tr><td><h6>Error: Loading table failed!</h6></td></tr>
            }
            </tbody>
        </table>
    )
}

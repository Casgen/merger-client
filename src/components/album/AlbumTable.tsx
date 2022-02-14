import React, { useContext } from 'react'
import { MergerPlayerContext, MergerPlayerContextType } from '../../contexts/MergerPlayerContext'
import { mergerPlay } from '../../utils/mergerUtils'
import { AlbumTableHeader } from './AlbumTableHeader'
import AlbumTableRow from './AlbumTableRow'
import { PlayerTableHeader } from '../player/PlayerTableHeader'

type Props = {
    content: SpotifyApi.TrackObjectSimplified[];
}

export const AlbumTable: React.FC<Props> = ({content}: Props) => {

    const mergerPlayer : MergerPlayerContextType = useContext<MergerPlayerContextType>(MergerPlayerContext);

    const handlePlay = (uri: string) => {
        if (mergerPlayer.spotifyPlayer !== null) {
            mergerPlay(mergerPlayer, uri);
            return;
        }
    }

    return (
        <table id="album-table">
            <tbody>
            <AlbumTableHeader/>
            {
                content !== undefined ? content.map((value: SpotifyApi.TrackObjectSimplified) :JSX.Element | null => {
                    if (value != null) {
                        return <AlbumTableRow execFunc={() => handlePlay(value.uri)} track={value} key={value.id}/>
                    }
                    return null;
                }) : <tr><td><h6>Error: Loading table failed!</h6></td></tr>
            }
            </tbody>
        </table>
    )
}

export default AlbumTable
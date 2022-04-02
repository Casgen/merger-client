import React, { useContext } from 'react'
import { MergerPlayerContext, MergerPlayerContextType } from '../../contexts/MergerPlayerContext'
import { mergerPlay } from '../../utils/mergerUtils'
import { AlbumTableHeader } from './AlbumTableHeader'
import AlbumTableRow from './AlbumTableRow'
import { PlayerTableHeader } from '../player/PlayerTableHeader'
import {useAppSelector} from "../hooks";
import {RootState} from "../../App";

type Props = {
    content: SpotifyApi.TrackObjectSimplified[];
}

const rootState = (state: RootState) => state;

export const AlbumTable: React.FC<Props> = ({content}: Props) => {

    const mergerState = useAppSelector(rootState);

    const handlePlay = (uri: string) => {
            mergerPlay(uri);
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
import React from "react";
import {ContextMenu, MenuItem} from "react-contextmenu";
import "../../scss/track/trackContextMenu.scss";
import {store} from "../../App";
import {ActionTypeQueue} from "../features/queue/queueSlice";

interface Props {
    id: string
    track: SpotifyApi.TrackObjectFull
}

export const TrackContextMenu: React.FC<Props> = (props: Props) => {

    const handleAddToQueue = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        store.dispatch({type: ActionTypeQueue.ADD_SONG, payload: props.track})
    }

    return (
        <>
            <ContextMenu id={props.id}>
                <MenuItem onClick={handleAddToQueue}>
                    Add to queue
                </MenuItem>
                <MenuItem onClick={handleAddToQueue}>
                    Delete from playlist
                </MenuItem>
            </ContextMenu>
        </>
    )
}
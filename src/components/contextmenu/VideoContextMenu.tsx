import {ContextMenu, MenuItem} from "react-contextmenu";
import {store} from "../../App";
import {ActionTypeQueue} from "../features/queue/queueSlice";

interface Props {
    id: string,
    video: gapi.client.youtube.Video
}

export const VideoContextMenu: React.FC<Props> = (props: Props) => {

    const handleAddToQueue = () => {
       store.dispatch({type: ActionTypeQueue.ADD_SONG, payload: props.video})
    }

    return (
        <>
            <ContextMenu id={props.id}>
                <MenuItem onClick={handleAddToQueue}>
                    Add to queue
                </MenuItem>
                <MenuItem>
                    Add to a playlist
                </MenuItem>
            </ContextMenu>
        </>
    )
}
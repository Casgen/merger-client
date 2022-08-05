import React, { ReactEventHandler, SyntheticEvent } from 'react'

interface Props {
    src?: string,
    title: string | undefined,
    creator: string | undefined
}

export const PlayerHeader: React.FC<Props> = (props: Props) => {

    return (
        <div id="media-header">
            <div>
                <img src={props.src ? props.src : "/images/noteimg.png"} alt="Playlist"/>

            </div>
            <div>
                <h1>{props.title}</h1>
                <h6>{props.creator}</h6>
            </div>
        </div>
    )
}

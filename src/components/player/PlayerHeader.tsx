import React from 'react'

interface Props {
    src: string | undefined,
    title: string | undefined,
    creator: string | undefined
}

export const PlayerHeader: React.FC<Props> = (props: Props) => {
    return (
        <div id="media-header">
            <div>
                <img src={props.src} alt="Couldn't load cover art!"></img>
            </div>
            <div>
                <h1>{props.title}</h1>
                <h6>{props.creator}</h6>
            </div>
        </div>
    )
}

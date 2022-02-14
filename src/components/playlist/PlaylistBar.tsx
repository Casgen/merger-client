import React from 'react'

interface Props {
    title: string;
}

export const PlaylistBar = (props: Props) => {
    return (
        <div className="playlist-bar">
            <h2>{props.title}</h2>
        </div>
    )
}

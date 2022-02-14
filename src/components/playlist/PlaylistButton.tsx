import React from 'react'

interface Props {
    title: string;
    id: string;
}

const PlaylistButton = (props: Props) => {
    return (
        <div className="playlist-button">
            <h6>{props.title}</h6>
        </div>
    )
}

export default PlaylistButton

import axios from 'axios'
import React from 'react'

interface Props {
    
}

const PlaylistList = (props: Props) => {

    const fetchPlaylists = () => {
        axios.get("url");
    }

    return (
        <div id="playlist-list">
            
        </div>
    )
}

export default PlaylistList

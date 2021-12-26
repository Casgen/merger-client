import React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
    return (
        <div id="home-page">
            <Link to="/playlist/spotify:playlist:4HvTCpcRNE6h8vhC9RgKys">Playlist</Link>
        </div>
    )
}

import React from 'react'
import "../css/playerInfoContainer.css";

interface Props {
    track: Spotify.Track | undefined
}

const InfoPlayerContainer: React.FC<Props> = ({track}: Props) => {
    return (
        <div id="player-info-container">
            
            {track !== undefined && 
            <>
                <img src={track.album.images[0].url} alt="Error"></img>
                <div id="headers-container">
                    {track.artists.map((value: Spotify.Artist,index: number): JSX.Element => {
                        if (index === 0) return <a href={value.uri} id="artist">{value.name}</a>;
                        return <a href={value.uri} id="artist">, {value.name}</a>
                    })}
                    <h3 id="song-name">{track.name}</h3>
                </div>
            </>
            }
        </div>
    )
}

export default InfoPlayerContainer

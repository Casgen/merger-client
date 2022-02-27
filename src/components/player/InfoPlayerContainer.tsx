import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import "../../scss/playerInfoContainer.scss";


interface Props {
    track: Spotify.PlaybackTrackWindow | gapi.client.youtube.Video | undefined
}

const InfoPlayerContainer: React.FC<Props> = ({track}: Props) => {

    const isSpotify = (obj: any): obj is Spotify.PlaybackTrackWindow => {
        return (obj as Spotify.PlaybackTrackWindow).current_track !== undefined;
    }

    const handleInfo = (): JSX.Element => {
        if (track !== undefined) {
            if (isSpotify(track)) {
                return <>
                    <img src={track.current_track.album.images[0].url} alt="Error"></img>
                    <div id="headers-container">
                        {track.current_track.artists.map((value: Spotify.Artist,index: number): JSX.Element => {
                            if (index === 0) return <Link to={value.uri} id="artist">{value.name}</Link>;
                            return <Link to={value.uri} id="artist">, {value.name}</Link>
                        })}
                        <h3 id="song-name">{track.current_track.name}</h3>
                    </div>
                </>
            }
            return <></>    
        }
        return <></>
    }

    useEffect(() => {

    },[track])

    return (
        <div id="player-info-container">
            {handleInfo()}
        </div>
    )
}

export default InfoPlayerContainer

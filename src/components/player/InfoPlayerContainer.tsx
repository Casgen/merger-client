import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import "../../scss/playerInfoContainer.scss";
import {useAppSelector} from "../hooks";
import {rootState} from "../../App";
import {isSpotifyTrackObjectFull, splitSpotifyUri} from "../../utils/spotifyUtils";


const InfoPlayerContainer: React.FC = () => {

    const currentSong = useAppSelector(rootState).state.currentSong;

    const handleInfo = (): JSX.Element => {
        if (currentSong !== undefined) {
            if (isSpotifyTrackObjectFull(currentSong)) {
                return <>
                    <img src={currentSong.album.images[0].url} alt="Error"></img>
                    <div id="headers-container">
                        {currentSong.artists.map((value: Spotify.Artist, index: number): JSX.Element => {
                            if (index === 0) return <Link to={`/spotify/artist/${splitSpotifyUri(value.uri)}`} id="artist"
                                                          key={value.uri}>{value.name}</Link>;
                            return <Link to={splitSpotifyUri(value.uri)} id="artist" key={value.uri}>, {value.name}</Link>
                        })}
                        <h3 id="song-name">{currentSong.name}</h3>
                    </div>
                </>
            }
            return <></>
        }
        return <></>
    }

    useEffect(() => {}, [currentSong])

    return (
        <div id="player-info-container">
            {handleInfo()}
        </div>
    )
}

export default InfoPlayerContainer

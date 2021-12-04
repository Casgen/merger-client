import React, { useContext, useEffect, useState } from 'react'
import { MergerSpotifyPlayerContext, MergerSpotifyPlayerContextType } from '../contexts/MergerSpotifyPlayerContext';
import "../css/progressBar.css";

interface Props {
    duration: number | undefined

}

const ProgressBar: React.FC<Props> = ({duration} : Props) => {

    const {player}: MergerSpotifyPlayerContextType = useContext(MergerSpotifyPlayerContext); 

    let [value, setValue] = useState<number>(0);
    let [maxRange, setMaxRange] = useState<number | undefined>(100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as number);
    }

    const handleClick = () => {
        if (player !== null) {
            if (duration !== undefined) {
                player.spotify.seek(value)
                return;
            }
            console.error("duration not defined");
            return;
        }
        console.error("player is Undefined")
        return;
    }

    useEffect(() => {
        if (duration !== undefined) {
            setMaxRange(Math.floor(duration));
        }
    },[duration])

    return (
        <div id="progress-bar-container">
            <input disabled={duration !== undefined ? false : true} type="range" onClick={handleClick} onChange={(e) => handleChange(e)} value={duration !== undefined ? value : 0} min="0" max={maxRange} id="progress-slider"></input>
        </div>
    )
}

export default ProgressBar

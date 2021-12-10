import React, { useContext, useEffect, useState } from 'react'
import { MergerSpotifyPlayerContext, MergerSpotifyPlayerContextType } from '../contexts/MergerSpotifyPlayerContext';
import "../scss/progressBar.scss";

interface Props {
    duration: number | undefined,
    progressVal: number | undefined
}

const ProgressBar: React.FC<Props> = ({duration, progressVal} : Props) => {

    const {player}: MergerSpotifyPlayerContextType = useContext(MergerSpotifyPlayerContext); 

    let [value, setValue] = useState<number>(0);
    let [maxRange, setMaxRange] = useState<number | undefined>(duration);
    let [isChanging, setIsChanging] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChanging(true);
        setValue(e.target.value as unknown as number);
    }

    const handleClick = async () => {
        if (player !== null) {
            if (duration !== undefined) {
                setIsChanging(false)
                await player.spotify.seek(value)
                return;
            }
            console.error("duration not defined");
            return;
        }
        console.error("player is undefined")
        return;
    }

    useEffect(() => {
        if (duration !== undefined) {
            setMaxRange(Math.floor(duration));
        }
    },[duration])

    return (
        <div id="progress-bar-container">
            <input disabled={duration !== undefined ? false : true}
            type="range"
            onClick={handleClick}
            onChange={(e) => handleChange(e)}
            value={isChanging ? value : progressVal}
            min="0"
            max={maxRange}
            id="progress-slider"></input>
        </div>
    )
}

export default ProgressBar

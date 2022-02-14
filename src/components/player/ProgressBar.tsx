import React, { useContext, useEffect, useState } from 'react'
import { MergerPlayerContext, MergerPlayerContextType } from '../../contexts/MergerPlayerContext';
import "../../scss/progressBar.scss";
import { seek } from '../../utils/spotifyUtils';
import { convertToMins } from '../../utils/utils';

interface Props {
    duration: number | undefined,
    progressVal: number | undefined,
    paused: boolean | undefined;
}

const ProgressBar: React.FC<Props> = ({duration, progressVal, paused} : Props) => {

    const {spotifyPlayer}: MergerPlayerContextType = useContext(MergerPlayerContext); 

    const [value, setValue] = useState<number>(0);
    const [maxRange, setMaxRange] = useState<number | undefined>(duration);
    const [progressInterval, setProgressInterval] = useState<NodeJS.Timer>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as number);
        if (progressInterval !== undefined) {
            clearInterval(progressInterval);
            setProgressInterval(undefined);
        }
    }

    const handleIncrement = () => {
        setValue((prevValue: number) => {
            return 250+prevValue;
            }
        );
    }

    const handleClick = async () => {
        if (spotifyPlayer !== null) {
            if (duration !== undefined) {
                seek(spotifyPlayer,value as number);
                return;
            }
            console.error("duration not defined");
            return;
        }
        console.error("player is undefined")
        return;
    }

    useEffect(() => {
        if (progressVal !== undefined && duration !== undefined) {
            setMaxRange(Math.floor(duration));
            setValue(progressVal);
            if (paused !== undefined) {
                if (progressInterval !== undefined && paused === true) {
                    clearInterval(progressInterval);
                    setProgressInterval(undefined);
                } else if (progressInterval === undefined && paused === false) {
                    setProgressInterval(setInterval(handleIncrement, 250));
                }
            }
        };

    },[duration, progressVal, paused])

    return (
        <div id="progress-bar-container">
            <span id="time">{convertToMins(value)}</span>
            <input disabled={duration !== undefined ? false : true}
            type="range"
            onClick={handleClick}
            onChange={(e) => handleChange(e)}
            value={value}
            min="0"
            max={maxRange}
            id="progress-slider"></input>
        </div>
    )
}

export default ProgressBar

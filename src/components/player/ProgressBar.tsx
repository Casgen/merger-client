import React, { useContext, useEffect, useState } from 'react'
import { MergerPlayerContext, MergerPlayerContextType } from '../../contexts/MergerPlayerContext';
import "../../scss/progressBar.scss";
import { mergerSeek } from '../../utils/mergerUtils';
import { convertToMins } from '../../utils/utils';


const ProgressBar: React.FC = () => {

    const player: MergerPlayerContextType = useContext(MergerPlayerContext); 

    const [value, setValue] = useState<number>(0);
    const [maxRange, setMaxRange] = useState<number | undefined>(player.state?.duration);
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

    useEffect(() => {
        if (player.state?.progressMs !== undefined && player.state?.duration !== undefined) {
            setMaxRange(Math.floor(player.state?.duration));
            setValue(player.state?.progressMs);
            if (player.state?.paused !== undefined) {
                if (progressInterval !== undefined && player.state?.paused === true) {
                    clearInterval(progressInterval);
                    setProgressInterval(undefined);
                } else if (progressInterval === undefined && player.state?.paused === false) {
                    setProgressInterval(setInterval(handleIncrement, 250));
                }
            }
        };
        console.log(player.state);

    },[player.state?.duration, player.state?.progressMs, player.state?.paused, player.state])

    return (
        <div id="progress-bar-container">
            <span id="time">{convertToMins(value)}</span>
            <input disabled={player.state?.duration !== undefined ? false : true}
            type="range"
            onClick={() => mergerSeek(player,value)}
            onChange={(e) => handleChange(e)}
            value={value}
            min="0"
            max={maxRange}
            id="progress-slider"></input>
        </div>
    )
}

export default ProgressBar

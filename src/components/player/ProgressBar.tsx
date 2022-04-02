import React, {ChangeEvent, useEffect, useState} from 'react'
import "../../scss/progressBar.scss";
import {mergerSeek} from '../../utils/mergerUtils';
import {convertToMins} from '../../utils/utils';
import {useAppSelector} from "../hooks";
import {rootState} from "../../App";

interface Props {
    func?: Function
}

const ProgressBar: React.FC<Props> = ({func} : Props) => {

    const mergerState = useAppSelector(rootState);

    const [value, setValue] = useState<number>(0);
    const [maxRange, setMaxRange] = useState<number | undefined>(mergerState.state?.duration);
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
                return 250 + prevValue;
            }
        )
    }

    useEffect(() => {
        if (mergerState.state?.progressMs !== undefined && mergerState.state?.duration !== undefined) {
            setMaxRange(Math.floor(mergerState.state?.duration));
            setValue(mergerState.state?.progressMs);
            if (mergerState.state?.paused !== undefined) {
                if (progressInterval !== undefined && mergerState.state?.paused === true) {
                    clearInterval(progressInterval);
                    setProgressInterval(undefined);
                } else if (progressInterval === undefined && mergerState.state?.paused === false) {
                    setProgressInterval(setInterval(handleIncrement, 250));
                }
            }
        }
        console.log(mergerState.state);

    }, [mergerState.state?.duration, mergerState.state?.progressMs, mergerState.state?.paused, mergerState.state])

    return (
        <div id="progress-bar-container">
            <span id="time">{convertToMins(value)}</span>
            <input disabled={mergerState.state?.duration === undefined}
                   type="range"
                   onClick={() => {if (func) func(value)}}
                   onChange={(e) => handleChange(e)}
                   value={value}
                   min="0"
                   max={maxRange}
                   id="progress-slider"/>
        </div>
    )
}

export default ProgressBar

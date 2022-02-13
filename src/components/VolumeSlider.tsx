import React, { useContext, useState } from 'react'
import { MergerPlayerContext, MergerPlayerContextType } from '../contexts/MergerPlayerContext';
import "../scss/volumeSlider.scss";
import { mergerSetVolume } from '../utils/mergerUtils';

interface Props {
    
}

const VolumeSlider: React.FC = (props: Props) => {

    let player: MergerPlayerContextType = useContext(MergerPlayerContext);
    let [value, setValue] = useState<number>(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
        if (player !== null) {
            if (value > 100) {
                mergerSetVolume(100,player).catch((err: Error) => {console.trace(err)});
                return;
            }

            if (value < 0) {
                mergerSetVolume(0,player).catch((err: Error) => {console.trace(err)})
                return;
            }

            mergerSetVolume(value,player).catch((err: Error) => {
                console.trace(err);
            });
            return;
        }
        console.trace("Player is undefined!");
    }

    return (
        <div id="volume-container">
            <input id="volume-slider" type="range" min="-2" onChange={(e) => handleChange(e)} max="102" value={value}></input> 
        </div>
    )
}

export default VolumeSlider

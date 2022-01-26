import React, { useContext, useState } from 'react'
import { MergerPlayerContext, MergerPlayerContextType } from '../contexts/MergerPlayerContext';
import "../scss/volumeSlider.scss";

interface Props {
    
}

const VolumeSlider: React.FC = (props: Props) => {

    let {spotifyPlayer}: MergerPlayerContextType = useContext(MergerPlayerContext);
    let [value, setValue] = useState<number>(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
        if (spotifyPlayer !== undefined) {
            if (value > 100) {
                spotifyPlayer?.spotify.setVolume(1); return;
            }
            if (value < 0) {
                spotifyPlayer?.spotify.setVolume(0); return;
            }
            spotifyPlayer?.spotify.setVolume(value/100); return;
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

import React, { useContext, useState } from 'react'
import { MergerSpotifyPlayerContext, MergerSpotifyPlayerContextType } from '../contexts/MergerSpotifyPlayerContext';
import "../scss/volumeSlider.scss";

interface Props {
    
}

const VolumeSlider: React.FC = (props: Props) => {

    let {player}: MergerSpotifyPlayerContextType = useContext(MergerSpotifyPlayerContext);
    let [value, setValue] = useState<number>(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
        if (player !== undefined) {
            if (value > 100) {
                player?.spotify.setVolume(1); return;
            }
            if (value < 0) {
                player?.spotify.setVolume(0); return;
            }
            player?.spotify.setVolume(value/100); return;
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

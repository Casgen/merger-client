import React, { useState } from 'react'
import "../../scss/volumeSlider.scss";

interface Props {
    func?: Function,
    isDisabled: boolean
}

const VolumeSlider: React.FC<Props> = ({func, isDisabled} : Props) => {
    let [value, setValue] = useState<number>(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
        if (func) {
            if (value > 100) return func(100);
            if (value < 0) return func(0);

            return func(value);
        }
    }

    return (
        <div id="volume-container">
            <input id="volume-slider"
                   disabled={isDisabled}
                   type="range"
                   min="-2"
                   max="102"
                   onChange={(e) => handleChange(e)}
                   value={value}/>
        </div>
    )
}

export default VolumeSlider

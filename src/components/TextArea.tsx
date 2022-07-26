
import React, { useState } from 'react'

interface Props {
    placeholder?: string;
    name?: string;
    value?: string | undefined;
    id?: string;
    onChange: Function;
}

export const TextArea: React.FC<Props> = (props: Props) => {

    const [value, setValue] = useState<string | undefined>(props.value);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        if (props.onChange !== undefined ) props.onChange(e.target.value); //had to be set to e.target.value (value state can't process the value that fast?)
    }

    return (
        <textarea
        value={value !== undefined ? value : ""}
        className="text-area"
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e) => {handleOnChange(e)}}
        id={props.id}
        />
    )
}

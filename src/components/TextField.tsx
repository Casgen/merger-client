import React, { useState } from 'react'

interface Props {
    placeholder?: string;
    name?: string;
    type: "text" | "password";
    value?: string | undefined;
    id?: string;
    onChange: Function;
}

export const TextField: React.FC<Props> = (props: Props) => {

    const [value, setValue] = useState<string | undefined>(props.value);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (props.onChange !== undefined ) props.onChange(e.target.value); //had to be set to e.target.value (value state can't process the value that fast?)
    }

    return (
        <input
        type={props.type}
        value={value !== undefined ? value : ""}
        className="text-field"
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e) => {handleOnChange(e)}}
        id={props.id}
        />
    )
}

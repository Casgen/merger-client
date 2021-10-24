import { FC, useState } from 'react'

interface Props {
    placeholder?: string | undefined;
    name?: string | undefined;
    type: "text" | "password";
    onChange(value: string | undefined): void;
}

export const TextField: FC<Props> = (props: Props) => {

    const [value, setValue] = useState<string | undefined>();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (props.onChange !== undefined ) props.onChange(value);
    }

    return (
        <input type={props.type} className="text-field" placeholder={props.placeholder} name={props.name} onChange={(e) => {handleOnChange(e)}}/>
    )
}

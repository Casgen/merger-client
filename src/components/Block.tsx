import React from 'react'

interface Props {
    imgSrc: string,
    heading: string,
    subHeading: string,
}

export const Block: React.FC<Props> = (props: Props) => {
    return (
        <div className="block">
            <img src={props.imgSrc} alt="Couldn't be loaded"></img>
            <h1>{props.heading}</h1>
            <h2>{props.subHeading}</h2>
        </div>
    )
}


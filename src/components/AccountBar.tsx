import React from 'react'

interface Props {
    src: string,
    name: string
}

const AccountBar = (props: Props) => {

    return (
        <div id="account-bar">
            <img src={props.src} alt="Wasn't found!"></img>
            <h3>{props.name}</h3>
        </div>
    )
}

export default AccountBar

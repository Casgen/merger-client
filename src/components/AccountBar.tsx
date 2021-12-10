import React from 'react'
import "../scss/accountBar.scss"

interface Props {
    src: string,
    name: string
}

const AccountBar: React.FC<Props> = (props: Props) => {

    return (
        <div id="account-bar">
            <div>
                <img src={props.src} alt="Wasn't found!"></img>
            </div>
            <h3>{props.name}</h3>
        </div>
    )
}

export default AccountBar

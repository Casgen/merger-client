import React from 'react'
import { Link } from 'react-router-dom'
import Merger from '../interfaces/Merger'
import { TextField } from './TextField'

/*
    Icons provided by:
    <a href="https://www.flaticon.com/free-icons/youtube" title="youtube icons">Youtube icons created by Freepik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/spotify" title="spotify icons">Spotify icons created by Freepik - Flaticon</a>
*/

interface Props {
    type: Merger.PlayerType.Spotify | Merger.PlayerType.Youtube,
    func: Function
}

export const SearchBar: React.FC<Props> = ({type, func} : Props) => {

    const handleChange = (value: string): void => {
        func(value);
    }    

    return (
        <div id="search-bar">
            <form>
                <TextField id="textfield" onChange={handleChange} type="text"></TextField>
            </form>
            { type === Merger.PlayerType.Spotify ? <Link to="/youtube/search"><img src="/images/youtube.png" alt="Error"></img></Link>
            : <Link to="/spotify/search"><img src="/images/spotify.png" alt="Error"></img></Link>}
        </div>
    )
}



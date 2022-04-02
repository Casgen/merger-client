import React, {ChangeEvent, useState} from 'react'
import {Link} from 'react-router-dom'
import Merger from '../../interfaces/Merger'
import {TextField} from '../TextField'

/*
    Icons provided by:
    <a href="https://www.flaticon.com/free-icons/youtube" title="youtube icons">Youtube icons created by Freepik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/spotify" title="spotify icons">Spotify icons created by Freepik - Flaticon</a>
*/

interface Props {
    type: Merger.PlayerType.Spotify | Merger.PlayerType.Youtube,
    func: Function
}

enum Gradients {
    Spotify = "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,255,94,0.5) 100%)",
    Youtube = "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,0,0,0.5) 100%)"
}

export const SearchBar: React.FC<Props> = ({type, func}: Props) => {

    const [gradient, setGradient] = useState<Gradients | null>();

    const handleLoad = () => {
        if (type === Merger.PlayerType.Spotify) {
            setGradient(Gradients.Spotify);
            return;
        }
        setGradient(Gradients.Youtube);
    }

    const handleChange = (value: string): void => {
        func(value);
    }

    return (
        <div id="search-bar" onLoad={handleLoad} onSubmit={(e: ChangeEvent<HTMLInputElement>) => e.preventDefault()} style={{background: gradient as string}}>
            <form>
                <TextField id="textfield" onChange={handleChange} type="text"></TextField>
            </form>
            {type === Merger.PlayerType.Spotify ?
                <Link to="/youtube/search"><img src="/images/youtube.png" alt="Error"></img></Link>
                : <Link to="/spotify/search"><img src="/images/spotify.png" alt="Error"></img></Link>}
        </div>
    )
}



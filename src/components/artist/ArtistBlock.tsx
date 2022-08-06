import React from "react";
import "../../scss/spotifySearchWindow.scss";
import {Link} from "react-router-dom";
import "../../scss/artists/artistBlock.scss"
import { trimString } from "../../utils/utils";

interface Props {
    artist: SpotifyApi.ArtistObjectFull;
}

export const imageStyle = (img: SpotifyApi.ImageObject) => {

}

export const ArtistBlock: React.FC<Props> = ({artist}: Props) => {
    return (
        <Link className="artist-block" to={`/spotify/artist/${artist.id}`}>
                <div style={{backgroundImage: `url(${artist.images[0] ? artist.images[0].url : '/images/artistimg.png'})`}}/>
                <h3>
                    {trimString(artist.name,22)}
                </h3>
        </Link>
    )
}

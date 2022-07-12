import React from "react";
import "../../scss/spotifySearchWindow.scss";
import {Link} from "react-router-dom";
import "../../scss/artists/artistBlock.scss"

interface Props {
    artist: SpotifyApi.ArtistObjectFull;
}

export const imageStyle = (img: SpotifyApi.ImageObject) => {

}

export const ArtistBlock: React.FC<Props> = ({artist}: Props) => {
    return (
        <Link className="artist-block" to={`/spotify/artist/${artist.id}`}>
                <div style={{backgroundImage: `url(${artist.images[0] && artist.images[0].url})`}}/>
                <h3>
                    {artist.name}
                </h3>
        </Link>
    )
}
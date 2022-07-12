import React from "react";
import {listArtists} from "../../utils/utils";

interface Props {
    album: SpotifyApi.AlbumObjectFull;
}

export const AlbumHeading: React.FC<Props> = ({album} : Props) => {
    return (
        <div id="album-header">
            <div>
                <img src={album?.images[0].url} alt="Couldn't load cover art!"></img>
            </div>
            <div>
                <h1>{album?.name}</h1>
                <h6>{album?.artists && listArtists(album?.artists)}</h6>
            </div>
        </div>
    )
}
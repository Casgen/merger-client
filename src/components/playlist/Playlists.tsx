import {SpotifyPlaylists} from "./SpotifyPlaylists";
import React, {CSSProperties, useEffect, useState} from "react";
import {MergerPlaylist} from "./MergerPlaylist";
import "../../scss/playlists/playlists.scss";

export const Playlists: React.FC = () => {

    const [index, setIndex] = useState<number>(0);

    const backgroundColor: CSSProperties = {backgroundColor: '#1e1e1e'};

    return (
        <div id="playlists">
            <div id="tabs">
                <div style={index === 0 ? backgroundColor : {}} onClick={() => setIndex(0)}>
                    <img src="/images/spotify.png" alt="couldn't load"/>
                </div>
                <div style={index === 1 ? backgroundColor : {}} onClick={() => setIndex(1)}>
                    <img  src="/images/mergericon.png" alt="couldn't load"/>
                </div>
            </div>
            <SpotifyPlaylists display={index === 0 ? 'flex' : 'none'}/>
            <MergerPlaylist display={index === 1 ? 'flex' : 'none'} />

        </div>
    )
}
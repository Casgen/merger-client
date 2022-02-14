import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { AlbumBlock } from '../components/album/AlbumBlock';
import { SearchBar } from '../components/search/SearchBar';
import { TrackRow } from '../components/TrackRow';
import Merger from '../interfaces/Merger';
import "../scss/spotifySearchWindow.scss";

export const SpotifySearchWindow: React.FC = () => {

    const [results, setResults] = useState<SpotifyApi.SearchResponse | null>(null);
    const [typingTimeout, setTypingTimeout] = useState<number>(0);

    const handleSearch = (value: string): void => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout((time: string) => search(value),500));
    }

    const search = (value: string) => {
        axios.get(`https://api.spotify.com/v1/search?q=${value}&type=album,track&&include_external=audio`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('access_token')}`
            }
          }).then((res: AxiosResponse<unknown, any>) => {
            setResults(res.data as SpotifyApi.SearchResponse);
          });
          console.log(results);
    }

    return (
        <div id="spotify-search-window">
            <SearchBar type={Merger.PlayerType.Spotify} func={handleSearch}></SearchBar>
            {

                results !== null && 
                <div id="search-result-container">
                    {
                        results.albums !== undefined && results.albums?.items.length > 0 && 
                        <div id="albums">
                            {
                                results?.albums?.items.map((value: SpotifyApi.AlbumObjectSimplified): JSX.Element => {
                                    return <AlbumBlock key={value.id} album={value}/>
                                })
                            }
                        </div>
                    }

                    {
                        results.tracks !== undefined && results.tracks?.items.length > 0 && 
                        <div id="tracks">
                            {
                                results?.tracks.items.map((value: SpotifyApi.TrackObjectFull): JSX.Element => {
                                    return <TrackRow key={value.id} track={value}/>
                                })
                            }
                        </div>
                    }
                    <div id="artists"></div>
                    <div id="playlists"></div>
                    <div id="shows"></div>
                </div>
            }
        </div>
    )
}

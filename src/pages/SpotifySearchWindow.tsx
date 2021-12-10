import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { AlbumBlock } from '../components/AlbumBlock';
import { TextField } from '../components/TextField';
import { TrackRow } from '../components/TrackRow';
import "../scss/spotifySearchWindow.scss";
import { searchByQuery } from '../utils/spotifyUtils';

interface Props {
    
}

export const SpotifySearchWindow: React.FC = (props: Props) => {

    const [results, setResults] = useState<SpotifyApi.SearchResponse | null>(null);

    const search = async (value: string) => {
        const result: Promise<AxiosResponse<SpotifyApi.SearchResponse, any>> = axios.get(`https://api.spotify.com/v1/search?q=${value}&type=album,track&&include_external=audio`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('access_token')}`
            }
          });
          setResults((await result).data);
          console.log(results);
    }

    return (
        <div id="search-window">
            <div id="search-bar">
                <form>
                    <TextField id="textfield" onChange={(value: string) => search(value)} type="text"></TextField>
                </form>
            </div>
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
                                    return <TrackRow track={value}/>
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

import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { AlbumBlock } from '../components/album/AlbumBlock';
import { SearchBar } from '../components/search/SearchBar';
import { TrackRowMinimal } from '../components/TrackRowMinimal';
import Merger from '../interfaces/Merger';
import "../scss/spotifySearchWindow.scss";
import {ArtistBlock} from "../components/artist/ArtistBlock";

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
        axios.get<SpotifyApi.SearchResponse>(`${process.env.REACT_APP_API_LINK}/spotify/search?q=${value}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('access_token')}`
            }
          }).then((res: AxiosResponse<SpotifyApi.SearchResponse>) => {
            setResults(res.data);
          });
          console.log(results);
    }

    return (
        <div id="spotify-search-window">
            <SearchBar type={Merger.PlayerType.Spotify} func={handleSearch}></SearchBar>
            {

                results !== null && 
                <div id="search-result-container">
                    <h1>Albums</h1>
                    {results.albums !== undefined && results.albums?.items.length > 0 &&
                        <div id="albums">
                            {
                                results?.albums?.items.map((value: SpotifyApi.AlbumObjectSimplified): JSX.Element => {
                                    return <AlbumBlock key={value.id} album={value}/>
                                })
                            }
                        </div>}

                    <h1>Tracks</h1>
                    {results.tracks !== undefined && results.tracks?.items.length > 0 &&
                        <div id="tracks">
                            {results?.tracks.items.map((value: SpotifyApi.TrackObjectFull): JSX.Element => {
                                    return <TrackRowMinimal showArtist={true} key={value.id} track={value}/>
                                })}
                        </div>}
                    <h1>Artists</h1>
                        {results.artists !== undefined && results.artists?.items.length > 0 &&
                        <div id="artists">
                            {results.artists.items.map((value: SpotifyApi.ArtistObjectFull): JSX.Element => {
                                return <ArtistBlock artist={value} key={value.id}/>
                            })}
                        </div>}
                    <div id="playlists"></div>
                    <div id="shows"></div>
                </div>
            }
        </div>
    )
}

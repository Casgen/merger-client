import axios, { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { YoutubeVideoSearchResult } from '../components/YoutubeVideoSearchResult';
import Merger from '../interfaces/Merger';
import "../scss/youtubeSearchWindow.scss";

export const YoutubeSearchWindow: React.FC = () => {

    const [results, setResults] = useState<gapi.client.youtube.SearchListResponse | null>(null);
    const [typingTimeout, setTypingTimeout] = useState<number>(0);

    const handleSearch = (value: string): void => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout((time: number) => search(value),500));
    }

    const search = (value: string) => {
        axios.get(`http://localhost:8080/youtube/search?query=${value}`).then((res: AxiosResponse<unknown, any>) => {
            setResults(res.data as gapi.client.youtube.SearchListResponse);
          });
          console.log(results);
    }

    return (
        <div id="youtube-search-window">
            <SearchBar type={Merger.PlayerType.Youtube} func={(value: string) => handleSearch(value)}></SearchBar>
            {results !== null &&
                <div id="search-result-container">
                    {
                        results.items?.map((video: gapi.client.youtube.SearchResult): JSX.Element => {
                            return <YoutubeVideoSearchResult item={video}/>
                        })
                    }
                </div>
            }
        </div>
    )
}


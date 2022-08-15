import axios, {AxiosResponse} from 'axios'
import React, {useState} from 'react'
import {SearchBar} from '../components/search/SearchBar'
import {YoutubeVideoSearchResult} from '../components/search/YoutubeVideoSearchResult';
import Merger from '../interfaces/Merger';
import "../scss/youtubeSearchWindow.scss";
import {mergerLoadAndPlay} from "../utils/mergerUtils";
import {YoutubePlaylistSearchResult} from "../components/search/YoutubePlaylistSearchResult";

export const YoutubeSearchWindow: React.FC = () => {

    const [results, setResults] = useState<gapi.client.youtube.SearchListResponse | null>(null);
    const [typingTimeout, setTypingTimeout] = useState<number>(0);

    const playVideo = async (uri: gapi.client.youtube.ResourceId): Promise<void> => {
        mergerLoadAndPlay(uri);
    }

    const handleSearch = (value: string): void => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout((time: number) => search(value), 500));
    }

    const search = (value: string) => {
        axios.post<gapi.client.youtube.SearchListResponse>(`${process.env.REACT_APP_API_LINK}/youtube/search?query=${value}`)
            .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
                setResults(res.data);
            });
    }

    const generateResults = (result: gapi.client.youtube.SearchResult): JSX.Element | null => {
        if (result.id?.videoId) return <YoutubeVideoSearchResult
                playVideo={playVideo} key={result.id?.videoId}
                item={result}/>
        if (result.id?.playlistId) return (<YoutubePlaylistSearchResult
			playlistId={result.id.playlistId}
			key={result.id?.playlistId}
			img={result.snippet?.thumbnails?.default?.url} 
			title={result.snippet?.title}/>)

        return null;
    }

    return (
        <div id="youtube-search-window">
            <SearchBar type={Merger.PlayerType.Youtube} func={(value: string) => handleSearch(value)}></SearchBar>
            {results !== null &&
                <div id="search-result-container">
                    {results.items?.map(generateResults)}
                </div>
            }
        </div>
    )
}


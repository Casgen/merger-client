import axios, { AxiosResponse } from 'axios'
import React, { useContext, useState } from 'react'
import { SearchBar } from '../components/search/SearchBar'
import { YoutubeVideoSearchResult } from '../components/search/YoutubeVideoSearchResult';
import { MergerPlayerContext, MergerPlayerContextType } from '../contexts/MergerPlayerContext';
import Merger, { YoutubeOptions } from '../interfaces/Merger';
import YouTubePlayer from "youtube-player";
import "../scss/youtubeSearchWindow.scss";
import { setupYoutubePlayer } from '../utils/mergerUtils';

export const YoutubeSearchWindow: React.FC = () => {

    const [results, setResults] = useState<gapi.client.youtube.SearchListResponse | null>(null);
    const playerContext: MergerPlayerContextType = useContext<MergerPlayerContextType>(MergerPlayerContext);
    const [typingTimeout, setTypingTimeout] = useState<number>(0);

    const playVideo = async (uri: gapi.client.youtube.ResourceId): Promise<void> => {
        if (uri.videoId !== undefined) {
            setupYoutubePlayer(playerContext, uri);
            
            if (playerContext.youtubePlayer !== null) {
                await playerContext.youtubePlayer.cueVideoById(uri.videoId);
                playerContext.youtubePlayer.playVideo();
            }
        }
    }

    const handleSearch = (value: string): void => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout((time: number) => search(value),500));
    }

    const search = (value: string) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/youtube/search?query=${value}`).then((res: AxiosResponse<unknown, any>) => {
            setResults(res.data as gapi.client.youtube.SearchListResponse);
            console.log(results);
          });
    }

    return (
        <div id="youtube-search-window">
            <SearchBar type={Merger.PlayerType.Youtube} func={(value: string) => handleSearch(value)}></SearchBar>
            {results !== null &&
                <div id="search-result-container">
                    {
                        results.items?.map((video: gapi.client.youtube.SearchResult): JSX.Element => {
                            return <YoutubeVideoSearchResult playVideo={(uri: gapi.client.youtube.ResourceId) => playVideo(uri)} key={video.id?.videoId} item={video}/>
                        })
                    }
                </div>
            }
        </div>
    )
}


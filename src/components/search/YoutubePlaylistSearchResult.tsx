import {htmlUnescape} from "escape-goat";
import {Link} from "react-router-dom";
import "../../scss/search/youtubePlaylistSearchResult.scss";
import {getPlaylistItems} from "../../utils/youtubeUtils";
import {useState} from "react";

interface Props {
    result: gapi.client.youtube.SearchResult,
}


export const YoutubePlaylistSearchResult: React.FC<Props> = ({result}: Props) => {

    const loadItems = (): string[] => {

        if (!result.id?.playlistId) return [];

        getPlaylistItems(result.id?.playlistId).then((res) => {
            if (!res.data.items) return [];

            let elements: string[] = [];

            for (let i = 0; i < items.length && i < 2; i++) {
                if (!res.data.items[i].snippet?.title)
                    elements.push(htmlUnescape(res.data.items[i].snippet?.title as string));
            }

            setItems(elements);
        });
        return [];
    }

    const [items, setItems] = useState<string[]>([]);


    return (
        result.id?.playlistId ?
            <Link to={`/youtube/playlist/${result.id.playlistId}`} className="youtube-playlist">
                <div className="thumbnail-div">
                    <img src={result.snippet?.thumbnails?.default?.url} alt="Error!"></img>
                    <h6>P</h6>
                </div>
                <div className="details">
                    <div className="title">
                        <h2>{htmlUnescape(result.snippet?.title as string)}</h2>
                    </div>
                    <div className="items">
                        {loadItems()}
                        {
                            items.map((value) => {
                                return <h6>{value}</h6>
                                
                            })
                        }
                    </div>
                </div>
            </Link> :
            <h2>Error! couldn't load a search result!</h2>

    )
}
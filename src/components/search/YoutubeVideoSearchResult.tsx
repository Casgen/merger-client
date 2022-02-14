interface Props {
    item: gapi.client.youtube.SearchResult,
    key: string | undefined
    playVideo: (uri: gapi.client.youtube.ResourceId) => void;
}


export const YoutubeVideoSearchResult: React.FC<Props> = ({item,playVideo} : Props) => {

    const handleClick = () => {
        if (item.id !== undefined) {
            playVideo(item.id);
            return;
        }
        console.error("URI is invalid! couldn't play given video.");
    }

    return (
        <div className="youtube-video" onClick={handleClick}>
            <div className="thumbnail-div">
                <img src={item.snippet?.thumbnails?.medium?.url} alt="Error!"/>
            </div>
            <div className="details">
                <h2>{item.snippet?.title}</h2>
                <p>{item.snippet?.description}</p>
            </div>
        </div>
    )
}
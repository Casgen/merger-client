interface Props {
    item: gapi.client.youtube.SearchResult;
}


export const YoutubeVideoSearchResult: React.FC<Props> = ({item} : Props) => {


    const playVideo = (): void => {
        let mainWindow = document.getElementById("main-window");
    }

    return (
        <div className="youtube-video" onClick={playVideo}>
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
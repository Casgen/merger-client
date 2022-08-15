import React, {useEffect} from "react";
import {useAppSelector} from "../components/hooks";
import {rootState} from "../App";
import Merger from "../interfaces/Merger";
import "../scss/queuePage.scss";
import {TrackListHeader} from "../components/player/TrackListHeader";
import {SpotifyTrackRow} from "../components/player/SpotifyTrackRow";
import {
    addOtherSongsToQueuePlaylist,
    mergerLoadAndPlay
} from "../utils/mergerUtils";
import {isSpotifyTrackObject, isSpotifyTrackObjectFull} from "../utils/spotifyUtils";
import {YoutubeTrackRow} from "../components/player/YoutubeTrackRow";
import {generateRandomString} from "../utils/utils";

export const QueuePage: React.FC = () => {

    const mergerQueue: Merger.Queue = useAppSelector(rootState).queue;

    const handlePlay = (track: SpotifyApi.TrackObjectSimplified | gapi.client.youtube.Video) => {
        if (isSpotifyTrackObject(track)) {
            addOtherSongsToQueuePlaylist(track.uri, mergerQueue.queue);
        } else if (track.id) {
            addOtherSongsToQueuePlaylist(track.id, mergerQueue.queue);
        } else {
            return console.error("Can not play! Id is undefined!");
        }
        return mergerLoadAndPlay(track);
    }

    const generateRows = (value: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video,
                          index: number): JSX.Element | null => {
        if (index >= mergerQueue.counter) {
            if (isSpotifyTrackObjectFull(value))
                return <SpotifyTrackRow showLike={true} album={value.album} img={value.album.images[2].url}
                                        showArtist={true} onClick={handlePlay} track={value}
                                        key={generateRandomString(14)}/>

            return <YoutubeTrackRow showLike={true} key={generateRandomString(14)} video={value}
                                    handleOnClick={handlePlay}/>
        }
        return null;
    }

    useEffect(() => {

    }, [mergerQueue.queue, mergerQueue.counter])

    return (
        <div id="queue-page">
            <h1>Queue</h1>
            <div id="playlist-table">
                <TrackListHeader/>
                {
                    mergerQueue.queue && mergerQueue.queue.map(generateRows)
                }
            </div>
        </div>
    )
}

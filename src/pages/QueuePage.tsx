import React, {useEffect, useState} from "react";
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
import {isSpotifyTrackObject} from "../utils/spotifyUtils";
import {YoutubeTrackRow} from "../components/player/YoutubeTrackRow";
import {generateRandomString} from "../utils/utils";

export const QueuePage: React.FC = () => {

    const mergerQueue: Merger.Queue = useAppSelector(rootState).queue;

    const handlePlay = (track: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video) => {
        if (isSpotifyTrackObject(track)) {
            addOtherSongsToQueuePlaylist(track.uri, mergerQueue.queue);
            mergerLoadAndPlay(track);
            return;
        }

        if (track.id) {
            addOtherSongsToQueuePlaylist(track.id, mergerQueue.queue);
            mergerLoadAndPlay(track);
            return;
        }
    }

    const generateRows = (value: SpotifyApi.TrackObjectFull | gapi.client.youtube.Video, index: number): JSX.Element | null=> {
        if (index >= mergerQueue.counter) {
            if (isSpotifyTrackObject(value))
                return  <SpotifyTrackRow showAlbum={true} handleOnClick={handlePlay} track={value} key={generateRandomString(14)}/>

            return <YoutubeTrackRow key={generateRandomString(14)} video={value} handleOnClick={handlePlay}/>
        }
        return null;
    }

    useEffect(() => {

    },[mergerQueue.queue, mergerQueue.counter])

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
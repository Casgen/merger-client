import {PlayerTable} from "../components/player/PlayerTable";
import React, {useEffect} from "react";
import {useAppSelector} from "../components/hooks";
import {rootState} from "../App";
import Merger from "../interfaces/Merger";
import "../scss/queuePage.scss";

export const QueuePage: React.FC = () => {

    const mergerQueue: Merger.Queue = useAppSelector(rootState).queue;

    useEffect(() => {

    },[mergerQueue.queue])

    return (
        <div id="queue-page">
            <h1>Queue</h1>
            <PlayerTable content={mergerQueue.queue}/>
        </div>
    )
}
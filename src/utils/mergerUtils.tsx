import axios from "axios";
import { MergerPlayerContextType } from "../contexts/MergerPlayerContext";
import Merger from "../interfaces/Merger";
import { pause, play, spotifySetVolume } from "./spotifyUtils";

export const mergerPlay = (ctx: MergerPlayerContextType, uri: string): void => {
    let spotifyRegExp = new RegExp(/spotify/g);
    if (spotifyRegExp.test(uri) && ctx.spotifyPlayer !== null) {
        play(ctx.spotifyPlayer,[uri])
    }
    return;
}

export const mergerPause = async (ctx: MergerPlayerContextType): Promise<void> => {
    if (ctx !== null) {
        if (ctx.state?.currentPlayer === Merger.PlayerType.Spotify) {
            return pause(ctx.spotifyPlayer);
        }
        return;
    }
    throw new Error(contextError);
}

export const mergerTogglePlayBack = async (ctx: MergerPlayerContextType): Promise<void> => {
    if (ctx.state !== null && ctx.spotifyPlayer !== null) {
        let state = ctx.state;
        if (state.currentPlayer === Merger.PlayerType.Spotify) {
            if (!state.paused) {
                return pause(ctx.spotifyPlayer);
            }
            return play(ctx.spotifyPlayer);
        }
    }
    throw new Error(contextError);
}

export const mergerSetVolume = async (value: number, ctx: MergerPlayerContextType): Promise<void> => {
    if (ctx !== null) {
        if (ctx.spotifyPlayer !== null) {
            ctx.spotifyPlayer.spotify.setVolume(value/100);
            return;
        }
    }
    throw new Error(contextError);
}

export const contextError: string = "Context is null!";
export const fetchError: string = "Fetch failed!";
export const deviceIdIsNullError: string = "Couldn't execute. Device ID is null!";
export const tokenError: string = "No token provied";
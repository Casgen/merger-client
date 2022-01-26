import { MergerPlayerContextType } from "../contexts/MergerPlayerContext";
import Merger from "../interfaces/Merger";
import { play } from "./spotifyUtils";

export function mergerPlay(ctx: MergerPlayerContextType, uri: string): Merger.PlaybackState  {
    let spotifyRegExp = new RegExp("/spotify/");
    if (spotifyRegExp.test(uri)) {
        play(ctx.spotifyPlayer,[uri])?.then(() => {
            ctx.setState({
                currentPlayer: Merger.PlayerType.Spotify,
                currentState: Merger.PlaybackState.Playing,
                currentSong: ctx.spotifyPlayer?.spotify.stat
            });
        })
    } else {

    }
    return;
}
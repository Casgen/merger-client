import React from 'react'

interface Props {
    track: SpotifyApi.TrackObjectFull,
    key: string
    execFunc: VoidFunction
}

// TODO: Seperate the names of the artists, when there are multiple of them (by comma or whitespac)

export const PlayerTableRow: React.FC<Props> = ({track,execFunc}: Props) => {

    const convertToMins = (duration: number) :string => {
        var minutes: number  = Math.floor(duration / 60000);
        var seconds: number  = ((duration % 60000) / 1000);
        return minutes + ":" + (seconds < 10 ? '0' : '') + Math.floor(seconds);
    }

    const handleClick = () => {
        execFunc();
    }

    return (
        <tr onClick={handleClick} className="track-row">
            <td>
                <img src={track.album.images[0].url} alt="Err"></img>
                <h5>{track.name}</h5>
            </td>
            <td>
                {track.artists.map((artist: SpotifyApi.ArtistObjectSimplified, index: number) => {
                    if (index === 0) return <a key={artist.id} href={artist.href}>{artist.name}</a>;
                    return <a key={artist.id} href={artist.href}>, {artist.name}</a>;
                })}
            </td>
            <td>
                <a href={track.album.uri}>{track.album.name}</a>
            </td>
            <td>
                <a href="#">{convertToMins(track.duration_ms)}</a>
            </td>
        </tr>
    )
}

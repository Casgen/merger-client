import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {TrackRowMinimal} from "../components/TrackRowMinimal";
import {ArtistBlock} from "../components/artist/ArtistBlock";
import {AlbumBlock} from "../components/album/AlbumBlock";
import "../scss/spotifyArtistPage.scss";

export const SpotifyArtistPage: React.FC = () => {

    const {id} = useParams<{ id: string | undefined }>();
    const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
    const [topTracks, setTopTracks] = useState<SpotifyApi.ArtistsTopTracksResponse>();
    const [albums, setAlbums] = useState<SpotifyApi.ArtistsAlbumsResponse>();
    const [relatedArtists, setRelatedArtists] = useState<SpotifyApi.ArtistsRelatedArtistsResponse>();

    const loadArtist = () => {
        if (id != undefined) {
            axios.get<SpotifyApi.ArtistObjectFull>(`${process.env.REACT_APP_API_LINK}/spotify/artist/${id}`).then((res: AxiosResponse<SpotifyApi.ArtistObjectFull>) => {
                setArtist(res.data);
            }).catch((err) => {
                if (err.response.data.statusCode === 401) console.log("No Token Provided!");
                console.error("querying for an artist failed!", err);
            });

            axios.get<SpotifyApi.ArtistsTopTracksResponse>(`${process.env.REACT_APP_API_LINK}/spotify/artist/${id}/topTracks`).then((res: AxiosResponse<SpotifyApi.ArtistsTopTracksResponse>) => {
                setTopTracks(res.data);
            }).catch((err) => {
                if (err.response.data.statusCode === 401) console.log("No Token Provided!");
                console.error("Querying for artist's top tracks failed!", err);
            })

            axios.get<SpotifyApi.ArtistsAlbumsResponse>(`${process.env.REACT_APP_API_LINK}/spotify/artist/${id}/albums`).then((res: AxiosResponse<SpotifyApi.ArtistsAlbumsResponse>) => {
                setAlbums(res.data);
            }).catch((err) => {
                if (err.response.data.statusCode === 401) console.log("No Token Provided!");
                console.error("Querying for artist's albums failed!", err);
            })

            axios.get<SpotifyApi.ArtistsRelatedArtistsResponse>(`${process.env.REACT_APP_API_LINK}/spotify/artist/${id}/relatedArtists`).then((res: AxiosResponse<SpotifyApi.ArtistsRelatedArtistsResponse>) => {
                setRelatedArtists(res.data);
            }).catch((err) => {
                if (err.response.data.statusCode === 401) console.log("No Token Provided!");
                console.error("Querying for artist's related artists failed!", err);
            })
        }
    }

    useEffect(() => {
        loadArtist()
    }, [id])

    return (
        <div id="spotify-artist-page">
            <div id="header" style={{backgroundImage: `url(${artist?.images[0].url})`}}>
                <h1>{artist?.name}</h1>
            </div>
            <div id="content">
                <div>
                    <div id="top-tracks">
                        <h2>Top Tracks</h2>
                        <div>
                            {topTracks?.tracks.map((value: SpotifyApi.TrackObjectFull, index: number): JSX.Element => {
                                return <TrackRowMinimal track={value} showArtist={false} key={value.id}/>

                            })}
                        </div>
                    </div>
                    <div id="related-artists">
                        <h2>Related Artists</h2>
                        <div>
                            {relatedArtists?.artists.map((value: SpotifyApi.ArtistObjectFull): JSX.Element => {
                                return <ArtistBlock artist={value} key={value.id}/>
                            })}
                        </div>
                    </div>
                </div>
                <div id="discography">
                    <h2>Discography</h2>
                    <div>
                        {albums?.items.map((value: SpotifyApi.AlbumObjectSimplified) => {
                            return <AlbumBlock album={value} key={value.id}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
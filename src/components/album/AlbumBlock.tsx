import React from 'react'
import { Link } from 'react-router-dom';
import { trimString, listArtists } from '../../utils/utils';
import "../../scss/albums/albumBlock.scss";

interface AlbumBlockProps {
	album: SpotifyApi.AlbumObjectSimplified,
	showArtist?: boolean,
}

export const AlbumBlock: React.FC<AlbumBlockProps> = ({ album, showArtist }: AlbumBlockProps) => {

	return (
		<div className="album-block">
			<img src={album.images[0].url} alt="Error loading!"></img>
			<div>
				<Link className='album-title' to={`/spotify/albums/${album.id}`}>{trimString(album.name, 22)}</Link>
				{ showArtist &&
					<div>
						{listArtists(album.artists)}
					</div>
				}
			</div>
		</div>
	)
}

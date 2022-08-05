
import { htmlUnescape } from "escape-goat";
import { RadioProps } from "../primitive/RadioGroupSpotify";
import "../../scss/playlists/youtubePlaylistradio.scss";

interface Props extends RadioProps {
	title: string | undefined,
	img: string | undefined
}


export const YoutubePlaylistRadio: React.FC<Props> = (props: Props) => {

	const handleClick = () => {
		if (props.onSelect)
			props.onSelect(props.id);
	}

	return (
		<div onClick={handleClick} style={props.selected ? { backgroundColor: '#2e2e2e' } : { backgroundColor: '#00000000' }} className="youtube-radio">
			<img src={props.img} alt="Error!"></img>
			<h2>{props.title && htmlUnescape(props.title)}</h2>
		</div>
	)
}

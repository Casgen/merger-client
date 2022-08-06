
import React, { useEffect, useState } from "react";
import { YoutubePlaylistRadio } from "../playlist/YoutubePlaylistRadio";


interface Pair {
	selected: boolean;
	obj: gapi.client.youtube.SearchResult;
}

interface Props {
	objects: Array<gapi.client.youtube.SearchResult>;
	onSelect?: Function,
}

export const generateMap = (objects: Array<gapi.client.youtube.SearchResult>) => {
	const newMap = new Map<string, Pair>();

	for (const obj of objects) {
		if (obj.id?.playlistId) {
			newMap.set(obj.id?.playlistId,
				{
					selected: false,
					obj
				}
			);
		}
	}

	return newMap;
}

export const RadioGroupYoutube: React.FC<Props> = (props: Props) => {

	const [map, setMap] = useState<Map<string, Pair>>(generateMap(props.objects))
	const [currentKey, setCurrentKey] = useState<string | undefined>();


	const handleSelect = (id: string) => {
		if (currentKey) {
			let pair: Pair | undefined = map.get(currentKey);
			if (pair) pair.selected = false;
		}

		let pair: Pair | undefined = map.get(id);
		if (pair) pair.selected = true;
		setCurrentKey(id);

		if (props.onSelect) props.onSelect(pair?.obj);
	}

	const init = (): JSX.Element[] => {
		let elements: JSX.Element[] = [];

		map.forEach((value: Pair, key: string) => {
			elements.push(
				<YoutubePlaylistRadio
					title={value.obj.snippet?.title}
					id={key}
					key={key}
					selected={value.selected}
					onSelect={handleSelect}
					img={value.obj.snippet?.thumbnails?.default?.url} />
			)
		})

		return elements;

	}

	useEffect(() => {
		setMap(generateMap(props.objects));
	}, [props.objects])

	return (
		<>
			{init()}
		</>
	)
}

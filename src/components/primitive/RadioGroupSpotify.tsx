import React, { useEffect, useState } from "react";
import { SpotifyPlaylistRow } from "../merger/SpotifyPlaylistRow";

export interface RadioProps {
	onSelect?: Function,
	id?: string
	selected?: boolean;
}

interface Pair {
	selected: boolean;
	obj: SpotifyApi.PlaylistObjectSimplified
}

interface Props {
	objects: Array<SpotifyApi.PlaylistObjectSimplified>;
	onSelect?: Function,
}

export const generateMap = (objects: Array<SpotifyApi.PlaylistObjectSimplified>) => {
	const newMap = new Map<string, Pair>();

	for (const obj of objects) {
		newMap.set(obj.id,
			{
				selected: false,
				obj
			}
		);
	}

	return newMap;
}

export const RadioGroupSpotify: React.FC<Props> = (props: Props) => {

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

	const generateRows = (): JSX.Element[] => {

		let elements: JSX.Element[] = [];

		map.forEach((value: Pair, key: string) => {
			elements.push(
				<SpotifyPlaylistRow id={key} key={key} onSelect={handleSelect} playlist={value.obj} selected={value.selected} />
			)
		})

		return elements;

	}

	useEffect(() => {
		setMap(generateMap(props.objects));
	}, [props.objects])


	return (
		<>
			{generateRows()}
		</>
	)
}

import { Link } from "react-router-dom";
import React from "react";
import moment from "moment";
import "moment-duration-format"

export const convertNumberToDuration = (duration: number): string => {
	var minutes: number = Math.floor(duration / 60000);
	var seconds: number = ((duration % 60000) / 1000);
	return minutes + ":" + (seconds < 10 ? '0' : '') + Math.floor(seconds);
}

export const convertStringToDuration = (duration: string): string | undefined => {
	//ex. PT2H15M33S
	var dur = moment.duration(duration);
	return dur.format("HH:mm:ss");
}

export const trimString = (value: string, numOfChars: number): string => {
	if (value.length > numOfChars) {
		return value.substring(0, numOfChars) + "...";
	}
	return value;
}

export const generateRandomString = (length: number) => {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const listArtists = (artists: SpotifyApi.ArtistObjectSimplified[]): JSX.Element[] => {
	let elements: Array<JSX.Element> = Array();

	for (let i: number = 0; i < artists.length; i++) {
		if (i === 0) {
			elements.push(<Link className='artist-title' key={artists[i].id} to={artists[i].href}>{artists[i].name}</Link>);
			continue;
		}
		elements.push(<span>, </span>);
		elements.push(<Link className='artist-title' key={artists[i].id} to={artists[i].href}>{artists[i].name}</Link>);
	}
	return elements;
}

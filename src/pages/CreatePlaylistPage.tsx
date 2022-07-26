import axios from "axios";
import React, { useState } from "react";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
import Merger from "../interfaces/Merger";
import { useHistory } from "react-router-dom";
import "../scss/playlists/createPlaylist.scss";


export const CreatePlaylistPage: React.FC = () => {

	const history = useHistory();

	const [title, setTitle] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>("");

	const handleSubmit = () => {
		axios.put(`${process.env.REACT_APP_API_LINK}/merger/createPlaylist`, {
			title, desc
		}, {withCredentials: true}).then((res) => {
			let newPlaylist: Merger.Playlist = res.data as Merger.Playlist;
			history.push(`/merger/playlist/${newPlaylist.id}`);
		}).catch((err) => {
			if (err.response.status as number === 403) return setErrorMsg(err.response.data.message);
		})
	}

	return (
		<div id="create-playlist-window">
			<h2>Create a new playlist</h2>
			<form onSubmit={handleSubmit}>
				<h6>Title</h6>
				<TextField placeholder={"Your title"} type={"text"} value={title} onChange={setTitle} />
				<h6>Description</h6>
				<TextArea placeholder={"Your description here"} value={desc} onChange={setDesc} />
				<input id="submit-btn" type="submit" value="Create a playlist" />
			</form>
			<div style={errorMsg ? { display: "block" } : { display: "none" }} id="response-box">
				{errorMsg}
			</div>
		</div>
	)
}

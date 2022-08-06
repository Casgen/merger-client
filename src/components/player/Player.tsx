import React, { useEffect, useState } from "react";
import "../../scss/playerButton.scss";
import PlayerButton from "./PlayerButton";
import InfoPlayerContainer from "./InfoPlayerContainer";
import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";
import { initializationError, mergerNextSong, mergerPrevSong, mergerTogglePlayBack } from "../../utils/mergerUtils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { rootState, store } from "../../App";
import Merger from "../../interfaces/Merger";
import { ActionTypeDeviceID } from "../features/deviceId/deviceIdSlice";
import {
	getSpotifyAccessToken,
	spotifySeek, spotifyUpdateState, updatePlaybackState,
	waitForSpotifyWebPlaybackSDKToLoad
} from "../../utils/spotifyUtils";
import { Link } from "react-router-dom";

let stateImg = {
	pause: "/images/PauseButton.svg",
	play: "/images/PlayButton.svg"
}

export const Player: React.FC = () => {

	const mergerState = useAppSelector(rootState); // this is used as a reference!
	const dispatcher = useAppDispatch();
	const [SDK, setSDK] = useState<Spotify.Player | undefined>();

	const initPlayer = async () => {
		console.log("Initializing player");

		const spotifyScript = document.createElement("script");
		spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
		spotifyScript.async = true;
		document.body.appendChild(spotifyScript);

		await waitForSpotifyWebPlaybackSDKToLoad();
		let spotifyPlayer = new Spotify.Player({
			name: "Merger",
			getOAuthToken: (cb: (token: string) => void) => {
				getSpotifyAccessToken().then((token: string) => {
					cb(token);
				}).catch((err) => {
					console.error("failed to obtain the access token! SDK can not be initialized!", err);
				})
			},
			volume: 0.5,
		});
		spotifyPlayer.addListener("initialization_error", ({ message }: { message: string }) => {
			console.log(message);
		});
		spotifyPlayer.addListener("authentication_error", ({ message }: { message: string }) => {
			console.log(message);
		});
		spotifyPlayer.addListener("account_error", ({ message }: { message: string }) => {
			console.log(message);
		});
		spotifyPlayer.addListener("playback_error", ({ message }: { message: string }) => {
			console.log(message);
		});
		spotifyPlayer.addListener("account_error", ({ message }: { message: string }) => {
			console.error("Failed to validate Spotify account", message);
		});
		spotifyPlayer.addListener('player_state_changed', (state) => {
			spotifyUpdateState(state);
		});
		spotifyPlayer.addListener("ready", ({ device_id }) => {
			dispatcher({ type: ActionTypeDeviceID.SET_DEVICE_ID, payload: device_id });
			console.log("Ready with Device ID", device_id);
		});
		spotifyPlayer.connect().then((res) => res ? console.log("Spotify Connected.") : console.error("Spotify couldn't connect!"));
		setSDK(spotifyPlayer);
	};

	

	const setProgress = async (value: number) => {
		if (mergerState.state.currentPlayer !== undefined) {
			if (mergerState.state.currentPlayer === Merger.PlayerType.Spotify) {
				if (SDK) {
					await spotifySeek(value);
					updatePlaybackState();
					return;
				}
				throw new Error(initializationError)
			}

			if (window.youtubePlayer) {
				window.youtubePlayer.seekTo(Math.round(value / 1000), true);
				return;
			}
		}
		throw new Error(initializationError);
	}

	const setVolume = (value: number) => {
		if (store.getState().state.currentPlayer !== undefined) {
			if (store.getState().state.currentPlayer === Merger.PlayerType.Spotify) {
				if (SDK) {
					SDK.setVolume(value / 100);
					return;
				}
				throw new Error(initializationError)
			}

			if (window.youtubePlayer !== undefined) {
				window.youtubePlayer.setVolume(value);
				return;
			}
		}
		throw new Error(initializationError)
	}

	const disconnectSpotify = () => {
		if (window.Spotify !== undefined) window.Spotify.Player.prototype.disconnect()
	}

	useEffect(() => {
		initPlayer();
		return disconnectSpotify();
	}, []);

	return (
		<div id="player">
			<InfoPlayerContainer />
			<div>
				<div id="player-buttons-container">
					<PlayerButton disabled={!mergerState.state.previousSong} id="prev-button"
						src="/images/PrevButton.png" execFunc={mergerPrevSong} />
					<PlayerButton disabled={false} src={mergerState.state.paused ? stateImg.play : stateImg.pause}
						text="Toggle Play"
						id="play-button" execFunc={mergerTogglePlayBack} />
					<PlayerButton disabled={!mergerState.state.nextSong} id="next-button"
						src="/images/NextButton.png" execFunc={mergerNextSong} />
				</div>
				<ProgressBar func={setProgress} />
			</div>
			<div>
				<Link to={"/queue"}>
					<img src="/images/queueIcon.png" alt="error" />
				</Link>
			</div>
			<VolumeSlider isDisabled={!store.getState().state.currentPlayer} func={(value: number) => setVolume(value)} />
		</div>
	);
}

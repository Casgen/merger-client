import { BrowserHistory, createBrowserHistory } from 'history'
import React, { useState } from 'react';
import { store } from '../App';
import ShrinkButton from '../components/ShrinkButton';
import Merger from '../interfaces/Merger';

export const history: BrowserHistory = createBrowserHistory();

/**
 * The Home Page acts as a main window for the content, where the content changes. Under these routes, the useParams() hook can be used
 * @returns 
 */

interface Props {
	children: JSX.Element
}

export const MainWindow: React.FC<Props> = (props: Props) => {

	const [currentPlayer, setCurrentPlayer] = useState<Merger.PlayerType | undefined>();

	const updateType = () => {
		setCurrentPlayer(store.getState().state.currentPlayer)		
	}

	store.subscribe(updateType)


	return (
		<div id="main-window">
			<ShrinkButton />
			<div id="youtube-container">
				<div id="blocking-overlay" style={window.youtubePlayer && currentPlayer === Merger.PlayerType.Spotify ? {display:"flex"} : {display:'none'}}>
					<h3>
						Spotify is currently playing...
					</h3>
				</div>
				<div id="youtube-player-window">
				</div>
			</div>
			{props.children}
		</div>
	)
}

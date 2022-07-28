import { BrowserHistory, createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { Player } from "../components/player/Player";
import SideBar from "../components/SideBar";
import "../scss/index.scss";
import { Home } from "../pages/Home";
import { MainWindow } from "../pages/MainWindow";
import PlaylistWindow from "../pages/PlaylistWindow";
import { SpotifySearchWindow } from "../pages/SpotifySearchWindow";
import { YoutubeSearchWindow } from "../pages/YoutubeSearchWindow";
import { SpotifyAlbumPage } from "../pages/SpotifyAlbumPage";
import React from "react";
import { SpotifyArtistPage } from "../pages/SpotifyArtistPage";
import { QueuePage } from "../pages/QueuePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { CreatePlaylistPage } from "../pages/CreatePlaylistPage";
import { MergerPlaylistPage } from "../pages/MergerPlaylistPage";
import { LikedSongsPage } from "../pages/LikedSongsPage";

export const history: BrowserHistory = createBrowserHistory();

/**
 * In order to pass parameters to a link, the rendered component has to be placed as a child of the route!
 * For keeping the same components throughout the app (SideBar, NavBar etc.) they have to placed beside the switch and inside the BrowserRouter or else it won't render
 * It is also needed to take into account the location of css files to apply styles properly
 */

export const Routes: React.FC = () => (
	<BrowserRouter>
		<div id="main-container">
			<div id="horizontal-container">
				<SideBar>
				</SideBar>
				<MainWindow>
					<Switch>
						<Route exact path="/createPlaylist" component={CreatePlaylistPage}/>
						<Route exact path="/register" component={RegisterPage}/>
						<Route exact path="/login" component={LoginPage}/>
						<Route exact path="/" component={Home}/>
						<Route exact path="/likedSongs" component={LikedSongsPage}/>
						<Route exact path="/merger/playlist/:id">
							<MergerPlaylistPage/>
						</Route>
						<Route path="/playlist/:id">
							<PlaylistWindow></PlaylistWindow>
						</Route>
						<Route path="/spotify/album/:id">
							<SpotifyAlbumPage></SpotifyAlbumPage>
						</Route>
						<Route path="/spotify/search">
							<SpotifySearchWindow />
						</Route>
						<Route path="/youtube/search">
							<YoutubeSearchWindow />
						</Route>
						<Route path="/spotify/artist/:id">
							<SpotifyArtistPage />
						</Route>
						<Route path="/queue">
							<QueuePage />
						</Route>
					</Switch>
				</MainWindow>
			</div>
			<Player></Player>
		</div>
	</BrowserRouter>
)

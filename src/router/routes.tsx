import { BrowserHistory, createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { Login } from "../components/Login";
import { Player } from "../components/Player";
import SideBar from "../components/SideBar";
import "../css/index.css";
import { Home } from "../pages/Home";
import { MainWindow } from "../pages/MainWindow";
import PlaylistWindow from "../pages/PlaylistWindow";

export const history: BrowserHistory = createBrowserHistory();

/**
 * In order to pass parameters to a link, the rendered component has to be placed as a child of the route!
 * For keeping the same components throughtout the app (SideBar, NavBar etc.) they have to placed beside the switch and inside the BrowserRouter or else it won't render
 * It is also needed to take into account the location of css files to apply styles properly
 */

export const Routes: React.FC = () => (
    <BrowserRouter>
        <div id="main-container">
            <div id="horizontal-container">
                <SideBar>
                    <Login></Login>
                </SideBar>
                <MainWindow> 
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/playlist/:id">
                                <PlaylistWindow></PlaylistWindow>
                            </Route>
                        </Switch>
                </MainWindow>
                </div>
                <Player></Player>
        </div>
    </BrowserRouter>
)
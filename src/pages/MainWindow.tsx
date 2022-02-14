import { BrowserHistory, createBrowserHistory } from 'history'
import React from 'react';
import ShrinkButton from '../components/ShrinkButton';

export const history: BrowserHistory = createBrowserHistory();

/**
 * The Home Page acts as a main window for the content, where the content changes. Under these routes, the useParams() hook can be used
 * @returns 
 */

interface Props {
    children: JSX.Element
}

export const MainWindow: React.FC<Props> = (props: Props) => {
    return (
        <div id="main-window">
            <ShrinkButton/>
            <div id="youtube-player-window">
            </div>
            {props.children}
        </div>
    )
}

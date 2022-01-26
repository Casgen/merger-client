import { BrowserHistory, createBrowserHistory } from 'history'
import React from 'react';

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
            {props.children}
        </div>
    )
}

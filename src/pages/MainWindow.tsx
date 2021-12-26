import { BrowserHistory, createBrowserHistory } from 'history'
import YouTube from 'react-youtube';
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
    const opts: Merger.YoutubePlayerOpts = {
        height: '480',
        width: '640',
        playerVars: {
            autoplay: 0,
            enablejsapi: 1,
        }
    };

    return (
        <div id="main-window">
            {props.children}
            <YouTube id="youtube-player" opts={opts} videoId='EUwynJ-WHGo'>
            </YouTube>
        </div>
    )
}

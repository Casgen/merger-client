import "../scss/login.scss";
import axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";


export const Login: React.FC = () => {

    const generateRandomString = (length: number) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    const handleLogin = () => {

        let state = generateRandomString(16);

        let clientId = '9d7f011011854653b50175a281ba4d65';
        let scope = 'user-read-private user-read-email';
        let redirectUri = 'http://localhost:3000/callback'

        let authUrl: string | Location = 'https://accounts.spotify.com/authorize';
        authUrl += '?response_type=token';
        authUrl += '&client_id=' + encodeURIComponent(clientId);
        authUrl += '&scope=' + encodeURIComponent(scope);
        authUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);
        authUrl += '&state=' + encodeURIComponent(state);

        window.location.replace(authUrl);
    }

    return (
        <a id="login-button" onClick={handleLogin}>
            Login
        </a>
    )
}

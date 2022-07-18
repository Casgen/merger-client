import "../scss/login.scss";


export const Login: React.FC = () => {

    return (
        <a id="login-button" href={`${process.env.REACT_APP_API_LINK}/spotify/auth/login`}>
            Login
        </a>
    )
}

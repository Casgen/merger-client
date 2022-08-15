import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export const Callback: React.FC = () => {

    const history = useHistory();

    const getHashParams = () => {
        let hashParams: any = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    useEffect( () => {
        let params = getHashParams();

        localStorage.setItem("access_token", params.access_token);
        history.push("/");
    },[])

    return (<></>)
}
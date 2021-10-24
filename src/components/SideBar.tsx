import axios, { Axios, AxiosResponse } from 'axios';
import React, {useState, useEffect} from 'react'
import AccountBar from './AccountBar';
import { Login } from './Login';
import PlaylistList from './PlaylistList';
import Cookies from "js-cookie";

interface Props {

}

export const SideBar: React.FC = (props: Props) => {

  const [userInfo, setUserInfo] = useState<SpotifyApi.UserObjectPublic | undefined>();

  const fetchUserInfo = () :void => {
    axios.get("http://localhost:8080/spotify/me", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response: AxiosResponse) => {
      setUserInfo(response.data as SpotifyApi.UserObjectPublic); //Cast response to UserObjectPublic
    })
  }

  const accountComp = () :JSX.Element => {
    if (userInfo && userInfo.display_name && userInfo.images && userInfo.images[0].url !== undefined) {
      return <AccountBar src={userInfo.images[0].url}name={userInfo.display_name}></AccountBar>;
    }
    return <Login></Login>;
  }

  useEffect(() => {
    fetchUserInfo();
  }, [])

  return (
    <div id="side-bar">
      {accountComp()}
      <PlaylistList></PlaylistList>
    </div>
  )
}

export default SideBar;

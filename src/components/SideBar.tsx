import axios, { Axios, AxiosResponse } from 'axios';
import React, {useState, useEffect} from 'react'
import AccountBar from './AccountBar';
import { Login } from './Login';
import { PlaylistList } from './PlaylistList';
import { SearchButton } from './SearchButton';

interface Props {

}

export const SideBar: React.FC = (props: Props) => {

  const [userInfo, setUserInfo] = useState<SpotifyApi.UserObjectPublic | undefined>();

  async function fetchUserInfo() {
    const response: Promise<AxiosResponse<unknown, any>> = axios.get('http://localhost:8080/spotify/me',{withCredentials: true}); 
    setUserInfo((await response).data as SpotifyApi.UserObjectPrivate); //Cast response to UserObjectPublic
  }

  const accountComp = () :JSX.Element => {
    if (userInfo !== undefined && userInfo.display_name) {
      if (userInfo.images !== undefined && userInfo.images.length > 0) {
        return <AccountBar src={userInfo.images[0].url}name={userInfo.display_name}></AccountBar>;
      }
      return <AccountBar src="/images/defaultUser.svg"name={userInfo.display_name}></AccountBar>
    }
    return <Login></Login>;
  }

  useEffect(() => {
    fetchUserInfo();
  }, [])

  return (
    <div id="side-bar">
      {accountComp()}
      <SearchButton/>
      <PlaylistList/>
    </div>
  )
}

export default SideBar;

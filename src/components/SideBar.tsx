import axios, { AxiosResponse } from 'axios';
import React, {useState, useEffect} from 'react'
import AccountBar from './account/AccountBar';
import { Login } from './Login';
import { PlaylistList } from './playlist/PlaylistList';
import { SearchButton } from './search/SearchButton';

const useForceUpdate = () => {
  const [value, setValue] = useState<number>(0);
  return () => setValue(value => value + 1);
}

export const SideBar: React.FC = () => {

  const forceUpdate = useForceUpdate();
  const [userInfo, setUserInfo] = useState<SpotifyApi.UserObjectPublic | undefined>();

  async function fetchUserInfo() {
    const response: Promise<AxiosResponse<SpotifyApi.UserObjectPrivate>> = axios.get(`${process.env.REACT_APP_API_LINK}/spotify/me`);
    setUserInfo((await response).data);
  }

  const accountComp = () :JSX.Element => {
    if (userInfo !== undefined && userInfo.display_name) {
      if (userInfo.images !== undefined && userInfo.images.length > 0) {
        return <AccountBar src={userInfo.images[0].url} name={userInfo.display_name}></AccountBar>;
      }
      return <AccountBar src="/images/defaultUser.svg" name={userInfo.display_name}></AccountBar>
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

import React, { useState } from 'react'


const ShrinkButton: React.FC = () => {

    const [isShrunk, setIsShrunk] = useState<boolean>(false);
    const [shrunkImg, setShrunkImg] = useState<'minimize' | 'maximize'>('minimize');
    const [scrollValue, setScrollValue] = useState<number>(0);

    const handleClick = () => {
        let playerWindow = document.getElementById("youtube-player-window");
        let mainWindow = document.getElementById("main-window");

        if (playerWindow !== null && mainWindow) {
            if (isShrunk) {
                playerWindow.style.width = "100%";
                playerWindow.style.height = "100%";
                playerWindow.style.position = "absolute";
                mainWindow.style.overflowY = "hidden";
                setScrollValue(mainWindow.scrollTop);
                mainWindow.scrollTo(0,0);
                setIsShrunk(false);
                setShrunkImg('minimize');
                return;
            }

            mainWindow.scrollTo(0,scrollValue);
            playerWindow.style.width ="320px";
            playerWindow.style.height = "240px";
            mainWindow.style.overflowY = "auto";
            setTimeout(() => { if (playerWindow !== null) playerWindow.style.position = "fixed"}, 500)
            setIsShrunk(true);
            setShrunkImg('maximize');
        }
    }


  return (
    <img id="minimize" onClick={handleClick} src={`/images/${shrunkImg}.svg`} alt="Error"></img>
  )
}

export default ShrinkButton
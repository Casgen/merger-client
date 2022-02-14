import React, { useState } from 'react'


const ShrinkButton: React.FC = () => {

    const [isShrunk, setIsShrunk] = useState<boolean>(false);
    const [shrunkImg, setShrunkImg] = useState<'minimize' | 'maximize'>('minimize');

    const handleClick = () => {
        let playerWindow = document.getElementById("youtube-player-window");

        if (playerWindow !== null) {
            if (isShrunk) {
                playerWindow.style.width = "88%";
                playerWindow.style.height = "87%";
                setIsShrunk(false);
                setShrunkImg('minimize');
                return;
            }

            playerWindow.style.width ="320px";
            playerWindow.style.height = "240px";
            playerWindow.style.right = "0";
            setIsShrunk(true);
            setShrunkImg('maximize');
        }
    }


  return (
    <img id="minimize" onClick={handleClick} src={`/images/${shrunkImg}.svg`} alt="Error"></img>
  )
}

export default ShrinkButton
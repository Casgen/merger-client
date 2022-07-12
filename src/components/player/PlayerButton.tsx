import React from "react";

interface Props {
  text?: string,
  execFunc: Function;
  src?: string,
  width?: number,
  height?: number;
  id: string;
  disabled: boolean;
}

export const PlayerButton: React.FC<Props> = (props: Props) => {

  const handleClick = () => {
    props.execFunc();
  }

  return <button disabled={props.disabled} className="player-button" id={props.id} onClick={handleClick}>
          <img src={props.src} alt="X"></img>
        </button>;
}

export default PlayerButton;

import React from "react";

interface Props {
  children: JSX.Element;
}

export const MainWindow: React.FC<Props> = (props: Props) => {
  return <div id="main-window">
    {props.children}
  </div>;
}

export default MainWindow;

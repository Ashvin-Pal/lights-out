import React from "react";
import "./Box.css";

const Box = (props) => {
    const { toggle } = props;
    let className = "Box Box-off";
    if (toggle) className = "Box Box-on";
    return <div className={className}></div>;
};

export default Box;

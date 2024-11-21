import React from "react";
import '../styles.css'



const GameCircle = ({id, className, onCircleClicked}) => {
   
    return (
        <div className={`gameCircle no-player ${className}`} onClick = { () => onCircleClicked(id) }>
        </div>
    );
}

export default GameCircle;
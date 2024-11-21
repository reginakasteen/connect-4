import React from "react";
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from "../constants";

const Header = ({gameState, currentPlayer, winPlayer}) => {

    const renderLabel = () => {

        switch (gameState) {
            case GAME_STATE_PLAYING:
                return <p className="header-text">Player {currentPlayer} Turn</p>
            case GAME_STATE_WIN:
                return <p className="header-text">Player {winPlayer} Wins</p>
            case GAME_STATE_DRAW:
                return <p className="header-text">Game is a Draw</p>
            default:
        }
        
    }
    return (
        <div className="panel header">
            <div className="header-text">{renderLabel()}</div>
            </div>
    );
}

export default Header;
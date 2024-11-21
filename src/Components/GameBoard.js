import React, {useEffect, useState} from "react";
import * as Constants from "../constants.js";
import Header from "./Header.js"
import Footer from "./Footer.js";
import GameCircle from "./GameCircle.js";
import { isWinner, isDraw, getComputerMove } from "../counter.js";
import '../styles.css'




const GameBoard = () => {

    const [gameBoard, setGameBoard] = useState(Array(16).fill(Constants.NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(Constants.PLAYER_1);
    const [gameState, setGameState] = useState(Constants.GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(Constants.NO_PLAYER);

    useEffect(() => {
        initGame();
    }, []);


    const initGame = () => {
        console.log('init');
        setGameBoard(Array(16).fill(Constants.NO_PLAYER));
        setCurrentPlayer(Constants.PLAYER_1);
        setGameState(Constants.GAME_STATE_PLAYING);
    };


    const initBoard = () => {
        const circles = [];

        for (let i = 0; i < 16; i++) {

            circles.push(renderCircle(i));
        }
        return circles;
    };

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    };

    const circleClicked = (id) => {

        if (gameBoard[id] !== Constants.NO_PLAYER) return;
        if (gameState !== Constants.GAME_STATE_PLAYING) return;

        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(Constants.GAME_STATE_DRAW);
            setWinPlayer(Constants.NO_PLAYER);
            console.log("Winner");
        } 

        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(Constants.GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
            console.log("Winner");
        }        

        setGameBoard(previous => {
            return previous.map((circle, position) => {
                if (position === id ) return currentPlayer;
                return circle;
            });
        });

        setCurrentPlayer(currentPlayer === Constants.PLAYER_1 ? Constants.PLAYER_2 : Constants.PLAYER_1);
        console.log(gameBoard);
    };

    const renderCircle = id => {
        return <GameCircle key={id} id={id} className={`player${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    };

    return (
            <>
                <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
                <div className="gameBoard">
                    {initBoard()}
                </div>
                <Footer onNewGameClick={initGame}  onSuggestClick={suggestMove} gameState={gameState}/>
            </>);
};

export default GameBoard;
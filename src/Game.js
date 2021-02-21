import React, { useState, useEffect } from "react";
import Box from "./Box";
import "./Game.css";

const Game = (props) => {
    const column = 5;
    const rows = 5;
    const [toggle, setToggle] = useState([]);
    const [won, setWon] = useState(false);

    const createBoard = (col, row) => {
        let mainArray = [];
        for (let i = 0; i < col; i++) {
            mainArray.push([]);
            for (let j = 0; j < row; j++) {
                mainArray[i].push(Math.random() < 0.3);
                // mainArray[i].push(false);
            }
        }
        return mainArray;
    };

    useEffect(() => {
        setToggle(createBoard(column, rows));
    }, []);

    const flipBool = (i, j) => {
        if (i >= 0 && i < column && j >= 0 && j < rows) {
            toggle[i][j] = !toggle[i][j];
        }
    };

    const checkAllFalse = () => {
        return toggle.every((row) => row.every((box) => !box));
    };

    const restartGame = () => {
        setToggle(createBoard(column, rows));
        setWon(false);
    };

    const flipBooleans = (i, j) => {
        toggle[i][j] = !toggle[i][j];
        flipBool(i - 1, j);
        flipBool(i + 1, j);
        flipBool(i, j - 1);
        flipBool(i, j + 1);
        setWon(checkAllFalse());
        setToggle([...toggle]);
    };

    const grid = toggle.map((x, i) => (
        <tr key={i}>
            {x.map((y, j) => (
                <th key={`${i}-${j}`} onClick={() => flipBooleans(i, j)}>
                    <Box toggle={toggle[i][j]} />
                </th>
            ))}
        </tr>
    ));

    if (won)
        return (
            <div>
                <h1>You won!</h1>
                <button onClick={restartGame}>Play again</button>
            </div>
        );
    return (
        <div>
            <table className="Game">
                <tbody>{grid}</tbody>
            </table>
            <button onClick={restartGame}>Restart</button>
        </div>
    );
};

export default Game;

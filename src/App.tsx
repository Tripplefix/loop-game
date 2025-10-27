import { useState, useEffect, CSSProperties } from 'react';
import './index.css';
import Utilities from "./gameUtilities";
import Form from './form';
import { GameConfig } from './types';
import { PieceType } from './constants/enums';

interface SquareProps {
    form: Form;
    onClick: () => void;
}

function Square({ form, onClick }: SquareProps) {
    const squareRotation: CSSProperties = {
        transform: `rotate(${form.rotation}deg)`,
        willChange: 'transform',
    };

    return (
        <button 
            className="square"
            style={squareRotation} 
            onClick={onClick}
        >
            {form.figure}
        </button>
    );
}

interface BoardProps {
    squares: Form[];
    onClick: (index: number) => void;
    cols: number;
    rows: number;
}

function Board({ squares, onClick, cols, rows }: BoardProps) {
    const renderSquare = (i: number) => {
        return (
            <Square
                key={i}
                form={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    };

    const rows_elements = squares.map((_, index) => renderSquare(index));

    const boardStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 50px)`,
        gridTemplateRows: `repeat(${rows}, 50px)`,
    };

    return <div style={boardStyle}>{rows_elements}</div>;
}

function Game() {
    const [level, setLevel] = useState(0);
    const [solved, setSolved] = useState(false);
    const [squares, setSquares] = useState<Form[] | null>(null);
    const [game, setGame] = useState<GameConfig | null>(null);
    const [statusText, setStatusText] = useState("");

    useEffect(() => {
        loadNextGame();
    }, []);

    const changeThemeColor = (color: string): void => {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor?.setAttribute("content", color);
    };

    const updateSolved = (colCount: number, squares: Form[], i: number): void => {
        if (squares[i] === undefined || squares[i].type === PieceType.EMPTY) return;

        // we assume solved and set false later if that is not the case
        squares[i].solved = true;

        // compare top
        if (squares[i].connectors.top) {
            if (!squares[i - colCount] ||
                squares[i - colCount].type === PieceType.EMPTY ||
                !squares[i - colCount].connectors.bottom)
                squares[i].solved = false;
        }

        // compare right
        if (squares[i].connectors.right) {
            if (!squares[i + 1] ||
                squares[i + 1].type === PieceType.EMPTY ||
                !squares[i + 1].connectors.left)
                squares[i].solved = false;
        }

        // compare bottom
        if (squares[i].connectors.bottom) {
            if (!squares[i + colCount] ||
                squares[i + colCount].type === PieceType.EMPTY ||
                !squares[i + colCount].connectors.top)
                squares[i].solved = false;
        }

        // compare left
        if (squares[i].connectors.left) {
            if (!squares[i - 1] ||
                squares[i - 1].type === PieceType.EMPTY ||
                !squares[i - 1].connectors.right)
                squares[i].solved = false;
        }
    };

    const calculateSolved = (squares: Form[]): boolean => {
        const solvedList = squares.map((square) => square.solved);
        return !solvedList.includes(false);
    };

    const handleClick = (i: number): void => {
        if (solved || !squares || !game) return;

        const newSquares = squares.slice();
        newSquares[i].rotate();

        const cols = game.cols;

        // we need to update not only the current square but also the adjacent ones
        updateSolved(cols, newSquares, i); // current square
        updateSolved(cols, newSquares, i + 1); // right neighbour
        updateSolved(cols, newSquares, i - 1); // left neighbour
        updateSolved(cols, newSquares, i - cols); // top neighbour
        updateSolved(cols, newSquares, i + cols); // bottom neighbour

        setSquares(newSquares);

        const isSolved = calculateSolved(newSquares);

        if (isSolved) {
            setSolved(true);
            setStatusText(Utilities.getRandomText());
        }
    };

    const loadNextGame = (): void => {
        let newGame: GameConfig;
        const nextLevel = level + 1;

        if (nextLevel < 6) {
            newGame = Utilities.getStaticLevel(nextLevel);
        } else {
            newGame = Utilities.generateRandomBoard();
        }

        changeThemeColor(newGame.bg);

        const newSquares = newGame.board.map((type) => new Form(type));

        for (let i = 0; i < newSquares.length; i++) {
            updateSolved(newGame.cols, newSquares, i);
        }

        setGame(newGame);
        setSolved(false);
        setSquares(newSquares);
        setLevel(nextLevel);
        setStatusText("");
    };

    if (!squares || !game) return <div>loading..</div>;

    let boardStyle: CSSProperties = {
        backgroundColor: game.bg,
        color: game.color,
        fill: game.color,
    };

    let btnNextGame: React.ReactElement | null = null;
    if (solved) {
        btnNextGame = (
            <button onClick={() => loadNextGame()}>Load next game</button>
        );

        boardStyle = {
            backgroundColor: game.color,
            color: game.bg,
            fill: game.bg,
        };
    }

    return (
        <div className="game" style={boardStyle}>
            <div className="game-status">{statusText}&nbsp;</div>
            <div className="game-board">
                <Board 
                    squares={squares} 
                    onClick={(i) => handleClick(i)}
                    cols={game.cols}
                    rows={game.rows}
                />
            </div>
            <div className="game-info">
                <div>Level: {level}</div>
                <br />
                {btnNextGame}
            </div>
        </div>
    );
}

export default Game;

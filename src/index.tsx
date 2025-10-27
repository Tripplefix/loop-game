import { StrictMode, useState, useEffect, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Utilities from "./gameUtilities";
import Form from './form';
import { GameConfig } from './types';

interface SquareProps {
    form: Form;
    onClick: () => void;
}

function Square({ form, onClick }: SquareProps) {
    const squareRotation: CSSProperties = {
        transform: `rotate(${form.rotation}deg)`
    };

    return (
        <button className="square" style={squareRotation} onClick={onClick}>
            {form.figure}
        </button>
    );
}

interface BoardProps {
    squares: Form[];
    onClick: (index: number) => void;
}

function Board({ squares, onClick }: BoardProps) {
    const renderSquare = (i: number) => {
        return (
            <Square
                key={i}
                form={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    };

    const rows = squares.map((_, index) => renderSquare(index));

    return <div>{rows}</div>;
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

    const updateSolved = (colCount: number, squares: Form[], i: number): void => {
        if (squares[i] === undefined || squares[i].type === 1) return;

        // we assume solved and set false later if that is not the case
        squares[i].solved = true;

        // compare top
        if (squares[i].connectors.top) {
            if (!squares[i - colCount] ||
                squares[i - colCount].type === 1 ||
                !squares[i - colCount].connectors.bottom)
                squares[i].solved = false;
        }

        // compare right
        if (squares[i].connectors.right) {
            if (!squares[i + 1] ||
                squares[i + 1].type === 1 ||
                !squares[i + 1].connectors.left)
                squares[i].solved = false;
        }

        // compare bottom
        if (squares[i].connectors.bottom) {
            if (!squares[i + colCount] ||
                squares[i + colCount].type === 1 ||
                !squares[i + colCount].connectors.top)
                squares[i].solved = false;
        }

        // compare left
        if (squares[i].connectors.left) {
            if (!squares[i - 1] ||
                squares[i - 1].type === 1 ||
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

    const boardSize: CSSProperties = {
        width: game.cols * 50
    };

    return (
        <div className="game" style={boardStyle}>
            <div className="game-status">{statusText}&nbsp;</div>
            <div className="game-board" style={boardSize}>
                <Board
                    squares={squares}
                    onClick={handleClick}
                />
            </div>
            <div className="game-info">
                <div>Level {level}</div>
                <br />
                {btnNextGame}
            </div>
        </div>
    );
}

// ========================================

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <Game />
    </StrictMode>
);

function changeThemeColor(color: string): void {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor?.setAttribute("content", color);
}

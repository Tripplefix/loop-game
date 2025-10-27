import { useState, useEffect, useCallback } from 'react';
import { GameConfig } from '../types';
import Form from '../models/Piece';
import { PieceType } from '../constants/enums';
import Utilities from '../utils/gameUtilities';

export function useGameLogic() {
    const [level, setLevel] = useState(0);
    const [solved, setSolved] = useState(false);
    const [squares, setSquares] = useState<Form[] | null>(null);
    const [game, setGame] = useState<GameConfig | null>(null);
    const [statusText, setStatusText] = useState("");

    const changeThemeColor = useCallback((color: string): void => {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor?.setAttribute("content", color);
    }, []);

    const updateSolved = useCallback((colCount: number, squares: Form[], i: number): void => {
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
    }, []);

    const calculateSolved = useCallback((squares: Form[]): boolean => {
        const solvedList = squares.map((square) => square.solved);
        return !solvedList.includes(false);
    }, []);

    const handleClick = useCallback((i: number): void => {
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
    }, [solved, squares, game, updateSolved, calculateSolved]);

    const loadNextGame = useCallback((): void => {
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
    }, [level, changeThemeColor, updateSolved]);

    useEffect(() => {
        loadNextGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        level,
        solved,
        squares,
        game,
        statusText,
        handleClick,
        loadNextGame
    };
}

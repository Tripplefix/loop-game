import { useState, useEffect, useCallback } from 'react';
import { GameConfig } from '../types';
import Piece from '../models/Piece';
import { PieceType } from '../constants/enums';
import Utilities from '../utils/gameUtilities';

export function useGameLogic() {
    const [level, setLevel] = useState(0);
    const [solved, setSolved] = useState(false);
    const [squares, setSquares] = useState<Piece[] | null>(null);
    const [game, setGame] = useState<GameConfig | null>(null);
    const [statusText, setStatusText] = useState("");

    const changeThemeColor = useCallback((color: string): void => {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor?.setAttribute("content", color);
    }, []);

    const updateSolved = useCallback((colCount: number, squares: Piece[], i: number): Piece[] => {
        if (squares[i] === undefined || squares[i].type === PieceType.EMPTY) return squares;

        // we assume solved and set false later if that is not the case
        let isSolved = true;

        // compare top
        if (squares[i].connectors.top) {
            if (!squares[i - colCount] ||
                squares[i - colCount].type === PieceType.EMPTY ||
                !squares[i - colCount].connectors.bottom)
                isSolved = false;
        }

        // compare right
        if (squares[i].connectors.right) {
            if (!squares[i + 1] ||
                squares[i + 1].type === PieceType.EMPTY ||
                !squares[i + 1].connectors.left)
                isSolved = false;
        }

        // compare bottom
        if (squares[i].connectors.bottom) {
            if (!squares[i + colCount] ||
                squares[i + colCount].type === PieceType.EMPTY ||
                !squares[i + colCount].connectors.top)
                isSolved = false;
        }

        // compare left
        if (squares[i].connectors.left) {
            if (!squares[i - 1] ||
                squares[i - 1].type === PieceType.EMPTY ||
                !squares[i - 1].connectors.right)
                isSolved = false;
        }

        // Return new array with updated piece
        const newSquares = [...squares];
        newSquares[i] = squares[i].setSolved(isSolved);
        return newSquares;
    }, []);

    const calculateSolved = useCallback((squares: Piece[]): boolean => {
        const solvedList = squares.map((square) => square.solved);
        return !solvedList.includes(false);
    }, []);

    const handleClick = useCallback((i: number): void => {
        if (solved || !squares || !game) return;

        let newSquares = squares.slice();
        
        // Rotate the clicked piece (immutable)
        newSquares[i] = newSquares[i].rotate();

        const cols = game.cols;

        // Update solved status for current and adjacent pieces
        newSquares = updateSolved(cols, newSquares, i); // current square
        newSquares = updateSolved(cols, newSquares, i + 1); // right neighbour
        newSquares = updateSolved(cols, newSquares, i - 1); // left neighbour
        newSquares = updateSolved(cols, newSquares, i - cols); // top neighbour
        newSquares = updateSolved(cols, newSquares, i + cols); // bottom neighbour

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

        // Use Piece.create() factory method for random rotation
        let newSquares = newGame.board.map((type) => Piece.create(type));

        // Update solved status for all pieces
        for (let i = 0; i < newSquares.length; i++) {
            newSquares = updateSolved(newGame.cols, newSquares, i);
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

import { CSSProperties } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Board } from './Board';
import { GameInfo } from './GameInfo';

export function Game() {
    const {
        level,
        solved,
        squares,
        game,
        statusText,
        handleClick,
        loadNextGame
    } = useGameLogic();

    if (!squares || !game) return <div>loading..</div>;

    let boardStyle: CSSProperties = {
        backgroundColor: game.bg,
        color: game.color,
        fill: game.color,
    };

    if (solved) {
        boardStyle = {
            backgroundColor: game.color,
            color: game.bg,
            fill: game.bg,
        };
    }

    return (
        <div className="game" style={boardStyle}>
            <GameInfo 
                level={level}
                statusText={statusText}
                solved={solved}
                onLoadNextGame={loadNextGame}
            />
            <div className="game-board">
                <Board 
                    squares={squares} 
                    onClick={handleClick}
                    cols={game.cols}
                    rows={game.rows}
                />
            </div>
        </div>
    );
}

interface GameInfoProps {
    level: number;
    statusText: string;
    solved: boolean;
    onLoadNextGame: () => void;
}

export function GameInfo({ level, statusText, solved, onLoadNextGame }: GameInfoProps) {
    return (
        <>
            <div className="game-status">{statusText}&nbsp;</div>
            <div className="game-info">
                <div>Level: {level}</div>
                <br />
                {solved && (
                    <button onClick={onLoadNextGame}>
                        Load next game
                    </button>
                )}
            </div>
        </>
    );
}

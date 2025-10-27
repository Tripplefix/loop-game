import { CSSProperties } from 'react';
import Form from '../../models/Piece';
import { Square } from './Square';

interface BoardProps {
    squares: Form[];
    onClick: (index: number) => void;
    cols: number;
    rows: number;
}

export function Board({ squares, onClick, cols, rows }: BoardProps) {
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

import { CSSProperties, memo } from 'react';
import Piece from '../../models/Piece';

interface SquareProps {
    form: Piece;
    onClick: () => void;
}

export const Square = memo(({ form, onClick }: SquareProps) => {
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
}, (prev, next) => {
    // Custom comparison: only re-render if piece actually changed
    return prev.form.equals(next.form);
});

Square.displayName = 'Square';

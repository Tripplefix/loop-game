import { CSSProperties } from 'react';
import Form from '../../models/Piece';

interface SquareProps {
    form: Form;
    onClick: () => void;
}

export function Square({ form, onClick }: SquareProps) {
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

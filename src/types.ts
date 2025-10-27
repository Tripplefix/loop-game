import { PieceType } from './constants/enums';

export interface GameConfig {
    rows: number;
    cols: number;
    bg: string;
    color: string;
    board: PieceType[];
}

export interface Connectors {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
}

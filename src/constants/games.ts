import { GameConfig } from '../types';
import { PieceType } from './enums';

export const game1: GameConfig = {
    rows: 2,
    cols: 2,
    bg: "#ea2f44",
    color: "#431015",
    board: [
        PieceType.CURVE, PieceType.CURVE, //first row
        PieceType.CURVE, PieceType.CURVE, //second row
    ]
};

export const game2: GameConfig = {
    rows: 3,
    cols: 4,
    bg: "#1d5bb0",
    color: "#bcd8ff",
    board: [
        PieceType.CURVE, PieceType.LINE, PieceType.LINE, PieceType.CURVE, //first row
        PieceType.CURVE, PieceType.LINE, PieceType.FORK, PieceType.CURVE, //second row
        PieceType.EMPTY, PieceType.EMPTY, PieceType.ENDIAN, PieceType.EMPTY, //third row
    ]
};

export const game3: GameConfig = {
    rows: 4,
    cols: 4,
    bg: "#4bff8b",
    color: "#034500",
    board: [
        PieceType.ENDIAN, PieceType.FORK, PieceType.LINE, PieceType.CURVE, //first row
        PieceType.CURVE, PieceType.CROSS, PieceType.FORK, PieceType.CURVE, //second row
        PieceType.FORK, PieceType.FORK, PieceType.CROSS, PieceType.ENDIAN, //third row
        PieceType.CURVE, PieceType.LINE, PieceType.CURVE, PieceType.EMPTY, //fourth row
    ]
};

export const game4: GameConfig = {
    rows: 6,
    cols: 6,
    bg: "#b03a00",
    color: "#ffbb9a",
    board: [
        PieceType.ENDIAN, PieceType.FORK, PieceType.LINE, PieceType.LINE, PieceType.CURVE, PieceType.EMPTY, //first row
        PieceType.CURVE, PieceType.FORK, PieceType.LINE, PieceType.FORK, PieceType.CROSS, PieceType.ENDIAN, //second row
        PieceType.CURVE, PieceType.FORK, PieceType.FORK, PieceType.CROSS, PieceType.FORK, PieceType.CURVE, //third row
        PieceType.ENDIAN, PieceType.EMPTY, PieceType.FORK, PieceType.FORK, PieceType.FORK, PieceType.CURVE, //fourth row
        PieceType.EMPTY, PieceType.EMPTY, PieceType.LINE, PieceType.EMPTY, PieceType.ENDIAN, PieceType.EMPTY, //fifth row
        PieceType.ENDIAN, PieceType.LINE, PieceType.FORK, PieceType.ENDIAN, PieceType.ENDIAN, PieceType.ENDIAN, //sixth row
    ]
};

export const game5: GameConfig = {
    rows: 9,
    cols: 7,
    bg: "#c09fee",
    color: "#6600b0",
    board: [
        PieceType.ENDIAN, PieceType.FORK, PieceType.CURVE, PieceType.CURVE, PieceType.CURVE, PieceType.CURVE, PieceType.ENDIAN, //1. row
        PieceType.ENDIAN, PieceType.LINE, PieceType.CURVE, PieceType.CROSS, PieceType.FORK, PieceType.CROSS, PieceType.CURVE, //2. row
        PieceType.FORK, PieceType.FORK, PieceType.ENDIAN, PieceType.LINE, PieceType.ENDIAN, PieceType.FORK, PieceType.LINE, //3. row
        PieceType.CURVE, PieceType.CURVE, PieceType.CURVE, PieceType.CURVE, PieceType.EMPTY, PieceType.CURVE, PieceType.CURVE, //4. row
        PieceType.CURVE, PieceType.FORK, PieceType.LINE, PieceType.ENDIAN, PieceType.ENDIAN, PieceType.ENDIAN, PieceType.EMPTY, //5. row
        PieceType.FORK, PieceType.CURVE, PieceType.CURVE, PieceType.LINE, PieceType.LINE, PieceType.CURVE, PieceType.EMPTY, //6. row
        PieceType.CURVE, PieceType.CURVE, PieceType.FORK, PieceType.ENDIAN, PieceType.ENDIAN, PieceType.LINE, PieceType.EMPTY, //7. row
        PieceType.CURVE, PieceType.CURVE, PieceType.FORK, PieceType.CURVE, PieceType.LINE, PieceType.LINE, PieceType.EMPTY, //8. row
        PieceType.CURVE, PieceType.LINE, PieceType.FORK, PieceType.FORK, PieceType.CURVE, PieceType.CURVE, PieceType.ENDIAN, //9. row
    ]
};

import { ReactElement } from "react";
import { Connectors } from "./types";
import { PieceType } from "./constants/enums";
import { ROTATION_STEP } from "./constants";

import Line from './components/line';
import Curve from './components/curve';
import Fork from './components/fork';
import Endian from './components/endian';
import Cross from './components/cross';

export default class Form {
    type: PieceType;
    rotation: number;
    solved: boolean;
    connectors!: Connectors;

    constructor(type: PieceType) {
        this.type = type;
        this.rotation = 0;
        this.solved = type === PieceType.EMPTY; // EMPTY square is always solved

        this._setConnectors();

        for (let i = 0; i <= Math.floor(Math.random() * 3); i++) {
            this.rotate();
        }
    }

    get figure(): ReactElement | string {
        switch (this.type) {
            case PieceType.ENDIAN: return <Endian />;
            case PieceType.CURVE: return <Curve />;
            case PieceType.LINE: return <Line />;
            case PieceType.FORK: return <Fork />;
            case PieceType.CROSS: return <Cross />;
            case PieceType.EMPTY:
            default: return "";
        } 
    }

    rotate(): void {
        this.rotation += ROTATION_STEP;

        const connectors: Connectors = { ...this.connectors };

        connectors.top = this.connectors.left;
        connectors.right = this.connectors.top;
        connectors.bottom = this.connectors.right;
        connectors.left = this.connectors.bottom;

        this.connectors = connectors;
    }

    private _setConnectors(): void {
        this.connectors = {
            top: [PieceType.ENDIAN, PieceType.LINE, PieceType.FORK, PieceType.CROSS].includes(this.type),
            right: [PieceType.FORK, PieceType.CROSS].includes(this.type),
            bottom: [PieceType.CURVE, PieceType.LINE, PieceType.CROSS].includes(this.type),
            left: [PieceType.CURVE, PieceType.FORK, PieceType.CROSS].includes(this.type),
        };
    }
}

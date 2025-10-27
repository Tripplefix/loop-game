import { ReactElement } from "react";
import { Connectors } from "../types";
import { PieceType } from "../constants/enums";
import { ROTATION_STEP } from "../constants";

import Line from '../components/shapes/line';
import Curve from '../components/shapes/curve';
import Fork from '../components/shapes/fork';
import Endian from '../components/shapes/endian';
import Cross from '../components/shapes/cross';

export default class Piece {
    public readonly type: PieceType;
    public readonly rotation: number;
    public readonly solved: boolean;

    constructor(type: PieceType, rotation: number = 0, solved: boolean = false) {
        this.type = type;
        // Normalize rotation to 0-270
        this.rotation = rotation % 360;
        this.solved = type === PieceType.EMPTY ? true : solved;
    }

    /**
     * Factory method to create a new piece with random rotation
     */
    static create(type: PieceType): Piece {
        const piece = new Piece(type);
        // Random initial rotation
        const rotations = Math.floor(Math.random() * 4);
        return rotations === 0 ? piece : piece.rotateBy(rotations * ROTATION_STEP);
    }

    /**
     * Get the visual representation of the piece
     */
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

    /**
     * Get the connectors based on current rotation
     */
    get connectors(): Connectors {
        const base = this.getBaseConnectors();
        return this.rotateConnectors(base);
    }

    /**
     * Returns a new Piece rotated by 90 degrees
     */
    rotate(): Piece {
        return new Piece(this.type, this.rotation + ROTATION_STEP, this.solved);
    }

    /**
     * Returns a new Piece rotated by specified degrees
     */
    rotateBy(degrees: number): Piece {
        return new Piece(this.type, this.rotation + degrees, this.solved);
    }

    /**
     * Returns a new Piece with updated solved status
     */
    setSolved(isSolved: boolean): Piece {
        return new Piece(this.type, this.rotation, isSolved);
    }

    /**
     * Check if two pieces are equal
     */
    equals(other: Piece): boolean {
        return this.type === other.type &&
               this.rotation === other.rotation &&
               this.solved === other.solved;
    }

    /**
     * Get base connectors for piece type (before rotation)
     */
    private getBaseConnectors(): Connectors {
        return {
            top: [PieceType.ENDIAN, PieceType.LINE, PieceType.FORK, PieceType.CROSS].includes(this.type),
            right: [PieceType.FORK, PieceType.CROSS].includes(this.type),
            bottom: [PieceType.CURVE, PieceType.LINE, PieceType.CROSS].includes(this.type),
            left: [PieceType.CURVE, PieceType.FORK, PieceType.CROSS].includes(this.type),
        };
    }

    /**
     * Rotate connectors based on current rotation
     */
    private rotateConnectors(connectors: Connectors): Connectors {
        const rotations = (this.rotation / ROTATION_STEP) % 4;
        let result = { ...connectors };
        
        for (let i = 0; i < rotations; i++) {
            result = {
                top: result.left,
                right: result.top,
                bottom: result.right,
                left: result.bottom,
            };
        }
        
        return result;
    }
}

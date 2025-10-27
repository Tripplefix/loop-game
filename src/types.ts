export interface GameConfig {
    rows: number;
    cols: number;
    bg: string;
    color: string;
    board: number[];
}

export interface Connectors {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
}

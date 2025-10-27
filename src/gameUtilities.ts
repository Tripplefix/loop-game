import { game1, game2, game3, game4, game5 } from './games';
import { GameConfig } from './types';

const _staticLevels: GameConfig[] = [game1, game2, game3, game4, game5];

const _statusTexts: string[] = [
    "Awesome!",
    "You rock!",
    "You are really good at this!",
    "Too easy, right?",
    "Do your fingers hurt yet?",
    "Fabuloso!",
    "Fantastic!",
    "Next, please!",
    "When will it get harder?",
];

export default class Utilities {
    static getRandomText(): string {
        return _statusTexts[Math.floor(Math.random() * _statusTexts.length)];
    }

    static getStaticLevel(level: number): GameConfig {
        return _staticLevels[level - 1];
    }

    static generateRandomBoard(): GameConfig {
        return game5;
    }
}

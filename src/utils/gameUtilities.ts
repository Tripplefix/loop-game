import { game1, game2, game3, game4, game5 } from '../constants/games';
import { GameConfig } from '../types';
import { getRandomMessage } from '../constants/messages';
import { MAX_STATIC_LEVELS } from '../constants';

const _staticLevels: GameConfig[] = [game1, game2, game3, game4, game5];

export default class Utilities {
    static getRandomText(): string {
        return getRandomMessage();
    }

    static getStaticLevel(level: number): GameConfig {
        if (level < 1 || level > MAX_STATIC_LEVELS) {
            throw new Error(`Invalid level: ${level}. Must be between 1 and ${MAX_STATIC_LEVELS}`);
        }
        return _staticLevels[level - 1];
    }

    static generateRandomBoard(): GameConfig {
        return game5;
    }
}

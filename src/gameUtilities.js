import {game1,game2,game3,game4,game5} from './games';

const _staticLevels = [game1, game2, game3, game4, game5];

const _statusTexts = [
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
    static getRandomText() {
        return _statusTexts[Math.floor(Math.random() * _statusTexts.length)]
    }

    static getStaticLevel(level) {
        return _staticLevels[level - 1];
    }

    /*static calculateSolved(squares, currentSquare, colCount) {
        const top = 0;
        const right = 1;
        const bottom = 2;
        const left = 3;

        for (let i = 0; i < squares.length; i++) {
            // rotation doesn't matter for empty squares
            if(squares[i].type === 1) continue;

            // compare top
            if(squares[i].connectors[top] === 1){
                if(!squares[i - colCount] ||
                    squares[i - colCount].type === 1 ||
                    squares[i - colCount].connectors[bottom] !== 1)
                    return false;
            }

            // compare right
            if(squares[i].connectors[right] === 1){
                if(!squares[i + 1] ||
                    squares[i + 1].type === 1 ||
                    squares[i + 1].connectors[left] !== 1)
                    return false;
            }

            // compare bottom
            if(squares[i].connectors[bottom] === 1){
                if(!squares[i + colCount] ||
                    squares[i + colCount].type === 1 ||
                    squares[i + colCount].connectors[top] !== 1)
                    return false;
            }

            // compare left
            if(squares[i].connectors[left] === 1){
                if(!squares[i - 1] ||
                    squares[i - 1].type === 1 ||
                    squares[i - 1].connectors[right] !== 1)
                    return false;
            }
        }
        return true;
    }*/

    static generateRandomBoard() {
        return game5;

        /*const top = 0;
        const right = 1;
        const bottom = 2;
        const left = 3;

        const colCount = this.colCount;
        const boardSize = colCount * colCount;

         const newBoard = Array(boardSize);

         for(let i = 0; i < boardSize; i++){
             let type;
             // is corner?: 1, 2, 3
             if(i === 0 || i === boardSize - 1 || i === boardSize - colCount || i === colCount - 1)
                 type = Math.floor(Math.random() * 3) + 1;

             // is edge?: 1, 2, 3, 4, 5
             else if(i < 6 || i >= 30 || i % 6 === 0 || i % 6 === 5){

                 if(newBoard[i].connectors[top] === 1){
                     if(!squares[i - colCount] ||
                         squares[i - colCount].type === 1 ||
                         squares[i - colCount].connectors[bottom] !== 1)
                         return false;
                 }

                 type = 4; //Math.floor(Math.random() * 5) + 1;

             }

             else
                 type = 6; //Math.floor(Math.random() * 6) + 1;

             newBoard[i] = new Form(type);
         }
         return newBoard;*/
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Utilities from "./gameUtilities";
import * as serviceWorker from './serviceWorker';

import Form from './form';

class Square extends React.Component {
    render() {
        const squareRotation = {
            transform: "rotate(" + this.props.form.rotation + "deg)"
        };

        return (
            <button className="square" style={squareRotation} onClick={this.props.onClick}>
                {this.props.form.figure}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                form={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const rows = this.props.squares.map((form, index) => {
            return this.renderSquare(index);
        });

        return (
            <div>{rows}</div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 0,
            solved: false,
            squares: null,
            game: null,
            statusText: "",
        };
    }

    componentDidMount() {
        this.loadNextGame();
    }

    handleClick(i) {
        if (this.state.solved)  return;

        const squares = this.state.squares.slice();

        squares[i].rotate();

        const cols = this.state.game.cols;

        // we need to update not only to current square but also the adjacent ones
        this.updateSolved(cols, squares, i); // current square
        this.updateSolved(cols, squares, i + 1); // right neighbour
        this.updateSolved(cols, squares, i - 1); // left neighbour
        this.updateSolved(cols, squares, i - cols); // top neighbour
        this.updateSolved(cols, squares, i + cols); // bottom neighbour

        this.setState({
            squares: squares,
        });

        const solved = this.calculateSolved(squares);

        if(solved) {
            this.setState({
                solved: true,
                statusText: Utilities.getRandomText(),
            });
        }
    }

    updateSolved(colCount, squares, i) {
        if(squares[i] === undefined || squares[i].type === 1) return;

        // we assume solved and set false later if that is not the case
        squares[i].solved = true;

        // compare top
        if(squares[i].connectors.top){
            if(!squares[i - colCount] ||
                squares[i - colCount].type === 1 ||
                !squares[i - colCount].connectors.bottom)
                squares[i].solved = false;
        }

        // compare right
        if(squares[i].connectors.right){
            if(!squares[i + 1] ||
                squares[i + 1].type === 1 ||
                !squares[i + 1].connectors.left)
                squares[i].solved = false;
        }

        // compare bottom
        if(squares[i].connectors.bottom){
            if(!squares[i + colCount] ||
                squares[i + colCount].type === 1 ||
                !squares[i + colCount].connectors.top)
                squares[i].solved = false;
        }

        // compare left
        if(squares[i].connectors.left){
            if(!squares[i - 1] ||
                squares[i - 1].type === 1 ||
                !squares[i - 1].connectors.right)
                squares[i].solved = false;
        }
    }

    calculateSolved(squares) {
        const solvedList = squares.map((square) => {
            return square.solved;
        });
        return !solvedList.includes(false);
    }

    loadNextGame() {
        let game;
        const nextLevel = this.state.level + 1;

        if(nextLevel < 6){
            game = Utilities.getStaticLevel(nextLevel);
        }else{
            game = Utilities.generateRandomBoard();
        }

        changeThemeColor(game.bg);

        const squares = game.board.map((type) => {
            return new Form(type);
        });

        for (let i = 0; i < squares.length; i++) {
            this.updateSolved(game.cols, squares, i)
        }

        this.setState({
            game: game,
            solved: false,
            squares: squares,
            level: this.state.level + 1,
            statusText: "",
        });
    }

    render() {
        if(!this.state.squares) return <div>loading..</div>;

        let boardStyle = {
            backgroundColor: this.state.game.bg,
            color: this.state.game.color,
            fill: this.state.game.color,
        };

        let btnNextGame;
        if (this.state.solved) {
            btnNextGame = (
                <button onClick={() => this.loadNextGame()}>Load next game</button>
            );

            boardStyle = {
                backgroundColor: this.state.game.color,
                color: this.state.game.bg,
                fill: this.state.game.bg,
            };
        }

        const squares = this.state.squares.slice();

        const boardSize = {
            width: this.state.game.cols * 50
        };

        return (
            <div className="game" style={boardStyle}>
                <div className="game-status">{this.state.statusText}&nbsp;</div>
                <div className="game-board" style={boardSize}>
                    <Board
                        squares={squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>Level {this.state.level}</div>
                    <br />
                    {btnNextGame}
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

serviceWorker.register();

function changeThemeColor(color) {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);

}


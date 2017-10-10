import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    let className = "square";
    if (props.isHighlighted) {
        className += " highlighted";
    }
    
    return (
        <button className={className} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

function Input(props) {
    return (
        <label>
            {props.label}:
            <input type="number" defaultValue={props.value} onChange={(key, value) => props.onChange(key, value)} />
        </label>
    );
}

function Submit(props) {
    return (
        <button onClick={() => props.onClick()}>
            {props.label}
        </button>
    )
}

class Setting extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            settingOptions: props.settingOptions,
        }
    }

    handleChange(currentKey, event) {
        let settingOptions = this.state.settingOptions;
        
        settingOptions[currentKey].value = event.target.value;

        this.setState({
            settingOptions: settingOptions
        });
    }

    renderInput(key, label, value) {
        return (
            <div key={key}>
                <Input 
                    label={label} 
                    value={value}
                    onChange={(e) => this.handleChange(key, e)}
                />
            </div>
        );
    }

    render() {
        let options = [];

        for (var key in this.state.settingOptions) {
            if (this.state.settingOptions.hasOwnProperty(key)) {
                options.push(
                    this.renderInput(key, this.state.settingOptions[key].label, this.state.settingOptions[key].value)
                );
            }
        }

        return (
            <div>
                <h2>Nastavení hry</h2>
                {options}
                <div>
                    <Submit
                        label="Uložit nastavení"
                        onClick={() => this.props.onSubmit(this.state.settingOptions)}
                    />
                </div>
            </div>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                key={i}
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                isHighlighted={this.isSquareHighlighted(i)}
            />
        );
    }

    isSquareHighlighted(index) {
        if (this.props.combination) {
            for (let i = 0; i < this.props.combination.length; i++) {
                if (this.props.combination[i] === index) {
                    return true;
                }
            }
        }
        return false;
    }
  
    render() {
        let rows = [];
        for (let y = 0; y < this.props.boardHeight; y++) {
            let row = [];
            const offset = y * this.props.boardWidth;
            for (let x = 0; x < this.props.boardWidth; x++) {
                const index = x + offset;
                
                row.push(this.renderSquare(x + offset));    
            }
            rows.push(<div key={y} className="board-row">{row}</div>);
        }

        return (
            <div>
                <h2>Hrací deska</h2>
                {rows}
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            boardWidth: props.boardWidth,
            boardHeight: props.boardHeight,
            numberOfSquaresToWin: props.numberOfSquaresToWin,
            history: [{
                squares: Array(props.boardWidth * props.boardHeight).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleSubmit(options) {
        this.setState({
            boardWidth: parseInt(options.boardWidth.value, 10),
            boardHeight: parseInt(options.boardHeight.value, 10),
            numberOfSquaresToWin: parseInt(options.numberOfSquaresToWin.value, 10),
            history: [{
                squares: Array(options.boardWidth.value * options.boardHeight.value).fill(null),
            }]
        });

        this.jumpTo(0);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares, this.state.boardWidth, this.state.boardHeight, this.state.numberOfSquaresToWin) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(stepNumber) {
        this.setState({
            stepNumber: stepNumber,
            xIsNext: (stepNumber % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares, this.state.boardWidth, this.state.boardHeight, this.state.numberOfSquaresToWin);
        const settingOptions = {
            boardWidth: {label: "Počet slouců", value: this.state.boardWidth},
            boardHeight: {label: "Počet řádků", value: this.state.boardHeight},
            numberOfSquaresToWin: {label: "Délka vítězné řady", value: this.state.numberOfSquaresToWin},
        };

        const moves = history.map((step, stepNumber) => {
            const desc = stepNumber ? 
                'Tah #' + stepNumber :
                'Hra začala'
            return (
                <li key={stepNumber}>
                    <a href="#" onClick={() => this.jumpTo(stepNumber)}>{desc}</a>
                </li>
            )
        });

        let status;

        if (winner) {
            status = 'Vítěz: ' + current.squares[winner[0]];
        } else {
            status = 'Na řadě je hráč: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-setting">
                    <Setting
                        settingOptions={settingOptions}
                        onSubmit={(options) => this.handleSubmit(options)}
                    />
                </div>
                <div className="game-board">
                    <Board
                        boardWidth={this.state.boardWidth}
                        boardHeight={this.state.boardHeight}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        combination={winner}
                    />
                </div>
                <div className="game-info">
                    <h2>Průběh hry</h2>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
  
 // ========================================
  
ReactDOM.render(
    <Game boardWidth={5} boardHeight={10} numberOfSquaresToWin={4} />,
    document.getElementById('root')
);

function calculateWinner(squares, boardWidth, boardHeight, numberOfSquaresToWin) {
    for (let y = 0; y < boardHeight; y++) {
        const offset = y * boardWidth;
        for (let x = 0; x < boardWidth; x++) {
            if (!squares[x + offset]) {
                continue;
            }
            
            // row match
            if (x + numberOfSquaresToWin <= boardWidth) {
                let match = true;
                let combination = [x + offset];
               
                for (let i = (x + 1); i < (x + numberOfSquaresToWin); i++) {
                    if (!(match *= squares[x + offset] === squares[i + offset])) {
                        break;
                    }
                    combination.push(i + offset)
                }
                
                if (match) {
                    return combination;
                }
            }
            
            // column match
            if (y + numberOfSquaresToWin <= boardHeight) {
                let match = true;
                let combination = [x + offset];
                
                for (let i = y + 1; i < y + numberOfSquaresToWin; i++) {
                    if (!(match *= squares[x + offset] === squares[x + offset + i * boardWidth])) {
                        break;
                    }
                    combination.push(x + offset + i * boardWidth)
                }
                
                if (match) {
                    return combination;
                }
            }

            // left-top to right-bottom match
            if (x + numberOfSquaresToWin <= boardWidth
                && y + numberOfSquaresToWin <= boardHeight
            ) {
                let match = true;
                let gap = boardWidth + 1;
                let combination = [x + offset];
                
                for (let i = 1; i < numberOfSquaresToWin; i++) {
                    if (!(match *= squares[x + offset] === squares[x + offset + i * gap])) {
                        break;
                    }
                    combination.push(x + offset + i * gap)
                }
                
                if (match) {
                    return combination;
                }
            }

            // right-top to left-bottom match
            if (x + numberOfSquaresToWin <= boardWidth
                && y + 1 - numberOfSquaresToWin >= 0
            ) {
                let match = true;
                let gap = boardWidth - 1;
                let combination = [x + offset];
                
                for (let i = 1; i < numberOfSquaresToWin; i++) {
                    if (!(match *= squares[x + offset] === squares[x + offset - i * gap])) {
                        break;
                    }
                    combination.push(x + offset - i * gap)
                }
                
                if (match) {
                    return combination;
                }
            }
        }
    }
    return null;
}
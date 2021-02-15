//todo
//optimize code
//have users choose O or X
//have users choose to play against friend or CPU
//make the website prettier?
window.onload = function() {
    setup();
}
var gameboard = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]
var player = "X"
var oPlayer;
if(player == "X") oPlayer = "O"
else oPlayer = "X"
var Xwin = 0;
var Owin = 0;
var turn = 1;
var square = document.getElementsByClassName("square");
var button = document.getElementsByClassName("button")[0];
var resultText = document.getElementsByClassName("result")[0];
var XwinCount = document.getElementById("Xwin");
var OwinCount = document.getElementById("Owin");
//turn starts at 0 if O starts
//starts at 1 if X starts
function draw() {
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            if(gameboard[i][j] != 0) {
                square[i*3 + j].textContent = gameboard[i][j]
                square[i*3 + j].style.pointerEvents = "none";
            }
            else {
                square[i*3 + j].textContent = ""
            }
        }
    }
    endGame = endBoard(gameboard)
    if(endGame[0]) {
        if(endGame[1] == 0) resultText.textContent = "It's a draw!"
        else {
            resultText.textContent = `${endGame[1]} is the winner!`
            if(endGame[1] == "X") XwinCount.textContent = ++Xwin
            else OwinCount.textContent = ++Owin
        }
        for(let i=0; i<9; ++i) {
            square[i].style.pointerEvents = "none"
        }
    }
}
function setup() {
    let row = Math.floor(Math.random() * 3)
    let column = Math.floor(Math.random() * 3)
    gameboard[row][column] = player
    draw()
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            square[i*3 + j].addEventListener('click',function(e) {
                gameboard[i][j] = oPlayer;
                gameboard = copyBoard(findBestMove(gameboard))
                draw()
            })
        }
    }
    button.addEventListener('click',function(e) {
        reset()
    })
};

function reset() {
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            gameboard[i][j] = 0
            square[i*3 + j].removeAttribute("style");
        }
    }
    let row = Math.floor(Math.random() * 3)
    let column = Math.floor(Math.random() * 3)
    gameboard[row][column] = "X"
    draw()
    turn = 1;
    resultText.textContent = "";
}

function copyBoard(board) {
    var copiedBoard = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            copiedBoard[i][j] = board[i][j]
        }
    }
    return copiedBoard
}

function listAllPossibleMoves(board,turn){
    // console.log(turn)
    var boards = []
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            if(board[i][j] == 0) {
                let newBoard = copyBoard(board)
                newBoard[i][j] = turn
                boards.push(newBoard)
            }
        }
    }
    return boards
}

// returns if game ended and winner (1 or 5)
// too many copied code could be improved
function endBoard(board) {
    let end = false
    //check horizontal
    for(var i=0; i<3; ++i) {
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) {
            return [true,board[i][0]]
        }
    }

    //check vertical
    for(var j=0; j<3; ++j) {
        if(board[0][j] == board[1][j] && board[1][j] == board[2][j] && board[0][j] != 0) {
            return [true,board[0][j]]
        }
    }

    //check diagonal
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != 0) {
        return [true,board[1][1]]
    }
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != 0) {
        return [true,board[1][1]]
    }

    //check if draw
    let count = 0
    for(var i=0; i<3; ++i) {
        for(var j=0; j<3; ++j) {
            if(board[i][j] == 0) ++count            
        }
    }
    if(count == 0) {
        end = true
    }

    return [end,0]
}

//evalulate terminal position of minmax tree
function calculateUtility(winner) {
    // console.log(winner)
    if(winner == player) return 1
    else if (winner == 0) return 0
    else return -1
}

//return move state and utility
function minimax(board,maximizingPlayer) {
    let endGame = endBoard(board)
    // console.log(endGame)
    // console.log(board)
    if(endGame[0]){
        // console.log(board,endGame[1],calculateUtility(endGame[1]))
        return calculateUtility(endGame[1])
    }
    //check if it is the turn of the maxmimizing player
    if(maximizingPlayer) {
        let maxEval = -9999
        let children = listAllPossibleMoves(board,player)
        // console.log(children,player)
        let length = children.length
        for(let i=0; i<length; ++i) {
            let eval = minimax(children[i],false)
            maxEval = Math.max(maxEval,eval)
        }
        return maxEval
    }
    else {
        let minEval = 9999
        let children = listAllPossibleMoves(board,oPlayer)
        // console.log(children,oPlayer)
        let length = children.length
        for(let i=0; i<length; ++i) {
            let eval = minimax(children[i],true)
            minEval = Math.min(minEval,eval)
        }
        return minEval
    }
}

function findBestMove(board) {
    let bestScore = -Infinity
    let bestIndex = -1
    let moves = listAllPossibleMoves(board,player)
    let length = moves.length
    for(let i=0; i<length; ++i) {
        //from AI POV the next move is not the maxmizing player
        let score = minimax(moves[i],false)
        if(score > bestScore) {
            bestScore = score
            bestIndex = i
        }
    }
    return moves[bestIndex]
}

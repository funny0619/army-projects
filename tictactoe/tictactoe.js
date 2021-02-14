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
var winner;
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
}
function setup() {
    gameboard = copyBoard(findBestMove(gameboard))
    draw()
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            square[i*3 + j].addEventListener('click',function(e) {
                gameboard[i][j] = oPlayer;
                draw()
                gameboard = copyBoard(findBestMove(gameboard))
                draw()
            })
        }
    }
    draw()
    button.addEventListener('click',function(e) {
        reset()
    })
    // console.log(findBestMove(gameboard))
    // console.log(minimax(gameboard,player,true))
};

// function game() {
//     gameboard = copyBoard(findBestMove(gameboard))
//     draw()
// }

function reset() {
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            gameboard[i][j] = 0
            square[i*3 + j].removeAttribute("style");
        }
    }
    gameboard = copyBoard(findBestMove(gameboard))
    draw()
    turn = 1;
    resultText.textContent = "";
}
// 1 is end
// 2 is draw
// find way to make win check better
function end() {
    let one = document.getElementById("0").textContent
    let two = document.getElementById("1").textContent
    let three = document.getElementById("2").textContent
    let four = document.getElementById("3").textContent
    let five = document.getElementById("4").textContent
    let six = document.getElementById("5").textContent
    let seven = document.getElementById("6").textContent
    let eight = document.getElementById("7").textContent
    let nine = document.getElementById("8").textContent
    if((one == two && two == three) && (one && two && three) || (four == five && five == six) && (four && five && six) || (seven == eight && eight == nine) && (seven && eight && nine)) {
        return 1;
    }
    else if((one == four && four == seven) && (one && four && seven) || (two == five && five == eight) && (two && five && eight) || (three == six && six == nine) && (three && six && nine)) {
        return 1;
    }
    else if((one == five && five == nine) && (one && five && nine) || (three == five && five == seven) && (three && five && seven)) {
        return 1;
    }
    else if (one && two && three && four && five && six && seven && eight && nine) {
        return 2;
    }
    return 0;
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

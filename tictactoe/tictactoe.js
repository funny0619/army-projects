window.onload = function() {
    setup();
}
var gameboard = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]
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
function setup() {
    for(let i=0; i<9; ++i) {
        square[i].addEventListener('click',function(e) {
            if(turn % 2 == 0) {
                e.target.textContent = "O";
                winner = "O"
            }
            else {
                e.target.textContent = "X";
                winner = "X"
            }
            e.target.style.pointerEvents = "none";
            e.target.style.color = "black";
            ++turn;
            result = end()
            if (result > 0) {
                for(let i=0; i<9; ++i) {
                    square[i].style.pointerEvents = "none";
                }
                if(result == 1) {
                    resultText.textContent = `"${winner}" won the game`;
                    if(winner == "X") ++Xwin;
                    else ++Owin;
                }
                else if(result == 2) resultText.textContent = "It's a draw"
                OwinCount.textContent =  Owin
                XwinCount.textContent =  Xwin
            }
        })
    }
    button.addEventListener('click',function(e) {
        reset()
    })
};

function reset() {
    for(let i=0; i<9;++i) {
        square[i].textContent = "";
        square[i].removeAttribute("style");
    }
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
            board[i][j] = copiedBoard[i][j]
        }
    }
    return copiedBoard
}

function listAllPossibleMoves(board,sign){
    boards = []
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            if(board[i][j] == 0) {
                let newBoard = copyBoard(board)
                newBoard[i][j] = sign
                boards.push(newBoard)
            }
        }
    }
    return boards
}

//1 is x
//5 is o
// returns if game ended and winner (1 or 5)
// too many copied code could be improved
function endBoard(board) {
    let end = False
    //check horizontal
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++i) {
            sum += board[i][j]
        }
        if(sum % 3 && sum > 0) return [true,sum/3]
        sum = 0
    }
    //check vertical
    for(let j=0; j<3; ++j) {
        for(let i=0; i<3; ++i) {
            sum += board[i][j]
        }
        if(sum % 3 && sum > 0) return [true,sum/3]
        sum = 0
    }
    //check diagonal
    sum = board[0][0] + board[1][1] + board[2][2]
    if(sum % 3 && sum > 0) return [true,sum/3]
    sum = 0
    sum = board[0][2] + board[1][1] + board[2][0]
    if(sum % 3 && sum > 0) return [true,sum/3]

    //check if draw
    let count = 0
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++j) {
            if(board[i][j] == 0) ++count            
        }
    }
    if(count == 0 && sum % 3 != 0) {
        end = true
    }

    return [end,sum/3]
}
//1 is x
//5 is o
//evalulate terminal position of minmax tree
//value denotes which player won 5 or 1
//sign denotes if cpu is O or X
function calculateUtility(value,sign) {
    if(value == sign) return 10
    else if (value == 0) return 0
    else return -10
}

//return move state and utility
function minimax(board,sign,maximizingPlayer) {
    endGame = endBoard(board)
    if(endGame[0]){
        return calculateUtility(endGame[1],sign)
    }
    //check if it is the turn of the maxmimizing player
    if(maximizingPlayer) {

    }
}

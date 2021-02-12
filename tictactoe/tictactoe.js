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
//if player1 then
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

function endBoard() {

}
//1 is x
//5 is o
//evalulate terminal position of minmax tree
// too many copied code could be improved
function calculateUtility(board,sign) {
    let sum = 0
    //check horizontal
    for(let i=0; i<3; ++i) {
        for(let j=0; j<3; ++i) {
            sum += board[i][j]
        }
        if(sum % 3 && sum > 0) {
            if(sum > 3) {
                if(sign == 5) return 10
                else return -10
            }
            else {
                if(sign == 5) return -10
                else return 10
            }
        }
        sum = 0
    }
    //check vertical
    for(let j=0; j<3; ++j) {
        for(let i=0; i<3; ++i) {
            sum += board[i][j]
        }
        if(sum % 3 && sum > 0) {
            if(sum > 3) {
                if(sign == 5) return 10
                else return -10
            }
            else {
                if(sign == 5) return -10
                else return 10
            }
        }
        sum = 0
    }
    //check diagonals
    sum = board[0][0] + board[1][1] + board[2][2]
    if(sum % 3 && sum > 0) {
        if(sum > 3) {
            if(sign == 5) return 10
            else return -10
        }
        else {
            if(sign == 5) return -10
            else return 10
        }
    }
    sum = board[0][2] + board[1][1] + board[2][0]
    if(sum % 3 && sum > 0) {
        if(sum > 3) {
            if(sign == 5) return 10
            else return -10
        }
        else {
            if(sign == 5) return -10
            else return 10
        }
    }
}

function maximize(board) {
    // if terminal condition or maximum depth reached
    if(endBoard()) {
        return null, calculateUtility(board)
    } 
    max_utility = -99
    move = null
}

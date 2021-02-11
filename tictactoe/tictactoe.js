window.onload = function() {
    setup();
}
var turn = 0;
var square = document.getElementsByClassName("square");
//turn starts at 0 if O starts
//starts at 1 if X starts
function setup() {
    for(let i=0; i<9; ++i) {
        square[i].addEventListener('click',function (e) {
            var result;
            if(turn % 2 == 0) {
                e.target.textContent = "O";
            }
            else {
                e.target.textContent = "X";
            }
            e.target.style.pointerEvents = "none";
            e.target.style.color = "black";
            ++turn;
            result = end();
        })
    }
}

// 1 is end
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
    if((one == two && two == three) || (four == five && five == six) || (seven == eight && eight == nine)) {
        return 1;
    }
    if((one == four && four == seven) || (two == five && five == eigth) || (three == six && six == nine)) {
        return 1;
    }
    if((one == five && five == nine) || (three == five && five == seven)) {
        return 1;
    }
    return 0
}

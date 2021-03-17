window.onload = function () {

}
var board = document.getElementsByClassName("board")[0]
for (let i=0; i<8; ++i) {
    let tableBody = board.children[0]
    console.log(tableBody)
    var row = document.createElement("tr")
    row.className = "rows"
    row.id = i+1
    tableBody.appendChild(row)
    var numberMark = document.createElement("th")
    numberMark.innerText = 8-i
    row.appendChild(numberMark)
    for(let j=0; j<8; ++j) {
        var td = document.createElement("td")
        if ((i+1)%2 != 0){
            if((j+1)%2 != 0) td.className = "light"
            else td.className = "dark"
        }
        else {
            if((j+1)%2 != 0) td.className = "dark"
            else td.className = "light"
        }
        row.appendChild(td)
    }
}
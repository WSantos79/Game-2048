var borda;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
//    borda = [
//        [2, 8, 16, 4],
//        [32, 64, 128, 256],
//        [512, 1024, 2048, 4096],
//        [8192, 19000, 0, 0]
//    ]

 //   borda = [
 //       [0 ,0 ,0 ,0],
 //       [0 ,0 ,0 ,0],
 //       [0 ,0 ,0 ,0],
 //       [0, 0, 0, 0]
 //   ]

    borda = [
        [2 ,2 ,2 ,2],
        [2 ,2 ,2 ,2],
        [4 ,4 ,8 ,8],
        [4, 4, 8, 8]
    ]

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++){
            //<div id="0-0"></div>
            let quadrado = document.createElement("div");
            quadrado.id = r.toString() + "-" + c.toString();
            let num = borda[r][c];
            updateQuadrado(quadrado, num);
            document.getElementById("borda").append(quadrado);
        }
    }
}

function updateQuadrado(quadrado, num) {
    quadrado.innerText = "";
    quadrado.classList.value = ""; // limpar classList "quadrado x2 x4 x8..."
    quadrado.classList.add("quadrado");
    if(num > 0) {
        quadrado.innerText = num.toString();
        if(num <= 8192) {
            quadrado.classList.add("x"+num.toString());
        }else {
            quadrado.classList.add("moreNum");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if(e.code == "ArrowLeft") {
        sideLeft();
        console.log('apertei')  
    }
})

function filterZero(row) {
    return row.filter(num => num != 0); // cria um novo array sem zeros
}

function lado(row) {
    //[0, 2, 2, 2]
    row = filterZero(row); // obtem array sem zero [2, 2, 2]

    // lado
    for(let i = 0; i < row.lenght-1; i++){
        // checar a cada 2
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        } 
    } // [2, 2, 2] -> [4, 0, 2]

    row = filterZero(row); // [4, 2]

    // add zero

    while(row.lenght < columns) {
        row.push(0);
    } // [4, 2, 0, 0]

    return row;
}

function sideLeft() {
    for(let r = 0; r < rows; r++) {
        let row = borda[r];
        row = lado(row);
        borda[r] = row;

        for(let c = 0; c < columns; c++) {
            let quadrado = document.getElementById(r.toString() + "-" + c.toString());
            let num = borda[r][c];
            updateQuadrado(quadrado, num);
        }
    }
}
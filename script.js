
class Canvas {
    constructor(canvasId) {
        this.canvas = document.querySelector(canvasId)
        if (!this.canvas) {
            console.log(`canvas id ${canvasId} not found`)
        }
        this.ctx = this.canvas.getContext("2d");
    }

    clearCanvas() {
        return
    }

}

//test class
class Square extends Canvas {


    drawSquare(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 10, 10);
    }

    drawRabbit(x, y) {
        this.ctx.fillStyle = "Blue";
        this.ctx.fillRect(x, y, 10, 10);
    }


}
// draw a 10 x 10 grid
//TODO 
//get this class working
// class GameTiles extends Canvas {



//     drawGrid(x, y, colour) {
//         this.ctx.fillStyle = colour;
//         this.ctx.fillRect(x, y, 10, 10);

//     }

//     greenTiles(gameTiles){
//     for(let i = 0; i < gameTiles.length; i++){
//         let min = 0;
//         let max = 10;
//         if(Math.floor(Math.random() * (max - min + 1)) + min === 3){
//             console.log(gameTiles[i].join(",").replace("White", "Red").split(","))
//             gameTiles[i].join(",").replace(/^(white|green)\b/g, "Red").split(",")
//         }
//         return greenTiles
//     }
// }


//     static generateTiles() {
//         const gameTiles = []
//         for (let x = 0; x < 10; x++) {
//             for (let y = 0; y < 10; y++) {
//                 gameTiles.push([y * 10, x * 10])
//             }
//         }
//         for (let i = 0; i < gameTiles.length; i++) {
//             if (i % 2 === 0) {
//                 gameTiles[i].push("White")
//             } else {
//                 gameTiles[i].push("Green")
//             }
//         }
//         return gameTiles
//     }
// }

// temp setup 
let newCanvas = new Canvas("#canvasId")
let square1 = new Square("#canvasId")







// Create tiles 
//TODO
//make map much bigger
const gameTiles = []
for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
        gameTiles.push([y * 10, x * 10])
    }
}
// Colour tiles
for (let i = 0; i < gameTiles.length; i++) {


    // map checkerboard!
    if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
        gameTiles[i].push("White")
    } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
        gameTiles[i].push("Green")
    } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
        gameTiles[i].push("White")
    } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
        gameTiles[i].push("Green")
    }
}
// create rabbit after gameTiles set

let rabbit = [0, 0, "White"]


// console.log(rabbit)
//append Red Tiles
//TODO
//randomization needs to be better spaced 

const staminaTile = []
function redTiles() {


    for (let i = 0; i < gameTiles.length; i++) {
        let min = 0;
        let max = 10;
        if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
            if (gameTiles[i][0] <= 90 && gameTiles[i][0] >= 10 && gameTiles[i][1] <= 90 && gameTiles[i][1] >= 10) {
                let tempTile = structuredClone(gameTiles[i])
                tempTile[2] = "Red"
                console.log(tempTile)
                staminaTile.push(tempTile)


            }
        }

    }
    staminaTile.forEach(tile => square1.drawSquare(...tile))
}


let resetRedTiles = () => {
    for (let value of staminaTile) {
        for (let tile of gameTiles) {
            if (value[0] === tile[0] && value[1] === tile[1]) {

                value = tile
                // console.log(tile)
                square1.drawSquare(...value)
            }

        }
    }
}

//Draw map

(function drawMap() {

    gameTiles.forEach(tiles => square1.drawSquare(...tiles))
    square1.drawRabbit(...rabbit)
})()
// drawMap()
redTiles();
let staminaLog = () => console.log(`+10 sec`)


//iterate over gameTiles array with rabbits x y position to see what colour gameTile is
let reDraw = (rabbit) => {


    square1.drawRabbit(...rabbit)
    //TODO
    // need to work on this for some reason there are invisible staminaSquares but not consistently
    //finally fixed it, the solution was using indexOf...
    for (let value of gameTiles) {


        if (value[0] === rabbit[0] && value[1] === rabbit[1] ? rabbit[2] = value[2] : false) {

            for (let i of staminaTile) {
                if (i[0] === rabbit[0] && i[1] === rabbit[1] ? true : false) {



                        console.log(`red square`)

                        let index = staminaTile.indexOf(i)
                        staminaTile.splice(index , 1)
                        staminaLog();
                        reset()
                    // }
                }
            }
        }
    }
}

function reset() {
    if (staminaTile.length === 1) {
        redTiles()
    }
}


addEventListener("keydown", (event) => {

    event.preventDefault();



    if (event.code == "ArrowUp" && rabbit[1] >= 10) {
        //redraw for every event to avoid out of bounds issue (not drawing when hitting border)
        square1.drawSquare(...rabbit)
        rabbit[1] -= 10;

        reDraw(rabbit);

    } else if (event.code == "ArrowDown" && rabbit[1] <= 80) {
        square1.drawSquare(...rabbit)
        rabbit[1] += 10;
        reDraw(rabbit);

    } else if (event.code == "ArrowLeft" && rabbit[0] >= 10) {
        square1.drawSquare(...rabbit)
        rabbit[0] -= 10;
        reDraw(rabbit);

    } else if (event.code == "ArrowRight" && rabbit[0] <= 80) {
        square1.drawSquare(...rabbit)
        rabbit[0] += 10;
        reDraw(rabbit);

    }

});

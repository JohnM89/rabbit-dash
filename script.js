
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
let square2 = new Square("#canvasId")
// let newGame1 = new GameTiles('#canvasId')

square1.drawSquare()
square1.drawSquare(10, 0, 'green')





// Create tiles 
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
// highly probably this is not the right way to do this but it'll have to do till i figure it out
//deep clone array position 0 and assign it to rabbit
let stringify = JSON.stringify(gameTiles[0])
let rabbit = JSON.parse(stringify)
//make Rabbit Blue square
// rabbit[2] = "Blue"
console.log(rabbit)
//append Red Tiles
//TODO
//randomization needs to be better spaced 


function redTiles(gameTiles) {
    for (let i = 0; i < gameTiles.length; i++) {
        let min = 0;
        let max = 10;
        if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
            gameTiles[i][2] = "Red"
        }
        // console.log(gameTiles)
    }
}

//Draw map
gameTiles.forEach(tiles => square1.drawSquare(...tiles))
//Call redTiles filter
redTiles(gameTiles);

// console.log(rabbit)

//Draw map with redTiles
gameTiles.forEach(tiles => square1.drawSquare(...tiles))
//draw rabbit last so its not hidden beneath?
square2.drawRabbit(...rabbit)
// console.log(rabbit.at(0), rabbit.at(1))
let staminaTile = () => console.log(`+10 sec`)

//iterate over gameTiles array with rabbits x y position to see what colour gameTile is
//so far the array is off by some unknown value
let reDraw = (rabbit) => {
    console.log(rabbit)
    square2.drawRabbit(...rabbit)

    let occupiedSpace;
    for (let value of gameTiles) {
        // let occupiedSpace;
        if (value[0] === rabbit[0] && value[1] === rabbit[1] ? occupiedSpace = [...value] : false) {
            rabbit[2] = value[2]
            if (occupiedSpace[2] === "Red") {
                console.log(`red square`)

                value[2] = "Yellow"
                console.log(value)
                return

            }

        }
    }

    //   gameTiles.filter( tile =>  tile[0]  === rabbit [0] && tile[1] === rabbit[1] ? occupiedSpace = [...tile] : false)
    //   console.log(occupiedSpace)
    //   console.log(occupiedSpace[2])
    // if (occupiedSpace[2] === "Red") {
    //     console.log(`red square`)
    //     return occupiedSpace[2] = "Yellow"
    // } 
    return
    //if game key equals some direction push new x , y coordinates to rabbit
    // run a function that checks the gameTiles array for x, y coordinates that match rabbits new coordinates
    // if the new coordinates match a tile with "Red"
    // perform the staminaTile interaction function which should include changing the tile colour
    //

}



//problem was i need the spread operator, i was passing the entire array as a single argument it needs to be "spread" across the 3 expected arguments
// could have also selected each subarray tiles[0] tiles[1]
//works but its a checkerboard I want
// need to iterate over the array in a way that checks the tens columns as well as the 1s for equal or odd 

// if keydown up you -10 from x, down +10 to x, right +10 to y , left -10 from y and then callback a function hat checks the array of gameTiles to see if there is a "Red" tile there 
// then call the stamina update and add time and redraw rabbit, perhaps need to redraw all the tiles too?
//using event.code i can map out the keys & call redraw in the eventlistener function...  maybe

//TODO
//fix going out of bounds ~ done
// some dodgy bodger method here im sure but its got the rabbit with the right colour now, ill take it 
addEventListener("keydown", (event) => {
    event.preventDefault();
        // let oldRabbit = JSON.stringify(rabbit)
        // JSON.parse(oldRabbit)
    if (event.code == "ArrowUp" && rabbit[1] >= 10) {


        // console.log("old " + oldRabbit)

        rabbit[1] -= 10;

        console.log("new " + rabbit[2])
        reDraw(rabbit);
        // square2.drawRabbit(...rabbit)
    } else if (event.code == "ArrowDown" && rabbit[1] <= 80) {
 
        // console.log("old " + oldRabbit)
        rabbit[1] += 10;
        // if (oldRabbit[2] === "White") {
        //     console.log(rabbit[2])
        //     //  rabbit[2] = "Green"
        // } else if (oldRabbit[2] === "Green") {
        //     //  rabbit[2] = "White"
        // }
        console.log("new " + rabbit[2])
        
        reDraw(rabbit);

        // square2.drawSquare(...oldRabbit)
        // square2.drawRabbit(...rabbit)
    } else if (event.code == "ArrowLeft" && rabbit[0] >= 10) {


        // console.log("old " + [...oldRabbit])
        rabbit[0] -= 10;
        console.log("new " + rabbit[2])
        reDraw(rabbit);
        // square2.drawSquare(...oldRabbit)
        // square2.drawRabbit(...rabbit)
    } else if (event.code == "ArrowRight" && rabbit[0] <= 80) {


        // console.log("old " + [...oldRabbit])
        rabbit[0] += 10;

        console.log("new " + rabbit[2])
        reDraw(rabbit);
        // square2.drawSquare(...oldRabbit)
        // square2.drawRabbit(...rabbit)
    }
    
});

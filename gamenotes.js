//snake NO AI OR SAMPLING ALLOWED


// array or object for tracking tiles?
// create event listeners

//create game map object
//convert 1D array into 2D array and map to canvas grid

class GameMap {


}
// will need to run a async check to dynamically update the tiles and redraw as game progresses
const stamina = 0
const gameTiles = []
for(let x = 0; x < 10; x++){
    for(let y = 0; y < 10; y++){
        gameTiles.push([y* 10, x * 10])
    }   
}
for(let i = 0; i < gameTiles.length; i++){


// got it checkerboard!
    if(Math.floor(i /10) % 2 === 0 && i % 2 === 0){
        gameTiles[i].push("White")
    } else if (Math.floor(i /10) % 2 === 0 && i % 2 !== 0){
       gameTiles[i].push("Green")  
    } else if (Math.floor(i /10) % 2 !== 0 && i % 2 !== 0){
            gameTiles[i].push("White")
    } else if(Math.floor(i /10) % 2 !== 0 && i % 2 === 0){
        gameTiles[i].push("Green")
    }
}
console.log(gameTiles)
// map 2d array to 3d space

// for(let position of gameTiles){
//     position = {
//         x: position++,
//         y: position++
//     }
// //     for(let i = 0; i < gameTiles.length; i++)
// //     {
// //         let x = 0
// //         let y = 0
// //         let width = 0
// //         let height = 0

// //   gameTiles[position].push()  
// //     }
// }

// for each index value assign a x , y value and assign those to an object or nested array



//every tile is a 1, when traversing a tile it becomes a 0 for x amount of time ( a trail that the rabbit will remember but only 5 ticks)
//game time is counted in ticks and ticks are determined each time the rabbit moves to another square in the grid.
// for each tick stamina - 1 & one grid ( the 6th grid in the linked list? will revert to 1)
// traversing a green square will also convert the 1 tile to a 0
// 0 tiles somehow give knowledge to the rabbit about the adjacent tiles?? ...
// append a green tiles to gameTiles via a algorithmically sorted pattern or randomly?




function redTiles(gameTiles) {
    for(let i = 0; i < gameTiles.length; i++){
        let min = 0;
        let max = 10;
        if(Math.floor(Math.random() * (max - min + 1)) + min === 3){
        gameTiles[i][2] = "Red"
        }
        // console.log(gameTiles)
    }
}

// create Rabbit object 
// create function for traversal of tiles including limitations and how it can move 1space in a grid
let rabbit = gameTiles[0]
//make Rabbit Blue square
gameTiles[0][2] = "Blue"

// add event listeners? maybe just make it random at first 
//how to target canvas "elements". . . 
addEventListener("keydown" , rabbit)
const move = () => {

}
//rabbit will be randomized at first and then later (hopefully) manually controlled and then possibly trained on via Brain.js 

// function to handle stamina tick -1 per space moved
function staminaTimer(){

}
// function to handle encounter with greenTiles to increase stamina by 1
function addStamina(){
 if(rabbit[x , y] === gameTiles[ x , y] && gameTiles[2] === "Red"){
    console.log("stamina tile")
    return staminaTimer + 1_000
 }
 return console.log("normal tile")
}
// handle scoring and end game conditions win or loss etc
function score(){

}

//restart button clears canvas and resets game
function restart(){


}


class Canvas {
    constructor(canvasId) {
        this.canvas = document.querySelector(canvasId)
        if (!this.canvas) {
            console.log(`canvas id ${canvasId} not found`)
        }
        this.ctx = this.canvas.getContext("2d");
        this.gameTiles = [];
        this.staminaTile = [];
        this.createGameTiles();
    }

    clearCanvas() {
        return
    }

    createGameTiles() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.gameTiles.push([y * 40, x * 40])
            }
        }
        // Colour tiles
        for (let i = 0; i < this.gameTiles.length; i++) {
            // map checkerboard!
            if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
                this.gameTiles[i].push("White")
            } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
                this.gameTiles[i].push("Green")
            } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
                this.gameTiles[i].push("White")
            } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
                this.gameTiles[i].push("Green")
            }
        }
    }

}

//test class
class Game extends Canvas {

    constructor(canvasId) {
        super(canvasId);
        this.rabbit = [0, 0, "White"];
        this.img1 = new Image();
        this.img2 = new Image();
        this.img1.src = "rabbit.png";
        this.img2.src = "carrot.png";
        this.staminaLog = () => console.log(`+10 sec`);
        this.eventListener();
        this.drawMap();
    }

    drawMap() {
        this.gameTiles.forEach(tiles => this.drawSquare(...tiles))
        this.drawRabbit(...this.rabbit)
        this.redTiles();
    }

    redTiles() {
        for (let i = 0; i < this.gameTiles.length; i++) {
            let min = 0;
            let max = 10;
            if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
                if (this.gameTiles[i][0] <= 360 && this.gameTiles[i][0] >= 40 && this.gameTiles[i][1] <= 360 && this.gameTiles[i][1] >= 40) {
                    let tempTile = structuredClone(this.gameTiles[i])
                    tempTile[2] = "Red"
                    console.log(tempTile)
                    this.staminaTile.push(tempTile)
                }
            }
        }
        this.staminaTile.forEach(tile => this.drawCarrot(...tile))
    }

    resetRedTiles = () => {
        for (let value of this.staminaTile) {
            for (let tile of this.gameTiles) {
                if (value[0] === tile[0] && value[1] === tile[1]) {
                    value = tile
                    this.drawCarrot(...value)
                }
            }
        }
    }


    drawSquare(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 40, 40);
    }

    drawRabbit(x, y) {
        this.ctx.fillStyle = "Blue";
        this.ctx.fillRect(x, y, 40, 40);
        this.ctx.drawImage(this.img1, x, y, 40, 40)
    }
    drawCarrot(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 40, 40);
        this.ctx.drawImage(this.img2, x, y, 40, 40)
    }
    reset() {
        if (this.staminaTile.length === 1) {
            this.redTiles()
        }
    }
    reDraw = (rabbit) => {
        this.drawRabbit(...rabbit)
        for (let value of this.gameTiles) {
            if (value[0] === rabbit[0] && value[1] === rabbit[1] ? rabbit[2] = value[2] : false) {
                for (let i of this.staminaTile) {
                    if (i[0] === rabbit[0] && i[1] === rabbit[1]) {
                        console.log(`red square`)
                        let index = this.staminaTile.indexOf(i)
                        this.staminaTile.splice(index, 1)
                        this.staminaLog();
                        this.reset()
                    }
                }
            }
        }
    }
    eventListener() {
        document.addEventListener("keydown", (event) => {

            event.preventDefault();



            if (event.code == "ArrowUp" && this.rabbit[1] >= 40) {
                this.drawSquare(...this.rabbit)
                this.rabbit[1] -= 40;

                this.reDraw(this.rabbit);

            } else if (event.code == "ArrowDown" && this.rabbit[1] <= 320) {
                this.drawSquare(...this.rabbit)
                this.rabbit[1] += 40;
                this.reDraw(this.rabbit);

            } else if (event.code == "ArrowLeft" && this.rabbit[0] >= 40) {
                this.drawSquare(...this.rabbit)
                this.rabbit[0] -= 40;
                this.reDraw(this.rabbit);

            } else if (event.code == "ArrowRight" && this.rabbit[0] <= 320) {
                this.drawSquare(...this.rabbit)
                this.rabbit[0] += 40;
                this.reDraw(this.rabbit);

            }

        });
    }


}

let newGame = new Game('#canvasId');
// draw a 10 x 10 grid
//TODO
//properly format OOP style

//temp image to trial future sprites
//TODO
//why image does not render on initial load
// const img1 = new Image()
// const img2 = new Image()
// img1.src = "rabbit.png"
// img2.src = "carrot.png"

// // temp setup
// let newCanvas = new Canvas("#canvasId")
// let square1 = new Square("#canvasId")
// const gameTiles = []
// const staminaTile = []
// createGameTiles()
// let rabbit = [0, 0, "White"]
// let staminaLog = () => console.log(`+10 sec`)

// //TODO
// //function to create difficulty multiplier for every wave of staminaTiles cleared




// // Create tiles
// //TODO
// //make map much bigger
// // multiplied all values by 4 to create bigger map on a 400 x 400 canvas but it may need to be scaled for mobile later on
// // const gameTiles = []
// function createGameTiles() {
//     for (let x = 0; x < 10; x++) {
//         for (let y = 0; y < 10; y++) {
//             gameTiles.push([y * 40, x * 40])
//         }
//     }

//     // Colour tiles

//     for (let i = 0; i < gameTiles.length; i++) {


//         // map checkerboard!
//         if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
//             gameTiles[i].push("White")
//         } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
//             gameTiles[i].push("Green")
//         } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
//             gameTiles[i].push("White")
//         } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
//             gameTiles[i].push("Green")
//         }
//     }
// }
// // createGameTiles()
// // create rabbit after gameTiles set

// // let rabbit = [0, 0, "White"]


// // console.log(rabbit)
// //append Red Tiles


// // const staminaTile = []
// function redTiles() {


//     for (let i = 0; i < gameTiles.length; i++) {
//         let min = 0;
//         let max = 10;
//         if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
//             if (gameTiles[i][0] <= 360 && gameTiles[i][0] >= 40 && gameTiles[i][1] <= 360 && gameTiles[i][1] >= 40) {
//                 let tempTile = structuredClone(gameTiles[i])
//                 tempTile[2] = "Red"
//                 console.log(tempTile)
//                 staminaTile.push(tempTile)


//             }
//         }

//     }
//     staminaTile.forEach(tile => square1.drawCarrot(...tile))
// }


// let resetRedTiles = () => {
//     for (let value of staminaTile) {
//         for (let tile of gameTiles) {
//             if (value[0] === tile[0] && value[1] === tile[1]) {

//                 value = tile
//                 // console.log(tile)
//                 square1.drawCarrot(...value)
//             }

//         }
//     }
// }

// //Draw map

// (function drawMap() {


//     gameTiles.forEach(tiles => square1.drawSquare(...tiles))
//     square1.drawRabbit(...rabbit)
//     redTiles();
// })()



// //iterate over gameTiles array with rabbits x y position to see what colour gameTile is
// let reDraw = (rabbit) => {


//     square1.drawRabbit(...rabbit)
//     for (let value of gameTiles) {


//         if (value[0] === rabbit[0] && value[1] === rabbit[1] ? rabbit[2] = value[2] : false) {

//             for (let i of staminaTile) {
//                 if (i[0] === rabbit[0] && i[1] === rabbit[1]) {

//                     console.log(`red square`)
//                     let index = staminaTile.indexOf(i)
//                     staminaTile.splice(index, 1)
//                     staminaLog();
//                     reset()
//                     // }
//                 }
//             }
//         }
//     }
// }

// function reset() {
//     if (staminaTile.length === 1) {
//         redTiles()
//     }
// }


// addEventListener("keydown", (event) => {

//     event.preventDefault();



//     if (event.code == "ArrowUp" && rabbit[1] >= 40) {
//         square1.drawSquare(...rabbit)
//         rabbit[1] -= 40;

//         reDraw(rabbit);

//     } else if (event.code == "ArrowDown" && rabbit[1] <= 320) {
//         square1.drawSquare(...rabbit)
//         rabbit[1] += 40;
//         reDraw(rabbit);

//     } else if (event.code == "ArrowLeft" && rabbit[0] >= 40) {
//         square1.drawSquare(...rabbit)
//         rabbit[0] -= 40;
//         reDraw(rabbit);

//     } else if (event.code == "ArrowRight" && rabbit[0] <= 320) {
//         square1.drawSquare(...rabbit)
//         rabbit[0] += 40;
//         reDraw(rabbit);

//     }

// });

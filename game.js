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
const gameMap = {
    
}
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




const greenTiles = (gameTiles) => {
return gameTiles.splice(tile => )
}

// create Rabbit object 
// create function for traversal of tiles including limitations and how it can move 1space in a grid
const rabbit = 0
const move = () => {

}
//rabbit will be randomized at first and then later (hopefully) manually controlled and then possibly trained on via Brain.js 

// function to handle stamina tick -1 per space moved
function staminaTimer(){

}
// function to handle encounter with greenTiles to increase stamina by 1
function addStamina(){

}
// handle scoring and end game conditions win or loss etc
function score(){

}

//restart button clears canvas and resets game
function restart(){


}


export {gameTiles}
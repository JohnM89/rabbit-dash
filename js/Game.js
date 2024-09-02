import { Animation } from './Animator.js';
import { Rabbit, Farmer } from './Characters.js';
import { Carrot, BabyCarrot, Burrow, Pot, Chest, OpenChest, ScoreSymbol } from './Objects.js';
import { InputHandler } from './InputHandler.js';
import { World0, World1, World2, World3, World4 } from './Worlds.js';
import { tileSize, ROWS, COLUMNS} from './Constants.js';
import {EndGame } from './Screens.js';
export    class Game {

        constructor(width, height) {
            this.tileSize = tileSize * 2
            this.width = width;
            this.height = height;
            this.currentState = null;
            this.gameObjects = [];
            this.gameTiles = [];
            this.level = 0
            this.carrotTimer = 0;
            this.carrotInterval = 1000;
            this.currentState = null
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.animation = new Animation(this);
            this.rabbit = new Rabbit(this);
            this.tiles = []
            this.animated = []
            this.animatedOverlay = []
            this.carrots = []
            this.babyCarrots = []
            this.enemies = []
            this.portals = []
            this.impassable = []
            this.portalCount = 0
            this.randomInt = 0
            this.countdownInterval = 50000;
            this.time = document.querySelector("#time");
            this.score = document.querySelector("#score");
            this.scoreIncrement = 0
            this.score.textContent = parseInt(0);
            this.savedScore = 0
            
            
        }
        changeState(newState) {
            //work this out to save sessionStore then transition to localStorage
            // this.savedScore = this.score.textContent
            // sessionStorage.setItem( "score", this.savedScore)
            this.level = 0
            this.portalCount = 0
            this.randomInt = 0
            this.portals = []
            this.tiles = [];
            this.animated = []
            this.animatedOverlay = []
            this.gameObjects = []
            this.impassable = []
            this.carrots = [];
            this.enemies = [];
            this.babyCarrots = [];
            this.scoreAnimate = [];
            this.rabbit.x = 0
            this.rabbit.y = 0
            this.time.textContent = "00:00"
            this.score.textContent = 0
            this.carrotTimer = 0;
            this.countdownInterval = 200000;
            this.tiles.push(new World0(this));
            this.currentState = newState;       
        }

        render(ctx, deltaTime) {
             if (this.currentState) {
            
            this.currentState.render(ctx , deltaTime);
            
            this.currentState.handleInput()
            } else {
                 
            this.tiles.forEach(tile => tile.drawBackground(ctx));
            this.gameObjects = [...this.tiles, ...this.babyCarrots,...this.scoreAnimate, ...this.animated,...this.animatedOverlay, ...this.carrots, ...this.portals, ...this.enemies, this.rabbit];
            this.checkCollision();            
            this.spawnCarrot(deltaTime)
            this.spawnEnemy(deltaTime)
            this.carrotGrow();
            this.checkLevel();
            this.scoreAnimate.forEach( (obj, index) =>{
                if (obj.markedForDeletion) {
            this.scoreAnimate.splice(index, 1);
                }
            }
            )
            this.gameObjects.sort((a, b) => {
                return (a.y + a.height) - (b.y + b.height);
            });
            this.gameObjects.forEach(obj => {
                obj.draw(ctx);
                // obj.hitbox(ctx);
                obj.update(deltaTime);

            })
            this.tiles.forEach(tile => tile.drawForGround(ctx));
        }
        }
        checkLevel() {
            if (this.portalCount > 2 && this.portals.length === 0) {
                let x = Math.floor(Math.random() * ROWS) * tileSize * 1.5;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize * 1.5;
                let tileX = x / tileSize;
                let tileY = y / tileSize;
                let tile = this.tiles[0].getTile(this.tiles[0].groundObjects, tileX, tileY);
                if (tile === 0) {
                    this.portals.push(new Burrow(this, x, y));
                }
            }
        }

        checkCollision() {
            this.carrots.forEach((obj, index) => {
                //useing colission coordinates for hitbox
                if (this.rabbit.collisionX < obj.collisionX + obj.collisionWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > obj.collisionX &&
                    this.rabbit.collisionY < obj.collisionY + obj.collisionHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > obj.collisionY) {
                    this.scoreDisplay(obj.x, obj.y - 10)
                    this.portalCount++;
                    this.countdownInterval += 2000;
                    this.score.textContent++;
                    this.carrots.splice(index, 1);
                }
            });
            this.impassable.forEach((obj) => {
                const [tileX, tileY, tileWidth, tileHeight] = obj
                if (this.rabbit.collisionX < tileX + tileWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > tileX &&
                    this.rabbit.collisionY < tileY + tileHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > tileY) {
                    console.log("colission")

                }
            })
            this.enemies.forEach((obj) => {
                if (this.rabbit.collisionX < obj.collisionX + obj.collisionWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > obj.collisionX &&
                    this.rabbit.collisionY < obj.collisionY + obj.collisionHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > obj.collisionY) {
                    this.countdownInterval -= 4000;
                    this.score.textContent--;
                }
            });
            this.portals.forEach((obj, index) => {
                if (this.rabbit.collisionX < obj.collisionX + obj.collisionWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > obj.collisionX &&
                    this.rabbit.collisionY < obj.collisionY + obj.collisionHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > obj.collisionY) {
                    this.level++;
                    this.portals.splice(index, 1);
                    this.tiles = [];
                    this.portals = []
                    this.carrots = [];
                    this.enemies = [];
                    this.babyCarrots = [];
                    this.impassable = [];
                    this.animated = []
                    this.animatedOverlay = []
                    this.rabbit.x = 0
                    this.rabbit.y = 0
                    if (this.level === 1) {
                        this.tiles.push(new World1(this));
                    } else if (this.level === 2) {
                        this.tiles.push(new World2(this));
                    } else if (this.level === 3) {
                        this.tiles.push(new World3(this));
                    } else if (this.level === 4) {
                        this.tiles.push(new World0(this));
                        this.level = 0;
                    }
                }
            });
        }
        init() {
            this.tiles.push(new World0(this))
        }
        setTimer() {

            const timer = setInterval(() => {
                this.countdownInterval -= 10;
                this.time.textContent = this.countdownInterval
                if (this.countdownInterval <= 0 && this.currentState === null) {
                    clearInterval(timer);
                    console.log("game over")
                    this.changeState(new EndGame(this))
                }
            })
        
        }
        addScore() {
            this.score.textContent++
        }
        spawnCarrot(deltaTime) {
            if (this.carrotTimer > this.carrotInterval && this.carrots.length < 10) {
                let x = Math.floor(Math.random() * ROWS) * tileSize * 2;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize * 2;
                let tileX = x / tileSize;
                let tileY = y / tileSize;
                let tile = this.tiles[0].getTile(this.tiles[0].groundObjects, tileX, tileY);

                if (tile === 0) {
                    this.babyCarrots.push(new BabyCarrot(this, x, y));
                    this.carrotTimer = 0;
                }

            } else {
                this.carrotTimer += deltaTime;
            }
        }
        scoreDisplay(x , y){

            this.scoreAnimate.push(new ScoreSymbol(this, x , y))


        }
        carrotGrow() {
            this.babyCarrots.forEach((carrot, index) => {
                if (carrot.frameY === 3) {
                    let x = carrot.x
                    let y = carrot.y
                    this.carrots.push(new Carrot(this, x, y))
                    this.babyCarrots.splice(index, 1)
                }
            })
        }
        spawnEnemy(deltaTime) {
            if (this.enemies.length < 2 && !this.spawnScheduled) {
                let x = Math.floor(Math.random() * ROWS) * tileSize * 2;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize * 2;
                let tileX = x / tileSize;
                let tileY = y / tileSize;
                let tile = this.tiles[0].getTile(this.tiles[0].groundObjects, tileX, tileY);
                if (tile === 0) {
                    this.spawnScheduled = true;
                    setTimeout(() => {
                        this.enemies.push(new Farmer(this, x, y))
                        console.log('spawned')
                        this.spawnScheduled = false;
                    }, 1000)
                    this.scoreIncrement = 0;
                }
                console.log('spawned?')
            } else {
                this.carrotIncrement += deltaTime;
            }
        }
    }
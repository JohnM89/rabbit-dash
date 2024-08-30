const tileSize = 16;
const ROWS = 30;
const COLUMNS = 45;

const gameHeight = tileSize * ROWS
const gameWidth = tileSize * COLUMNS

window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvasId');
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false
    canvas.height = gameHeight
    canvas.width = gameWidth
    class InputHandler {
        constructor(game) {
            this.game = game;
            console.log("input handler created")
            window.addEventListener('keydown', event => {
                event.preventDefault();
                this.game.lastKey = "P" + event.code;
            });
            window.addEventListener('keyup', event => {
                event.preventDefault();
                this.game.lastKey = "R" + event.code;
            });
        }
    }
    class Animation {
        constructor(game) {
            this.game = game;
            this.tileSize = tileSize * 2
            this.width = this.tileSize;
            this.height = this.tileSize;
            this.frameX = 0;
            this.frameY = 0;
            this.x = 0;
            this.y = 0;
            this.maxFrame = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.maxSpeed = 1;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2
            this.collisionWidth = this.tileSize / 2;
            this.collisionHeight = this.tileSize / 2;
            this.fps = 60;
            this.frameInterval = 2000 / this.fps;
            this.frameTimer = 0;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        // hitbox(ctx) {
        //     ctx.fillStyle = 'black';
        //     ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);
        // }
        setSpeed(speedX, speedY) {
            this.speedX = speedX;
            this.speedY = speedY;
        }
    }
    class Rabbit extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "bunnysheet.png";
            this.spriteWidth = 36.2;
            this.spriteHeight = 39;
            this.frameX = 0;
            this.frameY = 1;
            this.x = 0;
            this.y = 0;
            this.maxSpeed = 2
            this.collisionWidth = this.tileSize / 2;
            this.collisionHeight = this.tileSize / 2;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2
            this.hitBox = {
                x: this.collisionX,
                y: this.collisionY,
                w: this.collisionWidth,
                h: this.collisionHeight,
            }
        }

        update(deltaTime) {

            const prevX = this.x;
            const prevY = this.y;
            let previousKey = this.game.lastKey
            if (this.game.lastKey == 'PArrowLeft') {
                this.setSpeed(-this.maxSpeed, 0);
                this.maxFrame = 3;
                this.frameY = 7;
            } else if (this.game.lastKey == 'RArrowLeft' && this.speedX < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 7;
            } else if (this.game.lastKey == 'PArrowRight') {
                this.setSpeed(this.maxSpeed, 0);
                this.maxFrame = 3;
                this.frameY = 5;
            } else if (this.game.lastKey == 'RArrowRight' && this.speedX > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 5;
            } else if (this.game.lastKey == 'PArrowUp') {
                this.setSpeed(0, -this.maxSpeed);
                this.maxFrame = 7;
                this.frameY = 3;
            } else if (this.game.lastKey == 'RArrowUp' && this.speedY < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 3;
            } else if (this.game.lastKey == 'PArrowDown') {
                this.setSpeed(0, this.maxSpeed);
                this.maxFrame = 7;
                this.frameY = 1;
            } else if (this.game.lastKey == 'RArrowDown' && this.speedY > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 1;
            }

            this.x += this.speedX;
            this.y += this.speedY;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;

            const collides = this.game.impassable.some((obj) => {
                const [tileX, tileY, tileWidth, tileHeight] = obj;
                return (this.collisionX + .5) < tileX + tileWidth &&
                    (this.collisionX + .5) + (this.collisionWidth + .5) > tileX &&
                    (this.collisionY + .5) < tileY + tileHeight &&
                    (this.collisionY + .5) + (this.collisionHeight + .5) > tileY;
            });

            if (collides) {
                this.maxFrame = 0
                this.setSpeed(0, 0);
                if (previousKey === 'PArrowLeft') {
                    this.x = prevX + 2
                    this.y = prevY
                }
                if (previousKey === 'PArrowRight') {
                    this.x = prevX - 2
                    this.y = prevY
                }
                if (previousKey === 'PArrowUp') {
                    this.y = prevY + 2
                    this.x = prevX
                }
                if (previousKey === 'PArrowDown') {
                    this.y = prevY - 2
                    this.x = prevX
                }
                if (previousKey === 'RArrowLeft') {
                    this.x = prevX + 2
                    this.y = prevY
                }
                if (previousKey === 'RArrowRight') {
                    this.x = prevX - 2
                    this.y = prevY
                }
                if (previousKey === 'RArrowUp') {
                    this.y = prevY + 2
                    this.x = prevX
                }
                if (previousKey === 'RArrowDown') {
                    this.y = prevY - 2
                    this.x = prevX
                }

            }
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
            }
            //vertical
            if (this.y < 0) {
                this.y = 0;
            } else if (this.y > this.game.height - this.height) {
                this.y = this.game.height - this.height;
            }

            //frame animation
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    class Farmer extends Animation {
        constructor(game, x, y) {
            super(game)
            this.x = x
            this.y = y
            this.images = []
            
            this.image1 = new Image();
            this.image2 = new Image();
            this.image3 = new Image();
            this.image1.src = "imnotevensure.png";
            this.image2.src = "farmers12.png";
            this.image3.src = "randomGen.png";
            this.images.push(this.image1, this.image2, this.image3)
            this.randomIndex = Math.floor(Math.random() * this.images.length)
            this.image = this.images[this.randomIndex]
            this.spriteWidth = 64;
            this.spriteHeight = 64;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.frameX = 0;
            this.frameY = 0;
            this.collisionWidth = this.spriteWidth / 3;
            this.collisionHeight = this.spriteHeight / 2;
            this.collisionX = this.x + (this.width - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.height - this.collisionHeight) / 1.5;
            this.frameInterval = 48000 / this.fps;
            this.randomInt = 0
            this.steps = 0;
            this.loop = 0
        }
        random(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.randomInt = Math.floor(Math.random() * 4) + 1
                this.steps = Math.floor(Math.random() * 5) + 1
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
        update(deltaTime) {
            const prevX = this.x;
            const prevY = this.y;
            if (this.randomInt == 1) {
                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(-this.tileSize / 80, 0)
                        this.maxFrame = 8;
                        this.frameY = 9;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 9
                        this.frameTimer = 0;
                        this.loop = 0
                    }

                } else {
                    this.frameTimer += deltaTime
                }
            } else if (this.randomInt == 2) {

                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(this.tileSize / 80, 0)
                        this.maxFrame = 8;
                        this.frameY = 11;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 11;
                        this.frameTimer = 0;
                        this.loop = 0
                    }
                } else {
                    this.frameTimer += deltaTime
                }
            } else if (this.randomInt == 3) {

                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(0, -this.tileSize / 80 * 0.6)
                        this.maxFrame = 8;
                        this.frameY = 8;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 8;
                        this.frameTimer = 0;
                        this.loop = 0
                    }

                } else {
                    this.frameTimer += deltaTime
                }
            } else if (this.randomInt == 4) {
                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(0, this.tileSize / 80 * 0.6)
                        this.maxFrame = 8;
                        this.frameY = 10;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 10;
                        this.frameTimer = 0;
                        this.loop = 0
                    }
                } else {
                    this.frameTimer += deltaTime
                }
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.collisionX = this.x + (this.width - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.height - this.collisionHeight) / 1.5;
            // this.random(deltaTime)
            const collides = this.game.impassable.some((obj) => {
                const [tileX, tileY, tileWidth, tileHeight] = obj;
                return (this.collisionX) < tileX + tileWidth &&
                    (this.collisionX) + (this.collisionWidth) > tileX &&
                    (this.collisionY) < tileY + tileHeight &&
                    (this.collisionY) + (this.collisionHeight) > tileY;
            });
            if (collides) {
                this.maxFrame = 0
                this.setSpeed(0, 0)
                if (this.randomInt === 1) {
                    this.x = prevX + 2
                    this.y = prevY
                    this.randomInt = 2
                }
                if (this.randomInt === 2) {
                    this.x = prevX - 2
                    this.y = prevY
                    this.randomInt = 1
                }
                if (this.randomInt === 3) {
                    this.y = prevY + 2
                    this.x = prevX
                    this.randomInt = 4
                }
                if (this.randomInt === 4) {
                    this.y = prevY - 2
                    this.x = prevX
                    this.randomInt = 3
                }

            }
            this.collisionX = this.x + (this.width - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.height - this.collisionHeight) / 1.5;
            this.random(deltaTime)
            // horizontal boundaries
            if (this.x < 0) {
                this.x = 0;
                //STOP ANIMATING IF HIT BORDER
                this.maxFrame = 0;
            } else if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
                this.maxFrame = 0;
            }
            //vertical
            if (this.y < 0) {
                this.y = 0;
                this.maxFrame = 0;
            } else if (this.y > this.game.height - this.height) {
                this.y = this.game.height - this.height;
                this.maxFrame = 0;
            }
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
        // draw(ctx) {
        //             // const randomIndex = Math.floor(Math.random() * this.images.length)
        //             // const randomChoice = this.images[randomIndex]
        //     ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        // }
    }
    class BabyCarrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameX = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
            class Pot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
        class Chest extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameX = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
        class OpenChest extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameX = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    class WaterSparkle extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "sparkle.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
        class WaterFallTop extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 1;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 7;
            this.frameY = 1;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
        class WaterFallMid extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 7;
            this.frameY = 2;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
        class WaterFallBot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 7;
            this.frameY = 3;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
            class WaterBubbleTop extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 6;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
        class WaterBubbleBot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 7;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    
    class Carrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 3;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 15000 / this.fps;

        }
        update(deltaTime) {
        }
    }
    class Burrow extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "crops32.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.frameX = 0;
            this.frameY = 9;

            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;
        }
        update(deltaTime) {
        }
    }
    class World0 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image1 = new Image();


            this.image1.src = "spring2.png"
            this.image.src = "spring2.png"
            this.levelTOP = this.image1
            this.levelImage = this.image
            this.levelImage.width = 256

            this.imageColumns = this.levelImage.width / tileSize;
            console.log(this.imageColumns)
            console.log(this.levelImage)
            this.level = [
                81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 18, 37, 37, 19, 19, 20, 81, 81, 124, 81, 98, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 81, 33, 33, 33, 33,
                81, 81, 81, 81, 81, 81, 81, 129, 81, 81, 81, 101, 81, 81, 81, 18, 53, 37, 21, 19, 20, 81, 81, 124, 81, 81, 81, 81, 81, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 115, 81, 33, 33, 33, 33,
                33, 145, 81, 81, 81, 81, 81, 81, 0, 81, 81, 81, 81, 81, 81, 18, 19, 53, 19, 69, 66, 4, 0, 81, 81, 81, 81, 101, 81, 0, 33, 0, 0, 0, 98, 33, 33, 0, 81, 81, 81, 81, 33, 101, 33,
                33, 33, 33, 81, 81, 81, 81, 81, 81, 124, 81, 81, 81, 81, 81, 34, 51, 37, 101, 19, 69, 66, 3, 3, 84, 3, 84, 3, 84, 3, 3, 3, 84, 4, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 1,
                33, 33, 33, 129, 81, 81, 65, 65, 81, 124, 124, 124, 124, 81, 81, 101, 18, 37, 37, 37, 69, 37, 69, 37, 37, 69, 53, 53, 19, 19, 5, 19, 19, 19, 3, 3, 84, 3, 3, 84, 84, 3, 3, 84, 3,
                33, 81, 81, 81, 116, 33, 65, 65, 65, 65, 116, 0, 81, 81, 81, 124, 18, 19, 53, 37, 19, 19, 19, 19, 19, 37, 19, 5, 19, 5, 69, 19, 21, 19, 19, 53, 53, 21, 5, 19, 21, 21, 19, 69, 21,
                33, 115, 33, 116, 33, 33, 33, 65, 65, 65, 81, 101, 81, 124, 124, 124, 18, 69, 21, 37, 53, 19, 37, 19, 53, 19, 37, 101, 19, 53, 5, 19, 19, 19, 69, 21, 53, 21, 21, 21, 69, 19, 19, 19, 19,
                81, 81, 33, 101, 33, 33, 116, 65, 65, 65, 81, 81, 81, 81, 124, 124, 34, 35, 35, 35, 85, 35, 35, 85, 35, 35, 85, 85, 85, 85, 35, 35, 85, 35, 35, 85, 35, 35, 85, 35, 35, 101, 85, 85, 35,
                81, 33, 33, 33, 33, 65, 65, 65, 33, 65, 65, 81, 145, 124, 124, 124, 33, 33, 33, 33, 98, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
                33, 33, 33, 33, 65, 65, 33, 33, 33, 65, 33, 33, 33, 124, 124, 124, 33, 115, 33, 33, 33, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 65, 65, 33, 116, 124, 124, 124, 124, 124, 124, 124, 124, 115, 124,
                33, 33, 33, 116, 65, 116, 65, 65, 115, 65, 65, 65, 33, 33, 33, 124, 33, 124, 33, 33, 33, 145, 33, 33, 0, 0, 0, 0, 0, 0, 1, 65, 65, 116, 33, 116, 65, 124, 124, 124, 124, 124, 124, 124, 124,
                33, 33, 33, 33, 65, 65, 65, 33, 33, 65, 65, 81, 33, 0, 33, 124, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 0, 0, 65, 65, 101, 65, 65, 65, 65, 65, 65, 33, 33, 145, 33, 81, 81, 81,
                33, 33, 33, 33, 33, 33, 33, 116, 33, 65, 81, 33, 116, 33, 33, 124, 65, 65, 33, 33, 116, 33, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 116, 65, 0, 0, 33, 33, 81, 33, 33,
                33, 116, 116, 33, 116, 116, 0, 33, 65, 65, 81, 116, 33, 33, 65, 65, 65, 33, 33, 33, 33, 116, 116, 65, 65, 65, 65, 65, 65, 33, 98, 33, 33, 33, 33, 33, 65, 65, 33, 33, 33, 33, 81, 81, 33,
                33, 33, 33, 33, 33, 33, 33, 33, 65, 65, 65, 116, 65, 65, 65, 49, 65, 163, 164, 165, 65, 65, 65, 65, 49, 49, 135, 49, 65, 65, 33, 33, 145, 33, 33, 33, 65, 65, 33, 116, 33, 33, 33, 81, 33,
                33, 33, 33, 33, 129, 145, 33, 33, 65, 65, 65, 65, 65, 49, 49, 138, 65, 195, 196, 197, 49, 49, 49, 49, 49, 49, 49, 135, 116, 65, 33, 33, 33, 33, 98, 33, 65, 116, 33, 33, 33, 125, 81, 81, 0,
                33, 101, 33, 33, 33, 98, 33, 33, 33, 65, 65, 49, 65, 65, 49, 65, 114, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 135, 65, 65, 65, 65, 145, 65, 65, 138, 163, 164, 165, 0, 81, 0, 0, 0,
                33, 33, 33, 33, 33, 33, 97, 97, 145, 65, 65, 49, 49, 65, 65, 65, 114, 17, 98, 98, 17, 98, 17, 17, 17, 97, 0, 49, 116, 65, 0, 0, 0, 0, 0, 0, 65, 179, 180, 181, 65, 81, 158, 0, 65,
                33, 33, 33, 33, 33, 33, 49, 33, 97, 218, 65, 65, 65, 65, 65, 33, 33, 17, 17, 17, 17, 98, 17, 17, 17, 17, 17, 49, 65, 65, 0, 0, 0, 0, 0, 0, 99, 179, 180, 181, 81, 81, 174, 65, 65,
                0, 81, 0, 81, 81, 81, 49, 49, 0, 65, 65, 65, 65, 65, 65, 114, 17, 98, 17, 17, 17, 17, 17, 0, 0, 17, 17, 0, 65, 0, 0, 0, 0, 0, 0, 99, 99, 195, 196, 197, 81, 65, 81, 65, 65,
                49, 81, 81, 49, 49, 81, 81, 81, 81, 65, 65, 65, 114, 33, 114, 17, 17, 17, 17, 124, 17, 65, 65, 65, 17, 17, 115, 65, 65, 0, 0, 0, 0, 0, 113, 99, 0, 81, 17, 17, 65, 65, 81, 65, 65,
                49, 49, 81, 81, 81, 49, 49, 114, 177, 236, 255, 66, 4, 17, 1, 17, 17, 101, 17, 17, 17, 65, 115, 65, 65, 65, 65, 65, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 65, 65, 65, 65, 65,
                49, 49, 49, 49, 49, 81, 49, 100, 193, 236, 69, 19, 20, 65, 65, 17, 129, 17, 145, 124, 124, 124, 124, 17, 17, 17, 17, 17, 17, 33, 33, 33, 33, 33, 113, 33, 65, 65, 65, 65, 65, 129, 65, 65, 65,
                49, 129, 81, 81, 81, 49, 114, 49, 209, 210, 211, 35, 65, 97, 65, 65, 17, 17, 17, 17, 0, 65, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 33, 99, 99, 65, 65, 99, 33, 65, 65, 115, 65, 101, 65,
                49, 49, 81, 49, 49, 49, 49, 49, 193, 210, 227, 65, 65, 65, 17, 65, 97, 33, 17, 17, 17, 65, 33, 33, 33, 33, 33, 33, 33, 145, 33, 33, 33, 33, 65, 65, 33, 33, 33, 99, 65, 65, 65, 145, 65,
                49, 49, 49, 49, 49, 49, 49, 49, 193, 210, 227, 98, 17, 65, 65, 65, 65, 97, 97, 17, 17, 65, 0, 145, 33, 33, 33, 33, 0, 33, 33, 33, 65, 65, 65, 0, 0, 33, 33, 33, 65, 65, 65, 65, 65,
                81, 81, 49, 49, 101, 49, 145, 49, 193, 210, 227, 17, 17, 17, 17, 129, 65, 65, 65, 65, 65, 65, 0, 215, 0, 0, 0, 218, 0, 98, 33, 33, 65, 65, 33, 33, 33, 33, 33, 99, 65, 101, 65, 65, 65,
                81, 81, 81, 49, 49, 49, 49, 49, 193, 210, 227, 17, 98, 17, 17, 17, 17, 17, 97, 65, 65, 2, 0, 0, 33, 33, 33, 0, 0, 4, 33, 65, 0, 33, 33, 33, 33, 33, 33, 65, 0, 0, 65, 65, 65,
                49, 49, 81, 81, 81, 49, 49, 49, 193, 210, 227, 17, 17, 17, 101, 17, 17, 17, 97, 17, 98, 18, 237, 0, 0, 0, 0, 0, 238, 20, 65, 65, 65, 65, 65, 65, 65, 65, 65, 115, 33, 115, 33, 33, 33,
                101, 49, 49, 49, 81, 81, 81, 81, 209, 210, 243, 129, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 237, 0, 0, 0, 0, 0, 238, 20, 98, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65
            ]
            this.groundObjects = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 146, 0, 109, 110, 111, 0, 0, 0, 147, 148, 0, 146, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146,
                0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 103, 104, 105, 106, 107, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 147, 148, 0, 0, 133, 0, 0,
                0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 153, 152, 153, 152, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 0, 0, 0, 121, 120, 169, 168, 169, 103, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 127, 128,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 87, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 141, 142, 143, 144,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 87, 151, 152, 153, 152, 153, 152, 152, 153, 154, 0, 0, 0, 156, 157, 0, 159, 160,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233, 232, 233, 232, 233, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 88, 89, 105, 88, 89, 90, 0, 0, 0, 105, 173, 0, 175, 176,
                109, 110, 111, 0, 0, 0, 0, 0, 218, 219, 186, 200, 169, 168, 169, 170, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 102, 103, 104, 105, 104, 104, 89, 104, 105, 106, 0, 0, 0, 121, 189, 0, 0, 0,
                0, 6, 0, 0, 0, 0, 0, 0, 203, 249, 250, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 120, 120, 121, 120, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 203, 236, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214, 0, 109, 110, 111, 0, 219, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 231, 232, 233, 233, 234, 235, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247, 248, 249, 248, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236, 236, 236, 236, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.animated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 261, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 257, 257, 257, 257, 257, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.background = [
                0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 28, 29, 30, 31, 32, 130, 0, 93, 94, 95, 96, 0, 0, 131, 132, 0, 130, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,
                0, 0, 0, 0, 130, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 94, 95, 96, 27, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 109, 110, 111, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 55, 33, 33, 58, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 71, 72, 73, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 87, 88, 89, 90, 91, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0,
                93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 256, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 7, 244, 245, 10, 0, 228, 229, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 145, 49, 26, 27, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 38, 97, 49, 130, 97, 43, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 54, 55, 0, 146, 58, 59, 0, 0, 0, 0, 0

            ]
            this.drawAnimatedTile()
            //for top layers            
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        drawBackground(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }

        draw(ctx) {
            this.game.impassable = [];
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.groundObjects, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                    if (tile !== 0) {

                        this.game.impassable.push([col * tileSize, row * tileSize, tileSize, tileSize])
                    }
                }
            }
        }
        drawAnimatedTile() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.animated, col, row);
                    const x = col * tileSize;
                    const y = row * tileSize;
                    if (tile !== 0) {

                        this.game.animated.push(new WaterSparkle(this, x, y))
                        console.log(this.game.animated)
                    }
                }
            }
        }
        drawForGround(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.background, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelTOP, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {
        }
    }
    class World1 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image1 = new Image();


            this.image1.src = "summer2.png"
            this.image.src = "summer2.png"
            this.levelTOP = this.image1
            this.levelImage = this.image
            this.levelImage.width = 256

            this.imageColumns = this.levelImage.width / tileSize;
            console.log(this.imageColumns)
            console.log(this.levelImage)
            this.level = [
                81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 18, 37, 19, 19, 19, 20, 81, 81, 124, 81, 98, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 81, 33, 33, 33, 33,
            81, 81, 81, 81, 81, 81, 81, 129, 81, 81, 81, 101, 81, 81, 81, 18, 53, 19, 19, 19, 20, 81, 81, 124, 81, 81, 81, 81, 81, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 115, 81, 33, 33, 33, 33,
            33, 145, 81, 81, 81, 81, 81, 81, 0, 81, 81, 81, 81, 81, 81, 18, 19, 53, 19, 69, 66, 4, 0, 81, 81, 81, 81, 101, 81, 0, 33, 0, 0, 0, 98, 33, 33, 0, 81, 81, 81, 81, 33, 101, 33,
            33, 33, 33, 81, 81, 81, 81, 81, 81, 124, 81, 81, 81, 81, 81, 34, 51, 37, 19, 19, 69, 66, 3, 3, 84, 3, 84, 3, 84, 3, 3, 3, 84, 4, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 1,
            33, 33, 33, 129, 81, 81, 65, 65, 81, 124, 124, 124, 124, 81, 81, 101, 18, 37, 19, 19, 19, 19, 69, 37, 37, 69, 53, 53, 19, 19, 5, 19, 19, 19, 3, 3, 84, 3, 3, 84, 84, 3, 3, 84, 3,
            33, 81, 81, 81, 116, 33, 65, 65, 65, 65, 116, 0, 81, 81, 81, 124, 18, 19, 53, 37, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
            33, 115, 33, 116, 33, 33, 33, 65, 65, 65, 81, 101, 81, 124, 124, 124, 18, 69, 21, 37, 53, 19, 37, 19, 53, 19, 37, 101, 19, 53, 50, 19, 19, 220, 220, 220, 220, 236, 236, 236, 220, 220, 220, 220, 220,
            81, 81, 33, 101, 33, 33, 116, 65, 65, 65, 81, 81, 81, 81, 124, 124, 34, 35, 35, 35, 85, 35, 35, 85, 35, 35, 85, 85, 85, 85, 36, 33, 33, 33, 33, 33, 33, 21, 236, 33, 33, 101, 33, 33, 35,
            81, 33, 33, 33, 33, 65, 65, 65, 33, 65, 65, 81, 145, 124, 124, 124, 33, 33, 33, 33, 98, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 33, 21, 236, 21, 33, 124, 124, 124, 124,
            33, 33, 33, 33, 65, 65, 33, 33, 33, 65, 33, 33, 33, 124, 124, 124, 33, 115, 33, 33, 33, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 65, 65, 33, 116, 124, 33, 21, 236, 21, 33, 124, 124, 115, 124,
            33, 33, 33, 116, 65, 116, 65, 65, 115, 65, 65, 65, 33, 33, 33, 124, 33, 124, 33, 33, 33, 145, 33, 33, 0, 0, 0, 0, 0, 0, 1, 65, 65, 116, 33, 116, 33, 21, 236, 21, 33, 124, 124, 124, 124,
            33, 33, 33, 33, 65, 65, 65, 33, 33, 65, 65, 81, 33, 0, 33, 124, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 0, 0, 65, 65, 101, 65, 65, 65, 65, 33, 21, 236, 21, 33, 33, 81, 81, 81,
            33, 33, 33, 33, 33, 33, 33, 116, 33, 65, 81, 33, 116, 33, 33, 124, 65, 65, 33, 33, 116, 33, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 33, 21, 236, 21, 33, 33, 81, 33, 33,
            33, 116, 116, 33, 116, 116, 0, 33, 65, 65, 81, 116, 33, 33, 65, 65, 65, 33, 33, 33, 33, 116, 116, 65, 65, 65, 65, 65, 65, 33, 98, 33, 33, 33, 33, 33, 58, 186, 236, 183, 55, 33, 81, 81, 33,
            33, 33, 33, 33, 33, 33, 33, 33, 65, 65, 65, 116, 65, 65, 65, 49, 65, 163, 164, 165, 65, 65, 65, 65, 49, 49, 135, 49, 65, 65, 33, 33, 145, 33, 33, 33, 34, 250, 236, 247, 36, 33, 33, 81, 33,
            33, 33, 33, 33, 129, 145, 33, 33, 65, 65, 65, 65, 65, 49, 49, 138, 65, 195, 196, 197, 49, 49, 49, 49, 49, 49, 49, 135, 116, 65, 33, 33, 33, 33, 98, 33, 34, 221, 236, 221, 36, 125, 81, 81, 0,
            33, 101, 33, 33, 33, 98, 33, 33, 33, 65, 65, 49, 65, 65, 49, 65, 114, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 135, 65, 65, 65, 65, 145, 65, 65, 138, 163, 238, 165, 0, 81, 0, 0, 0,
            33, 33, 33, 33, 33, 33, 97, 97, 145, 65, 65, 49, 49, 65, 65, 65, 114, 17, 98, 98, 17, 98, 17, 17, 17, 97, 0, 49, 116, 65, 0, 0, 0, 0, 0, 0, 65, 179, 180, 181, 65, 81, 158, 0, 65,
            33, 33, 33, 33, 33, 33, 49, 33, 97, 218, 65, 65, 65, 65, 65, 33, 33, 17, 17, 17, 17, 98, 17, 17, 17, 17, 17, 49, 65, 65, 0, 0, 0, 0, 0, 0, 99, 179, 180, 181, 81, 81, 174, 65, 65,
            0, 81, 0, 81, 81, 81, 49, 49, 0, 65, 65, 65, 65, 65, 65, 114, 17, 98, 17, 17, 17, 17, 17, 0, 0, 17, 17, 0, 65, 0, 0, 0, 0, 0, 0, 99, 99, 248, 236, 248, 249, 65, 237, 237, 237,
            49, 81, 81, 49, 49, 81, 81, 81, 81, 65, 65, 65, 114, 33, 114, 17, 17, 17, 17, 124, 17, 65, 65, 65, 17, 17, 115, 65, 65, 0, 0, 0, 0, 0, 113, 99, 0, 237, 220, 237, 237, 238, 220, 237, 222,
            49, 49, 81, 81, 81, 49, 49, 114, 177, 236, 255, 66, 4, 17, 1, 17, 17, 101, 17, 17, 17, 65, 115, 65, 65, 65, 65, 65, 17, 17, 17, 17, 17, 17, 17, 252, 236, 236, 236, 236, 236, 236, 236, 236, 236,
            49, 49, 49, 49, 49, 81, 49, 100, 193, 236, 69, 19, 20, 65, 65, 17, 129, 17, 145, 124, 124, 124, 124, 17, 17, 17, 17, 17, 17, 33, 33, 33, 33, 33, 113, 33, 65, 65, 65, 65, 65, 129, 65, 236, 236,
            49, 129, 81, 81, 81, 49, 114, 49, 209, 210, 211, 35, 65, 97, 65, 65, 17, 17, 17, 17, 0, 65, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 33, 99, 99, 65, 65, 99, 33, 65, 65, 115, 65, 101, 65,
            49, 49, 81, 49, 49, 49, 49, 49, 193, 210, 227, 65, 65, 65, 17, 65, 97, 33, 17, 17, 17, 65, 33, 33, 33, 33, 33, 33, 33, 145, 33, 33, 33, 33, 65, 65, 33, 33, 33, 99, 65, 65, 65, 145, 65,
            49, 49, 49, 49, 49, 49, 49, 49, 193, 210, 227, 98, 17, 65, 65, 65, 65, 97, 97, 17, 17, 65, 0, 145, 33, 33, 33, 33, 0, 33, 33, 33, 65, 65, 65, 0, 0, 33, 33, 33, 65, 65, 65, 65, 65,
            81, 81, 49, 49, 101, 49, 145, 49, 193, 210, 227, 17, 17, 17, 17, 129, 65, 65, 65, 65, 65, 65, 0, 215, 0, 0, 0, 218, 0, 98, 33, 33, 65, 65, 33, 33, 33, 33, 33, 99, 65, 101, 65, 65, 65,
            81, 81, 81, 49, 49, 49, 49, 49, 193, 210, 227, 17, 98, 17, 17, 17, 17, 17, 97, 65, 65, 2, 0, 0, 33, 33, 33, 0, 0, 4, 33, 65, 0, 33, 33, 33, 33, 33, 33, 65, 0, 0, 65, 65, 65,
            49, 49, 81, 81, 81, 49, 49, 49, 193, 210, 227, 17, 17, 17, 101, 17, 17, 17, 97, 17, 98, 18, 237, 0, 0, 0, 0, 0, 238, 20, 65, 65, 65, 65, 65, 65, 65, 65, 65, 115, 33, 115, 33, 33, 33,
            101, 49, 49, 49, 81, 81, 81, 81, 209, 210, 243, 129, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 237, 0, 0, 0, 0, 0, 238, 20, 98, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65
            ]
            this.groundObjects = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 146, 0, 109, 110, 111, 0, 0, 0, 147, 148, 0, 146, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146,
            0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 244, 245, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 103, 104, 105, 106, 107, 146, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 234, 0, 231, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 153, 152, 153, 152, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 0, 0, 0, 121, 120, 169, 168, 169, 103, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 127, 128,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 155, 0, 0, 0, 0, 0, 0, 0, 0, 150, 87, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 141, 142, 143, 144,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 87, 151, 152, 153, 152, 153, 152, 152, 153, 154, 0, 0, 0, 156, 157, 0, 159, 160,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233, 232, 233, 232, 233, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 88, 89, 105, 88, 89, 90, 0, 0, 0, 105, 173, 0, 182, 200,
            109, 110, 111, 0, 0, 0, 0, 0, 218, 219, 186, 200, 169, 168, 169, 170, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 102, 103, 104, 105, 104, 104, 89, 104, 105, 106, 0, 0, 0, 249, 250, 0, 0, 0,
            0, 6, 0, 0, 0, 0, 0, 0, 203, 249, 250, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 120, 120, 121, 120, 249, 235, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 203, 236, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214, 0, 109, 110, 111, 0, 219, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 231, 232, 233, 233, 234, 235, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247, 248, 249, 248, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236, 236, 236, 236, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.animated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277, 277, 277, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285, 285, 285, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 293, 293, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 293, 293, 0, 0, 261, 261, 265,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 265, 257, 265,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 261, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268, 261,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 257, 257, 257, 257, 257, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.animatedOverlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 317, 317, 317, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325, 325, 325, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.background = [
                0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 28, 29, 30, 31, 32, 130, 0, 93, 94, 95, 96, 0, 0, 131, 132, 0, 130, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,
            0, 0, 0, 0, 130, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 228, 229, 224, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 94, 95, 96, 27, 0, 228, 229, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 109, 110, 111, 0, 43, 0, 0, 0, 8, 9, 9, 8, 27, 0, 7, 8, 8, 9, 8, 8,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 55, 33, 33, 58, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 71, 72, 73, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 87, 88, 89, 90, 91, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0,
            93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 223, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 8, 9, 9, 8, 10, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 256, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 26, 9, 8,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 7, 244, 245, 10, 0, 228, 229, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 145, 49, 26, 27, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 38, 97, 49, 130, 97, 43, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 54, 55, 0, 146, 58, 59, 0, 0, 0, 0, 0

            ]
            this.drawAnimatedTile()
            this.drawAnimatedTileOverLay()
            //for top layers            
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        drawBackground(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        draw(ctx) {
            this.game.impassable = [];
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.groundObjects, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                    if (tile !== 0) {

                        this.game.impassable.push([col * tileSize, row * tileSize, tileSize, tileSize])
                    }
                }
            }
        }
        drawAnimatedTile() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.animated, col, row);
                    const x = col * tileSize;
                    const y = row * tileSize;
                    if (tile !== 0) {

                        this.game.animated.push(new WaterSparkle(this, x, y))
                        console.log(this.game.animated)
                    }
                    if (tile === 277) {

                        this.game.animated.push(new WaterFallTop(this, x, y))
                        console.log(this.game.animated)
                    }
                    if (tile === 285) {

                        this.game.animated.push(new WaterFallMid(this, x, y))
                        console.log(this.game.animated)
                    }
                    if (tile === 293) {

                        this.game.animated.push(new WaterFallBot(this, x, y))
                        console.log(this.game.animated)
                    }
                }
            }
        }
        drawAnimatedTileOverLay() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.animatedOverlayer, col, row);
                    const x = col * tileSize;
                    const y = row * tileSize;
                    if (tile === 317) {

                        this.game.animatedOverlay.push(new WaterBubbleTop(this, x, y))

                    }
                    if (tile === 325) {

                        this.game.animatedOverlay.push(new WaterBubbleBot(this, x, y))
 
                    }
                }
            }
        }
        drawForGround(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.background, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelTOP, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {
        }

    }
    class World2 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image1 = new Image();


            this.image1.src = "fall2.png"
            this.image.src = "fall2.png"
            this.levelTOP = this.image1
            this.levelImage = this.image
            this.levelImage.width = 256

            this.imageColumns = this.levelImage.width / tileSize;
            console.log(this.imageColumns)
            console.log(this.levelImage)
            this.level = [
                81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 18, 37, 19, 19, 19, 20, 81, 81, 124, 81, 98, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 81, 33, 33, 33, 33,
            81, 81, 81, 81, 81, 81, 81, 129, 81, 81, 81, 101, 81, 81, 81, 18, 53, 19, 19, 19, 20, 81, 81, 124, 81, 81, 81, 81, 81, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 115, 81, 33, 33, 33, 33,
            33, 145, 81, 81, 81, 81, 81, 81, 0, 81, 81, 81, 81, 81, 81, 18, 19, 53, 19, 69, 66, 4, 0, 81, 81, 81, 81, 101, 81, 0, 33, 0, 0, 0, 98, 33, 33, 0, 81, 81, 81, 81, 33, 101, 33,
            33, 33, 33, 81, 81, 81, 81, 81, 81, 124, 81, 81, 81, 81, 81, 34, 51, 37, 19, 19, 69, 66, 3, 3, 84, 3, 84, 3, 84, 3, 3, 3, 84, 4, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 1,
            33, 33, 33, 129, 81, 81, 65, 65, 81, 124, 124, 124, 124, 81, 81, 101, 18, 37, 19, 19, 19, 19, 69, 37, 37, 69, 53, 53, 19, 19, 5, 19, 19, 19, 3, 3, 84, 3, 3, 84, 84, 3, 3, 84, 3,
            33, 81, 81, 81, 116, 33, 65, 65, 65, 65, 116, 0, 81, 81, 81, 124, 18, 19, 53, 37, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
            33, 115, 33, 116, 33, 33, 33, 65, 65, 65, 81, 101, 81, 124, 124, 124, 18, 69, 21, 37, 53, 19, 37, 19, 53, 19, 37, 101, 19, 53, 50, 19, 19, 220, 220, 220, 220, 236, 236, 236, 220, 220, 220, 220, 220,
            81, 81, 33, 101, 33, 33, 116, 65, 65, 65, 81, 81, 81, 81, 124, 124, 34, 35, 35, 35, 85, 35, 35, 85, 35, 35, 85, 85, 85, 85, 36, 33, 33, 33, 33, 33, 33, 21, 236, 33, 33, 101, 33, 33, 35,
            81, 33, 33, 33, 33, 65, 65, 65, 33, 65, 65, 81, 145, 124, 124, 124, 33, 33, 33, 33, 98, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 33, 21, 236, 21, 33, 124, 124, 124, 124,
            33, 33, 33, 33, 65, 65, 33, 33, 33, 65, 33, 33, 33, 124, 124, 124, 33, 115, 33, 33, 33, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 65, 65, 33, 116, 124, 33, 21, 236, 21, 33, 124, 124, 115, 124,
            33, 33, 33, 116, 65, 116, 65, 65, 115, 65, 65, 65, 33, 33, 33, 124, 33, 124, 33, 33, 33, 145, 33, 33, 0, 0, 0, 0, 0, 0, 1, 65, 65, 116, 33, 116, 33, 21, 236, 21, 33, 124, 124, 124, 124,
            33, 33, 33, 33, 65, 65, 65, 33, 33, 65, 65, 81, 33, 0, 33, 124, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 0, 0, 65, 65, 101, 65, 65, 65, 65, 33, 21, 236, 21, 33, 33, 81, 81, 81,
            33, 33, 33, 33, 33, 33, 33, 116, 33, 65, 81, 33, 116, 33, 33, 124, 65, 65, 33, 33, 116, 33, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 33, 21, 236, 21, 33, 33, 81, 33, 33,
            33, 116, 116, 33, 116, 116, 0, 33, 65, 65, 81, 116, 33, 33, 65, 65, 65, 33, 33, 33, 33, 116, 116, 65, 65, 65, 65, 65, 65, 33, 98, 33, 33, 33, 33, 33, 58, 186, 236, 183, 55, 33, 81, 81, 33,
            33, 33, 33, 33, 33, 33, 33, 33, 65, 65, 65, 116, 65, 65, 65, 49, 65, 163, 164, 165, 65, 65, 65, 65, 49, 49, 135, 49, 65, 65, 33, 33, 145, 33, 33, 33, 34, 250, 236, 247, 36, 33, 33, 81, 33,
            33, 33, 33, 33, 129, 145, 33, 33, 65, 65, 65, 65, 65, 49, 49, 138, 65, 195, 196, 197, 49, 49, 49, 49, 49, 49, 49, 135, 116, 65, 33, 33, 33, 33, 98, 33, 34, 221, 236, 221, 36, 125, 81, 81, 0,
            33, 101, 33, 33, 33, 98, 33, 33, 33, 65, 65, 49, 65, 65, 49, 65, 114, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 135, 65, 65, 65, 65, 145, 65, 65, 138, 163, 238, 165, 0, 81, 0, 0, 0,
            33, 33, 33, 33, 33, 33, 97, 97, 145, 65, 65, 49, 49, 65, 65, 65, 114, 17, 98, 98, 17, 98, 17, 17, 17, 97, 0, 49, 116, 65, 0, 0, 0, 0, 0, 0, 65, 179, 180, 181, 65, 81, 158, 0, 65,
            33, 33, 33, 33, 33, 33, 49, 33, 97, 218, 65, 65, 65, 65, 65, 33, 33, 17, 17, 17, 17, 98, 17, 17, 17, 17, 17, 49, 65, 65, 0, 0, 0, 0, 0, 0, 99, 179, 180, 181, 81, 81, 174, 65, 65,
            0, 81, 0, 81, 81, 81, 49, 49, 0, 65, 65, 65, 65, 65, 65, 114, 17, 98, 17, 17, 17, 17, 17, 0, 0, 17, 17, 0, 65, 0, 0, 0, 0, 0, 0, 99, 99, 248, 236, 248, 249, 65, 237, 237, 237,
            49, 81, 81, 49, 49, 81, 81, 81, 81, 65, 65, 65, 114, 33, 114, 17, 17, 17, 17, 124, 17, 65, 65, 65, 17, 17, 115, 65, 65, 0, 0, 0, 0, 0, 113, 99, 0, 237, 220, 237, 237, 238, 220, 237, 222,
            49, 49, 81, 81, 81, 49, 49, 114, 177, 236, 255, 66, 4, 17, 1, 17, 17, 101, 17, 17, 17, 65, 115, 65, 65, 65, 65, 65, 17, 17, 17, 17, 17, 17, 17, 252, 236, 236, 236, 236, 236, 236, 236, 236, 236,
            49, 49, 49, 49, 49, 81, 49, 100, 193, 236, 69, 19, 20, 65, 65, 17, 129, 17, 145, 124, 124, 124, 124, 17, 17, 17, 17, 17, 17, 33, 33, 33, 33, 33, 113, 33, 65, 65, 65, 65, 65, 129, 65, 236, 236,
            49, 129, 81, 81, 81, 49, 114, 49, 209, 210, 211, 35, 65, 97, 65, 65, 17, 17, 17, 17, 0, 65, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 33, 99, 99, 65, 65, 99, 33, 65, 65, 115, 65, 101, 65,
            49, 49, 81, 49, 49, 49, 49, 49, 193, 210, 227, 65, 65, 65, 17, 65, 97, 33, 17, 17, 17, 65, 33, 33, 33, 33, 33, 33, 33, 145, 33, 33, 33, 33, 65, 65, 33, 33, 33, 99, 65, 65, 65, 145, 65,
            49, 49, 49, 49, 49, 49, 49, 49, 193, 210, 227, 98, 17, 65, 65, 65, 65, 97, 97, 17, 17, 65, 0, 145, 33, 33, 33, 33, 0, 33, 33, 33, 65, 65, 65, 0, 0, 33, 33, 33, 65, 65, 65, 65, 65,
            81, 81, 49, 49, 101, 49, 145, 49, 193, 210, 227, 17, 17, 17, 17, 129, 65, 65, 65, 65, 65, 65, 0, 215, 0, 0, 0, 218, 0, 98, 33, 33, 65, 65, 33, 33, 33, 33, 33, 99, 65, 101, 65, 65, 65,
            81, 81, 81, 49, 49, 49, 49, 49, 193, 210, 227, 17, 98, 17, 17, 17, 17, 17, 97, 65, 65, 2, 0, 0, 33, 33, 33, 0, 0, 4, 33, 65, 0, 33, 33, 33, 33, 33, 33, 65, 0, 0, 65, 65, 65,
            49, 49, 81, 81, 81, 49, 49, 49, 193, 210, 227, 17, 17, 17, 101, 17, 17, 17, 97, 17, 98, 18, 237, 0, 0, 0, 0, 0, 238, 20, 65, 65, 65, 65, 65, 65, 65, 65, 65, 115, 33, 115, 33, 33, 33,
            101, 49, 49, 49, 81, 81, 81, 81, 209, 210, 243, 129, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 237, 0, 0, 0, 0, 0, 238, 20, 98, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65
            ]
            this.groundObjects = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 146, 0, 109, 110, 111, 0, 0, 0, 147, 148, 0, 146, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146,
            0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 244, 245, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 103, 104, 105, 106, 107, 146, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 234, 0, 231, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 153, 152, 153, 152, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 0, 0, 0, 121, 120, 169, 168, 169, 103, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 127, 128,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 155, 0, 0, 0, 0, 0, 0, 0, 0, 150, 87, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 141, 142, 143, 144,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 87, 151, 152, 153, 152, 153, 152, 152, 153, 154, 0, 0, 0, 156, 157, 0, 159, 160,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233, 232, 233, 232, 233, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 88, 89, 105, 88, 89, 90, 0, 0, 0, 105, 173, 0, 182, 200,
            109, 110, 111, 0, 0, 0, 0, 0, 218, 219, 186, 200, 169, 168, 169, 170, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 102, 103, 104, 105, 104, 104, 89, 104, 105, 106, 0, 0, 0, 249, 250, 0, 0, 0,
            0, 6, 0, 0, 0, 0, 0, 0, 203, 249, 250, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 120, 120, 121, 120, 249, 235, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 203, 236, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214, 0, 109, 110, 111, 0, 219, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 231, 232, 233, 233, 234, 235, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247, 248, 249, 248, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236, 236, 236, 236, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.animated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277, 277, 277, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285, 285, 285, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 293, 293, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 293, 293, 0, 0, 261, 261, 265,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 265, 257, 265,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 261, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268, 261,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 257, 257, 257, 257, 257, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.animatedOverlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 317, 317, 317, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325, 325, 325, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.background = [
                0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 28, 29, 30, 31, 32, 130, 0, 93, 94, 95, 96, 0, 0, 131, 132, 0, 130, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,
            0, 0, 0, 0, 130, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 228, 229, 224, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 94, 95, 96, 27, 0, 228, 229, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 109, 110, 111, 0, 43, 0, 0, 0, 8, 9, 9, 8, 27, 0, 7, 8, 8, 9, 8, 8,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 55, 33, 33, 58, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 71, 72, 73, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 87, 88, 89, 90, 91, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0,
            93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 223, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 8, 9, 9, 8, 10, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 256, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 26, 9, 8,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 7, 244, 245, 10, 0, 228, 229, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 145, 49, 26, 27, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 38, 97, 49, 130, 97, 43, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 54, 55, 0, 146, 58, 59, 0, 0, 0, 0, 0

            ]
            this.drawAnimatedTile()
            this.drawAnimatedTileOverLay()
            //for top layers            
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        drawBackground(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        draw(ctx) {
            this.game.impassable = [];
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.groundObjects, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                    if (tile !== 0) {

                        this.game.impassable.push([col * tileSize, row * tileSize, tileSize, tileSize])
                    }
                }
            }
        }
        drawAnimatedTile() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.animated, col, row);
                    const x = col * tileSize;
                    const y = row * tileSize;
                    if (tile !== 0) {

                        this.game.animated.push(new WaterSparkle(this, x, y))
                        console.log(this.game.animated)
                    }
                    if (tile === 277) {

                        this.game.animated.push(new WaterFallTop(this, x, y))
                        console.log(this.game.animated)
                    }
                    if (tile === 285) {

                        this.game.animated.push(new WaterFallMid(this, x, y))
                        console.log(this.game.animated)
                    }
                    if (tile === 293) {

                        this.game.animated.push(new WaterFallBot(this, x, y))
                        console.log(this.game.animated)
                    }
                }
            }
        }
        drawAnimatedTileOverLay() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.animatedOverlayer, col, row);
                    const x = col * tileSize;
                    const y = row * tileSize;
                    if (tile === 317) {

                        this.game.animatedOverlay.push(new WaterBubbleTop(this, x, y))

                    }
                    if (tile === 325) {

                        this.game.animatedOverlay.push(new WaterBubbleBot(this, x, y))
 
                    }
                }
            }
        }
        drawForGround(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.background, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelTOP, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {
        }

    }
    class World3 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image1 = new Image();


            this.image1.src = "winter2.png"
            this.image.src = "winter2.png"
            this.levelTOP = this.image1
            this.levelImage = this.image
            this.levelImage.width = 256

            this.imageColumns = this.levelImage.width / tileSize;
            console.log(this.imageColumns)
            console.log(this.levelImage)
                        this.level = [
                81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 18, 37, 19, 19, 19, 20, 81, 81, 124, 81, 98, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 81, 33, 33, 33, 33,
            81, 81, 81, 81, 81, 81, 81, 129, 81, 81, 81, 101, 81, 81, 81, 18, 53, 19, 19, 19, 20, 81, 81, 124, 81, 81, 81, 81, 81, 81, 33, 33, 33, 33, 33, 33, 33, 33, 33, 115, 81, 33, 33, 33, 33,
            33, 145, 81, 81, 81, 81, 81, 81, 0, 81, 81, 81, 81, 81, 81, 18, 19, 53, 19, 69, 66, 4, 0, 81, 81, 81, 81, 101, 81, 0, 33, 0, 0, 0, 98, 33, 33, 0, 81, 81, 81, 81, 33, 101, 33,
            33, 33, 33, 81, 81, 81, 81, 81, 81, 124, 81, 81, 81, 81, 81, 34, 51, 37, 19, 19, 69, 66, 3, 3, 84, 3, 84, 3, 84, 3, 3, 3, 84, 4, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 1,
            33, 33, 33, 129, 81, 81, 65, 65, 81, 124, 124, 124, 124, 81, 81, 101, 18, 37, 19, 19, 19, 19, 69, 37, 37, 69, 53, 53, 19, 19, 5, 19, 19, 19, 3, 3, 84, 3, 3, 84, 84, 3, 3, 84, 3,
            33, 81, 81, 81, 116, 33, 65, 65, 65, 65, 116, 0, 81, 81, 81, 124, 18, 19, 53, 37, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
            33, 115, 33, 116, 33, 33, 33, 65, 65, 65, 81, 101, 81, 124, 124, 124, 18, 69, 21, 37, 53, 19, 37, 19, 53, 19, 37, 101, 19, 53, 50, 19, 19, 220, 220, 220, 220, 236, 236, 236, 220, 220, 220, 220, 220,
            81, 81, 33, 101, 33, 33, 116, 65, 65, 65, 81, 81, 81, 81, 124, 124, 34, 35, 35, 35, 85, 35, 35, 85, 35, 35, 85, 85, 85, 85, 36, 33, 33, 33, 33, 33, 33, 21, 236, 33, 33, 101, 33, 33, 35,
            81, 33, 33, 33, 33, 65, 65, 65, 33, 65, 65, 81, 145, 124, 124, 124, 33, 33, 33, 33, 98, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 33, 21, 236, 21, 33, 124, 124, 124, 124,
            33, 33, 33, 33, 65, 65, 33, 33, 33, 65, 33, 33, 33, 124, 124, 124, 33, 115, 33, 33, 33, 33, 124, 124, 124, 124, 124, 124, 124, 124, 124, 65, 65, 33, 116, 124, 33, 21, 236, 21, 33, 124, 124, 115, 124,
            33, 33, 33, 116, 65, 116, 65, 65, 115, 65, 65, 65, 33, 33, 33, 124, 33, 124, 33, 33, 33, 145, 33, 33, 0, 0, 0, 0, 0, 0, 1, 65, 65, 116, 33, 116, 33, 21, 236, 21, 33, 124, 124, 124, 124,
            33, 33, 33, 33, 65, 65, 65, 33, 33, 65, 65, 81, 33, 0, 33, 124, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 0, 0, 65, 65, 101, 65, 65, 65, 65, 33, 21, 236, 21, 33, 33, 81, 81, 81,
            33, 33, 33, 33, 33, 33, 33, 116, 33, 65, 81, 33, 116, 33, 33, 124, 65, 65, 33, 33, 116, 33, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 33, 21, 236, 21, 33, 33, 81, 33, 33,
            33, 116, 116, 33, 116, 116, 0, 33, 65, 65, 81, 116, 33, 33, 65, 65, 65, 33, 33, 33, 33, 116, 116, 65, 65, 65, 65, 65, 65, 33, 98, 33, 33, 33, 33, 33, 58, 186, 236, 183, 55, 33, 81, 81, 33,
            33, 33, 33, 33, 33, 33, 33, 33, 65, 65, 65, 116, 65, 65, 65, 49, 65, 163, 164, 165, 65, 65, 65, 65, 49, 49, 135, 49, 65, 65, 33, 33, 145, 33, 33, 33, 34, 250, 236, 247, 36, 33, 33, 81, 33,
            33, 33, 33, 33, 129, 145, 33, 33, 65, 65, 65, 65, 65, 49, 49, 138, 65, 195, 196, 197, 49, 49, 49, 49, 49, 49, 49, 135, 116, 65, 33, 33, 33, 33, 98, 33, 34, 221, 236, 221, 36, 125, 81, 81, 0,
            33, 101, 33, 33, 33, 98, 33, 33, 33, 65, 65, 49, 65, 65, 49, 65, 114, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 135, 65, 65, 65, 65, 145, 65, 65, 138, 221, 236, 221, 0, 81, 0, 0, 0,
            33, 33, 33, 33, 33, 33, 97, 97, 145, 65, 65, 49, 49, 65, 65, 65, 114, 17, 98, 98, 17, 98, 17, 17, 17, 97, 0, 49, 116, 65, 0, 0, 0, 0, 0, 0, 65, 179, 180, 181, 65, 0, 158, 0, 65,
            33, 33, 33, 33, 33, 33, 49, 33, 97, 218, 65, 65, 65, 65, 65, 33, 33, 17, 17, 17, 17, 98, 17, 17, 17, 17, 17, 49, 65, 65, 0, 0, 0, 0, 0, 0, 99, 179, 180, 181, 81, 0, 174, 65, 65,
            0, 81, 0, 81, 81, 81, 49, 49, 0, 65, 65, 65, 65, 65, 65, 114, 17, 98, 17, 17, 17, 17, 17, 0, 0, 17, 17, 0, 65, 0, 0, 0, 0, 0, 0, 99, 99, 202, 236, 199, 249, 0, 237, 237, 237,
            49, 81, 81, 49, 49, 81, 81, 81, 81, 65, 65, 65, 114, 33, 114, 17, 17, 17, 17, 124, 17, 65, 65, 65, 17, 17, 115, 65, 65, 0, 0, 0, 0, 0, 113, 99, 0, 237, 220, 237, 237, 238, 220, 237, 222,
            49, 49, 81, 81, 81, 49, 49, 114, 177, 236, 255, 66, 4, 17, 1, 17, 17, 101, 17, 17, 17, 65, 115, 65, 65, 65, 65, 65, 17, 17, 17, 17, 17, 17, 17, 252, 236, 236, 236, 236, 236, 236, 236, 236, 236,
            49, 49, 49, 49, 49, 81, 49, 100, 193, 236, 69, 19, 20, 65, 65, 17, 129, 17, 145, 124, 124, 124, 124, 17, 17, 17, 17, 17, 17, 33, 33, 33, 33, 33, 113, 33, 65, 65, 65, 65, 65, 129, 65, 236, 236,
            49, 129, 81, 81, 81, 49, 114, 49, 209, 210, 211, 35, 65, 97, 65, 65, 17, 17, 17, 17, 0, 65, 33, 33, 33, 33, 33, 33, 129, 33, 33, 33, 33, 99, 99, 65, 65, 99, 33, 65, 65, 115, 65, 101, 65,
            49, 49, 81, 49, 49, 49, 49, 49, 193, 210, 227, 65, 65, 65, 17, 65, 97, 33, 17, 17, 17, 65, 33, 33, 33, 33, 33, 33, 33, 145, 33, 33, 33, 33, 65, 65, 33, 33, 33, 99, 65, 65, 65, 145, 65,
            49, 49, 49, 49, 49, 49, 49, 49, 193, 210, 227, 98, 17, 65, 65, 65, 65, 97, 97, 17, 17, 65, 0, 145, 33, 33, 33, 33, 0, 33, 33, 33, 65, 65, 65, 0, 0, 33, 33, 33, 65, 65, 65, 65, 65,
            81, 81, 49, 49, 101, 49, 145, 49, 193, 210, 227, 17, 17, 17, 17, 129, 65, 65, 65, 65, 65, 65, 0, 215, 0, 0, 0, 218, 0, 98, 33, 33, 65, 65, 33, 33, 33, 33, 33, 99, 65, 101, 65, 65, 65,
            81, 81, 81, 49, 49, 49, 49, 49, 193, 210, 227, 17, 98, 17, 17, 17, 17, 17, 97, 65, 65, 2, 0, 0, 33, 33, 33, 0, 0, 4, 33, 65, 0, 33, 33, 33, 33, 33, 33, 65, 0, 0, 65, 65, 65,
            49, 49, 81, 81, 81, 49, 49, 49, 193, 210, 227, 17, 17, 17, 101, 17, 17, 17, 97, 17, 98, 18, 237, 0, 0, 0, 0, 0, 238, 20, 65, 65, 65, 65, 65, 65, 65, 65, 65, 115, 33, 115, 33, 33, 33,
            101, 49, 49, 49, 81, 81, 81, 81, 209, 210, 243, 129, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 237, 0, 0, 0, 0, 0, 238, 20, 98, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65
            ]
            this.groundObjects = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 146, 0, 109, 110, 111, 0, 0, 0, 147, 148, 0, 146, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146,
            0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 244, 245, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 103, 104, 105, 106, 107, 146, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 216, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 234, 0, 231, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 153, 152, 153, 152, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 0, 0, 0, 121, 120, 169, 168, 169, 103, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 127, 128,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 155, 0, 0, 0, 0, 0, 0, 0, 0, 150, 87, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 141, 142, 143, 144,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 87, 151, 152, 153, 152, 153, 152, 152, 153, 154, 0, 0, 0, 156, 157, 0, 159, 160,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233, 232, 233, 232, 233, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 88, 89, 105, 88, 89, 90, 0, 0, 0, 105, 173, 0, 182, 200,
            109, 110, 111, 0, 0, 0, 0, 0, 218, 219, 186, 200, 169, 168, 169, 170, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 102, 103, 104, 105, 104, 104, 89, 104, 105, 106, 0, 0, 0, 249, 250, 0, 0, 0,
            0, 6, 0, 0, 0, 0, 0, 0, 203, 249, 250, 147, 148, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 120, 120, 121, 120, 249, 235, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 203, 236, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 236, 236, 236, 236, 236, 236, 236, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236, 236, 236,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 147, 148, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214, 0, 109, 110, 111, 0, 219, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 231, 232, 233, 233, 234, 235, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 244, 245, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247, 248, 249, 248, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236, 236, 236, 236, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.animated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277, 277, 277, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285, 285, 285, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 293, 293, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 293, 293, 0, 0, 261, 261, 265,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 265, 257, 265,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 261, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268, 261,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 261, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 257, 257, 257, 257, 257, 265, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.animatedOverlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 317, 317, 317, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325, 325, 325, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

            ]
            this.background = [
                0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 28, 29, 30, 31, 32, 130, 0, 93, 94, 95, 96, 0, 0, 131, 132, 0, 130, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,
            0, 0, 0, 0, 130, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 228, 229, 224, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 94, 95, 96, 27, 0, 228, 229, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 109, 110, 111, 0, 43, 0, 0, 0, 8, 9, 9, 8, 27, 0, 7, 8, 8, 9, 8, 8,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 55, 33, 33, 58, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 71, 72, 73, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 87, 88, 89, 90, 91, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0,
            93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 223, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 8, 9, 9, 8, 10, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 256, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 26, 9, 8,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 95, 96, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 7, 244, 245, 10, 0, 228, 229, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 23, 145, 49, 26, 27, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 38, 97, 49, 130, 97, 43, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 54, 55, 0, 146, 58, 59, 0, 0, 0, 0, 0

            ]
            // this.drawAnimatedTile()
            //for top layers            
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        drawBackground(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }

        draw(ctx) {
            this.game.impassable = [];
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.groundObjects, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                    if (tile !== 0) {

                        this.game.impassable.push([col * tileSize, row * tileSize, tileSize, tileSize])
                    }
                }
            }
        }
        // drawAnimatedTile() {
        //     for (let row = 0; row < ROWS; row++) {
        //         for (let col = 0; col < COLUMNS; col++) {
        //             const tile = this.getTile(this.animated, col, row);
        //             const x = col * tileSize;
        //             const y = row * tileSize;
        //             if (tile !== 0) {

        //                 this.game.animated.push(new WaterSparkle(this, x, y))
        //                 console.log(this.game.animated)
        //             }
        //         }
        //     }
        // }
        drawForGround(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.background, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelTOP, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {
        }
    }
    class World4 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "tilemap1simple.png"
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ]
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        draw() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {

        }

    }
    //////////////////
            class StartScreen {
            constructor(game) {
                this.game = game;
               
                // this.lastKey = new InputHandler(this)
            }

            render(ctx ) {
                ctx.clearRect(0, 0, this.game.width, this.game.height);
                ctx.font = "30px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("Press Down to Start", this.game.width / 2, this.game.height / 2);
            }

            handleInput() {
                if (this.game.lastKey === 'PArrowDown') {
                    console.log("enter")
                    

                    this.game.currentState = null;
                    // game = new Game(canvas.width, canvas.height)
                    this.game.setTimer()
                    
                }
            }
        }

        class EndGame {
            constructor(game ) {
                this.game = game;
            }

            render(ctx) {
                ctx.clearRect(0, 0, this.game.width, this.game.height);
                ctx.font = "30px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("Game Over", this.game.width / 2, this.game.height / 2);
                ctx.fillText("Press Enter to Restart", this.game.width / 2, this.game.height / 2 + 40);
            }

            handleInput() {
                if (this.game.lastKey === 'PEnter') {
                    this.game.changeState(new StartScreen(game))
 
                    
                }
            }
        }

    /////////////////
    class Game {

        constructor(width, height) {
            this.tileSize = tileSize * 2
            this.width = width;
            this.height = height;
            //////
            this.currentState = null;
            
            ///////
            this.gameObjects = [];
            this.gameTiles = [];
            // this.animatedTiles = []
            // this.staminaTile = []
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
            this.gameStart = false
            // this.gameOver = false

            this.portalCount = 0
            this.randomInt = 0
            this.countdownInterval = 50000;
            this.time = document.querySelector("#time");
            this.score = document.querySelector("#score");
            this.scoreIncrement = 0
            this.score.textContent = parseInt(0);
            
        }
        //////////
        changeState(newState) {

            // let previous = this.gameStart
            // if(newState === new StartScreen(this) && previous === true){
                // this.gameStart = false
            this.level = 0
            this.tiles = [];
            this.animated = []
            this.animatedOverlay = []
            this.gameObjects = []
            this.impassable = []
            this.carrots = [];
            this.enemies = [];
            this.babyCarrots = [];
            this.tiles.push(new World0(this));
            this.portals = []
            this.rabbit.x = 0
            this.rabbit.y = 0
            this.score.textContent = 0
            this.carrotTimer = 0;
            this.countdownInterval = 20000;
            this.currentState = newState;

            // } return
        
        }
        // checkState(){

        // }
        /////////
        render(ctx, deltaTime) {
             if (this.currentState) {
            
            this.currentState.render(ctx);
            this.currentState.handleInput()
            } else {
                 
            this.tiles.forEach(tile => tile.drawBackground(ctx));
            this.gameObjects = [...this.tiles, ...this.babyCarrots, ...this.animated,...this.animatedOverlay, ...this.carrots, ...this.portals, ...this.enemies, this.rabbit];

            this.checkCollision();
            
            this.spawnCarrot(deltaTime)
            this.spawnEnemy(deltaTime)
            this.carrotGrow();
            this.checkLevel();
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
    let game = new Game(canvas.width, canvas.height);
    //////////
    game.changeState(new StartScreen(game))
    ///////////
    game.init();
    let lastTime = 0;
    //timestamp is handled by requestAnimationFrame API
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime)
        requestAnimationFrame(animate);

    }
    requestAnimationFrame(animate);
});
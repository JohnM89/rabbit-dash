import { Animation } from './Animator.js';
export    class Rabbit extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "assets/characterSprite/newrabbitsheet.png";
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.frameX = 0;
            this.frameY = 0;
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
                this.maxFrame = 7;
                this.frameY = 3;
            } else if (this.game.lastKey == 'RArrowLeft' && this.speedX < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 3;
            } else if (this.game.lastKey == 'PArrowRight') {
                this.setSpeed(this.maxSpeed, 0);
                this.maxFrame = 7;
                this.frameY = 2;
            } else if (this.game.lastKey == 'RArrowRight' && this.speedX > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 2;
            } else if (this.game.lastKey == 'PArrowUp') {
                this.setSpeed(0, -this.maxSpeed);
                this.maxFrame = 6;
                this.frameY = 1;
            } else if (this.game.lastKey == 'RArrowUp' && this.speedY < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 1;
            } else if (this.game.lastKey == 'PArrowDown') {
                this.setSpeed(0, this.maxSpeed);
                this.maxFrame = 7;
                this.frameY = 0;
            } else if (this.game.lastKey == 'RArrowDown' && this.speedY > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 0;
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
                this.frameX < this.maxFrame  ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
export    class Farmer extends Animation {
        constructor(game, x, y) {
            super(game)
            this.x = x
            this.y = y
            this.images = []
            
            this.image1 = new Image();
            this.image2 = new Image();
            this.image3 = new Image();
            this.image1.src = "assets/characterSprite/imnotevensure.png";
            this.image2.src = "assets/characterSprite/farmers12.png";
            this.image3.src = "assets/characterSprite/randomGen.png";
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
                this.steps = Math.floor(Math.random() * 10) + 1
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
    
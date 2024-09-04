import { Animation } from './Animator.js';
import { tileSize, gameHeight, gameWidth } from './Constants.js';
export class EndStageCharacter extends Animation {
    constructor(game) {
        super(game);
        this.game = game;
        this.image = new Image();
        this.image.src = "assets/characterSprite/newrabbitsheet.png"
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.x = gameWidth / 2 + gameWidth / 4
        this.y = (gameHeight - gameHeight / 8) - 1.3
        this.collisionWidth = this.tileSize / 4;
        this.collisionHeight = this.tileSize / 4;
        this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
        this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
        this.frameInterval = 4000 / this.fps;

    }

    update(deltaTime) {
        this.maxFrame = 6;
        this.frameY = 2;
        if (this.frameTimer > this.frameInterval) {
            // if(this.x > canvas.width && this.x < canvas.width / 2){
            //     this.x = -16
            // }
            // this.x++
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }
}

export class LayerEnd extends Animation {
    constructor(game, speedModifier) {
        super(game);
        this.game = game;
        this.image = new Image();
        this.image.src = ""
        this.width = gameWidth
        this.height = gameHeight
        this.spriteWidth = 928 / 2;
        this.spriteHeight = 928 / 2;
        this.speedModifier = speedModifier;
        this.speed = this.speedModifier;
        this.frameX = 0;
        this.frameY = .65;
        this.fps = 60;
        this.x = 0
        this.y = 0

        this.frameInterval = 1200 / this.fps;


    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        //this works! render image again at x + width - 1 ( so its always redrawing at the end of the image and - 1 to hide the seam)
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x + this.width - 1, this.y, this.width, this.height)
    }

    update(deltaTime) {
        this.maxFrame = 0;
        // this.frameY = 0;
        if (this.frameTimer > this.frameInterval) {
            this.x -= this.speed;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }
}
export class OpenStageCharacter extends Animation {
    constructor(game) {
        super(game);
        this.game = game;
        this.image = new Image();
        this.image.src = "assets/characterSprite/newrabbitsheet.png"
        this.spriteWidth = 32;
        this.spriteHeight = 32.5;
        this.frameX = 0;
        this.frameY = 0;
        this.x = gameWidth / 4
        this.y = (gameHeight - gameHeight / 8) - 1.3
        this.collisionWidth = this.tileSize / 4;
        this.collisionHeight = this.tileSize / 4;
        this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
        this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
        this.frameInterval = 4000 / this.fps;

    }

    update(deltaTime) {
        this.maxFrame = 5;
        this.frameY = 2;
        if (this.frameTimer > this.frameInterval) {
            // if(this.x > canvas.width && this.x < canvas.width / 2){
            //     this.x = -16
            // }
            // this.x++
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }
}

export class Layer extends Animation {
    constructor(game, speedModifier) {
        super(game);
        this.game = game;
        this.image = new Image();
        this.image.src = ""
        this.width = gameWidth
        this.height = gameHeight
        this.spriteWidth = 928 / 2;
        this.spriteHeight = 928 / 2;
        this.speedModifier = speedModifier;
        this.speed = this.speedModifier;
        this.frameX = 0;
        this.frameY = .65;
        this.fps = 60;
        this.x = 0
        this.y = 0

        this.frameInterval = 1200 / this.fps;


    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        //this works! render image again at x + width - 1 ( so its always redrawing at the end of the image and - 1 to hide the seam)
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x + this.width - 1, this.y, this.width, this.height)
    }

    update(deltaTime) {
        this.maxFrame = 0;
        // this.frameY = 0;
        if (this.frameTimer > this.frameInterval) {
            this.x -= this.speed;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }
}

export class StartScreen {
    constructor(game) {
        this.game = game;
        this.bunny = new OpenStageCharacter(game)
        this.frontLayer = new Image();
        this.frontLayer.src = "assets/cinematic/layer0.png"
        this.images = []
        this.source = ["assets/cinematic/layer11.png", "assets/cinematic/layer10.png", "assets/cinematic/layer9.png", "assets/cinematic/layer8.png", "assets/cinematic/layer7.png", "assets/cinematic/layer6.png", "assets/cinematic/layer5.png", "assets/cinematic/layer4.png", "assets/cinematic/layer3.png", "assets/cinematic/layer2.png", "assets/cinematic/layer1.png"]
        this.source.forEach((src, index) => {
            //too much
            //invert the speed so the closest layer is slowest
            // let speedModifier = 0.5 + 0.2 * (this.source.length - index - 1)
            let speedModifier = Math.log10(2 + index) * 0.9;
            //better
            // let speedModifier = 0.2 + 0.05 * (this.source.length - index - 1);
            let img = new Layer(game, speedModifier)
            img.image.src = src;
            this.images.push(img)
        })

        this.width = gameWidth
        this.height = gameHeight
        this.spriteWidth = 928;
        this.spriteHeight = 793;
        this.frameX = 0;
        this.frameY = 0;
        this.x = 0;
        this.y = 0;
        this.maxFrame = 0;
        this.fps = 60;
        this.frameInterval = 2000 / this.fps;
        this.frameTimer = 0;
        // this.speedModifier =  1;
        this.speed = 1;
    }

    render(ctx, deltaTime) {
        
        this.images.forEach((img) => {
            img.update(deltaTime);
            img.draw(ctx);
        });
        this.bunny.update(deltaTime)
        this.bunny.draw(ctx)
        ctx.drawImage(this.frontLayer, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.frontLayer, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x + this.width - 1, this.y, this.width, this.height)
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("use Arrow Keys to Play", gameWidth / 2, gameHeight / 3.5);
                ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("&", gameWidth / 2, gameHeight / 2.5);
                ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press Down to Start", gameWidth / 2, gameHeight / 2);

        if (this.frameTimer > this.frameInterval) {
            this.x -= this.speed;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }

    handleInput() {
        if (this.game.lastKey === 'PArrowDown') {
            this.game.currentState = null;
            this.game.setTimer()

        }
    }
}

export class EndGame {
    constructor(game) {
        this.game = game;
        this.highScore = sessionStorage.getItem("score");
    }

    render(ctx) {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
        ctx.fillText("Press Enter to Restart", gameWidth / 2, gameHeight / 2 + 40);
        ctx.fillText(`${this.highScore} Carrot(s) Collected`, this.game.width / 2, this.game.height / 2 + 80);
    }

    handleInput() {
        if (this.game.lastKey === 'PEnter') {
            this.game.changeState(new StartScreen(this.game))


        }
    }
}
export class SecretEnd {
    constructor(game) {
        this.game = game;
        this.bunny = new EndStageCharacter(game)
        this.frontLayer = new Image();
        this.frontLayer.src = "assets/cinematic/layer0.png"
        this.images = []
        this.source = ["assets/cinematic/layer11.png", "assets/cinematic/layer10.png", "assets/cinematic/layer9.png", "assets/cinematic/layer8.png", "assets/cinematic/layer7.png", "assets/cinematic/layer6.png", "assets/cinematic/layer5.png", "assets/cinematic/layer4.png", "assets/cinematic/layer3.png", "assets/cinematic/layer2.png", "assets/cinematic/layer1.png"]
        this.source.forEach((src, index) => {
            //too much
            //invert the speed so the closest layer is slowest
            // let speedModifier = 0.5 + 0.2 * (this.source.length - index - 1)
            let speedModifier = Math.log10(2 + index) * 0.9;
            //better
            // let speedModifier = 0.2 + 0.05 * (this.source.length - index - 1);
            let img = new Layer(game, speedModifier)
            img.image.src = src;
            this.images.push(img)
        })

        this.width = gameWidth
        this.height = gameHeight
        this.spriteWidth = 928;
        this.spriteHeight = 793;
        this.frameX = 0;
        this.frameY = 0;
        this.x = 0;
        this.y = 0;
        this.maxFrame = 0;
        this.fps = 60;
        this.frameInterval = 2000 / this.fps;
        this.frameTimer = 0;
        // this.speedModifier =  1;
        this.speed = 1;
    }

    render(ctx, deltaTime) {
        
        this.images.forEach((img) => {
            img.update(deltaTime);
            img.draw(ctx);
        });
        this.bunny.update(deltaTime)
        this.bunny.draw(ctx)
        ctx.drawImage(this.frontLayer, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.frontLayer, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x + this.width - 1, this.y, this.width, this.height)


        if (this.frameTimer > this.frameInterval) {
            this.x -= this.speed;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }

    handleInput() {
        if (this.game.lastKey === 'PArrowDown') {
            this.game.currentState = null;
            this.game.setTimer()

        }
    }
}

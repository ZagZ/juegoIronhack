
//CANVAS
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

//VARIABLES

var interval
var frames = 0
var images = {
    bg: "./images/50d.jpg",
    tower: "./images/_D.png",
    dragonRojoRight: "./images/dragon-sprite(rojoBase).png",
    dragonRojoLeft: "./images/dragon-sprite(soloBaseLeft).png",
    dragonAzulRight: "./images/dragon-sprite(blueBase).png",
    dragonAzulLeft: "./images/dragon-sprite(blueBaseLeft).png",
    nubes: "./images/nubes.png",
}
var friction = 0.98
var gravity = 0.98
var keys = []
var coins = {
    frontCoin: "./images/CoinFront.png",
    coin2fase: "./images/Coin2fase.png",
    coin3fase: "./images/Coin3fase.png",
    coin4fase: "./images/Coin4fase.png",
}

//CLASES



//INSTANCIAS

//MAIN FUNCTIONS

function start() {
    frames = 0
    interval = setInterval(update, 1000 / 60)

}

function update() {

    frames++

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    tower.draw()
    movementCharacter()
    player1.draw()
    player2.draw()
    coins.draw()
    nubes.draw()

}

function gameOver() { }

//AUX FUNCTIONX

//LISTENERS

//TESTERS

function movementCharacter() {

    if (keys[39]) {
        console.log("derecha")
        if (player1.velX < player1.speed) {
            player1.velX++
        }

        player1.velX *= friction
        player1.x += player1.velX

        if (player1.x >= canvas.width - player1.width) {
            player1.x = canvas.width - player1.width
        }
        player1.image.src = images.dragonRojoRight


    }
    if (keys[37]) {
        console.log("izquierda")
        if (player1.velX > player1.speed) {
            player1.velX--
        }

        player1.velX *= friction;
        player1.x -= player1.velX;

        if (player1.x <= 0) {
            player1.x = 0
        }
        player1.image.src = images.dragonRojoLeft

    }
    if (keys[38]) {
        console.log("arriba")
        player1.y -= 20
        if (player1.y <= 0) {
            player1.y = 0
        }


    }
    if (keys[68]) {
        console.log("derecha2")
        if (player2.velX < player2.speed) {
            player2.velX++
        }

        player2.velX *= friction
        player2.x += player2.velX

        if (player2.x >= canvas.width - player2.width) {
            player2.x = canvas.width - player2.width
        }
        player2.image.src = images.dragonAzulRight

    }
    if (keys[65]) {
        this.console.log("izquierda2")
        if (player2.velX > player2.speed) {
            player2.velX--
        }

        player2.velX *= friction;
        player2.x -= player2.velX;

        if (player2.x <= 0) {
            player2.x = 0
        }
        player2.image.src = images.dragonAzulLeft

    }
    if (keys[87]) {
        console.log("arriba2")
        player2.y -= 20
        if (player2.y <= 0) {
            player2.y = 0

        }

    }
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


function Board() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    this.image.onload = () => this.draw()
    this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

function Tower() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.tower
    this.image.onload = () => this.draw()
    this.draw = function () {
        this.y++
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height)
        if (this.y + this.height > 2 * canvas.height) this.y = 0
    }
}

function Nubes() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height / 2
    this.image = new Image()
    this.image.src = images.nubes
    this.image.onload = () => this.draw()
    this.draw = function () {
        this.x--
        if (this.x < -this.width) this.x = 0
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

function Coins() {
    this.x = 30
    this.y = 250
    this.width = 100
    this.height = 100
    this.image = new Image()
    this.image.src = coins.frontCoin
    this.image.onload = () => this.draw()
    this.draw = function () {

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}



/* function rotateCoin(frames) {
    coins.draw()
    console.log(frames)
    if (frames % 4 === 1) {
        coins.image.src = coins.frontCoin
        coins.draw()
    }
    if (frames % 4 === 2) {
        coins.image.src = coins.coin2fase
        return coins.draw()
    }
    if (frames % 4 === 3) {
        coins.image.src = coins.coin3fase
        return coins.draw()
    }
    if (frames % 4 === 0) {
        coins.image.src = coins.coin4fase
        return coins.draw()
    }
} */


function Player() {

    this.x = 100
    this.y = 100
    this.width = 170
    this.height = 170
    this.speed = 100
    this.velX = 0
    this.velY = 0
    this.jumping = false
    this.jumStrenght = 5
    this.ground = true
    this.image = new Image()
    this.image.src = images.dragonRojoRight
    this.image.onload = () => this.draw()
    this.draw = function () {
        this.boundaries()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    this.boundaries = function () {
        if (this.y + this.height > canvas.height - 10) {
            this.y = canvas.height - this.height
        }
        else if (this.y < 10) {
            this.y = 10
        }
        else this.y += 9.81
    }

}

function Player2() {
    Player.call(this)
    this.x = 500
    this.y = 100
    this.image = new Image()
    this.image.src = images.dragonAzulRight
    this.image.onload = () => this.draw()
    this.draw = function () {
        this.boundaries()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    this.boundaries = function () {
        if (this.y + this.height > canvas.height - 10) {
            this.y = canvas.height - this.height
        }
        else if (this.y < 10) {
            this.y = 10
        }
        else this.y += 9.81
    }


}

var board = new Board()
var tower = new Tower()
var nubes = new Nubes()
var coins = new Coins()
var player1 = new Player()
var player2 = new Player2()


start()


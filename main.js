
//CANVAS
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

//VARIABLES

var interval
var frames = 0
var cuadrosPS = 0
var images = {
    bg: "./images/50d.jpg",
    tower: "./images/_D.png",
    dragonRojoRight: "./images/dragon-sprite(rojoBase).png",
    dragonRojoLeft: "./images/dragon-sprite(soloBaseLeft).png",
    dragonAzulRight: "./images/dragon-sprite(blueBase).png",
    dragonAzulLeft: "./images/dragon-sprite(blueBaseLeft).png",
    nubes: "./images/nubes.png",
    tester: "./images/dragon-sprite-fly.png",
    bulletUp: "./images/bulletUp.png",
    bulletDown: "./images/bulletDown.png",
    flame: "./images/flame.png",
    flame2: "./images/flame2.png",
    flame3: "./images/flame3.png",
    spaceFlame: "./images/space-flame.png",
}
var friction = 0.98
var gravity = 8
var keys = []
var coins = {
    frontCoin: "./images/CoinFront.png",
    coin2fase: "./images/Coin2fase.png",
    coin3fase: "./images/Coin3fase.png",
    coin4fase: "./images/Coin4fase.png",
}
var generatedCoins = []
var generatedBulletsUp = []
var score1 = 0
var score2 = 0
var damage1 = 3
var damage2 = 3

//CLASES



//INSTANCIAS

//MAIN FUNCTIONS

function start() {
    frames = 0
    interval = setInterval(update, 1000 / 75)

}

function update() {

    frames++
    cuadrosPS++

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    tower.draw()
    drawCoins(frames, cuadrosPS)
    drawBullet(frames)
    player1.draw()
    player2.draw()
    nubes.draw()
    lifePlayer1.draw()
    lifePlayer2.draw()
    ctx.font = "bold 100px VT323"
    ctx.fillStyle = 'rgb(18, 35, 196)'
    ctx.fillText("SCORE: " + score1, 100, 150)
    ctx.fillStyle = '#bc3925'
    ctx.fillText("SCORE: " + score2, 800, 150)

    ctx.font = "bolder 50px VT323"
    ctx.fillStyle = '#5c6cff'
    ctx.fillText("life: ", 100, 200)
    ctx.fillStyle = '#db5e39'
    ctx.fillText("life: ", 800, 200)

    movementCharacter()
    gettingCoinPlayer1()
    gettingCoinPlayer2()
    smashedPlayer1()
    smashedPlayer2()

}

function gameOver() {
    clearInterval(interval)
    interval = null

    ctx.font = "bolder 300px VT323"
    ctx.fillStyle = "#a0d100"
    ctx.fillText("GAME OVER", canvas.width / 2 - 550, canvas.height / 2)

    if (damage1 === 0 || score1 < score2) {
        console.log("jugador 2 gana")
    } else if (damage2 === 0 || score1 > score2) {
        console.log("jugador 1 gana")
    }

    ctx.fillStyle = "black"
    ctx.font = "bold 40px VT323"
    ctx.fillText("Tu score: " + Math.floor(frames / 60), canvas.width / 2 + 200, canvas.height / 2 + 300)
    ctx.font = "bold 20px VT323"
    ctx.fillText("Presiona 'Return' para reiniciar", canvas.width / 2 + 250, canvas.height / 2 + 350)
}

//AUX FUNCTIONX

//LISTENERS

//TESTERS

function movementCharacter() {

    if (keys[39]) {

        if (player1.velX < player1.speed) {
            player1.velX++
        }

        player1.velX *= friction
        player1.x += player1.velX

        if (player1.x >= canvas.width - player1.width) {
            player1.x = canvas.width - player1.width
        }
        player1.image.src = images.dragonAzulRight


    }
    if (keys[37]) {

        if (player1.velX > player1.speed) {
            player1.velX--
        }

        player1.velX *= friction;
        player1.x -= player1.velX;

        if (player1.x <= 0) {
            player1.x = 0
        }
        player1.image.src = images.dragonAzulLeft

    }
    if (keys[38]) {

        player1.y -= 20
        if (player1.y <= 0) {
            player1.y = 0
        }



    }
    if (keys[68]) {

        if (player2.velX < player2.speed) {
            player2.velX++
        }

        player2.velX *= friction
        player2.x += player2.velX

        if (player2.x >= canvas.width - player2.width) {
            player2.x = canvas.width - player2.width
        }
        player2.image.src = images.dragonRojoRight

    }
    if (keys[65]) {

        if (player2.velX > player2.speed) {
            player2.velX--
        }

        player2.velX *= friction;
        player2.x -= player2.velX;

        if (player2.x <= 0) {
            player2.x = 0
        }
        player2.image.src = images.dragonRojoLeft

    }
    if (keys[87]) {

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

    this.draw = function () {
        this.x--
        if (this.x < -this.width) this.x = 0
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

//COINS//

function Coins(coinX) {

    this.x = coinX
    this.y = -100
    this.width = 80
    this.height = 80
    this.image = new Image()
    this.image.src = coins.frontCoin
    this.image2 = new Image()
    this.image2.src = coins.coin2fase
    this.image3 = new Image()
    this.image3.src = coins.coin3fase
    this.image4 = new Image()
    this.image4.src = coins.coin4fase
    this.activeImage = 1
    this.drawedImage = this.image

    this.changeImage = function () {
        if (this.activeImage === 1) {
            this.drawedImage = this.image2
            this.activeImage = 2
        } else
            if (this.activeImage === 2) {
                this.drawedImage = this.image
                this.activeImage = 3
            } else
                if (this.activeImage === 3) {
                    this.drawedImage = this.image3
                    this.activeImage = 4
                }
                else
                    if (this.activeImage === 4) {
                        this.drawedImage = this.image4
                        this.activeImage = 1
                    }
    }

    this.draw = function () {
        if (frames % 11 === 0)
            this.changeImage()
        this.y += gravity / 3
        ctx.drawImage(this.drawedImage, this.x, this.y, this.width, this.height)

    }

}

function generateCoins(frames, cuadrosPS) {

    if (frames % 150 === 0) {
        var coinX = Math.floor(Math.random() * canvas.width - 100)
        if (coinX > board.x + 20) {
            generatedCoins.push(new Coins(coinX, cuadrosPS))
            if (generatedCoins.length > 50) generatedCoins.shift()
        }
    }
}

function drawCoins(frames, cuadrosPS) {

    generateCoins(frames, cuadrosPS)
    generatedCoins.forEach(function (coins) {
        coins.draw()
    })
}

//BULLETS//

function Bullets(bulletX) {

    this.x = bulletX
    this.y = canvas.height + 200
    this.width = 90
    this.height = 90
    this.image = new Image()
    this.image.src = images.bulletUp

    this.draw = function () {
        this.y -= gravity / 1.5
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}

function generateBullet(frames) {

    if (frames % 400 === 0) {
        var bulletX = Math.floor(Math.random() * canvas.width - 100)
        if (bulletX > board.x) {
            generatedBulletsUp.push(new Bullets(bulletX))
            if (generatedBulletsUp.length > 20) generatedBulletsUp.shift()
        }
    }
}

function drawBullet(frames) {

    generateBullet(frames)
    generatedBulletsUp.forEach(function (bullet) {
        bullet.draw()
    })
}



//PLAYERS//



function Player() {

    this.x = 100
    this.y = 100
    this.width = 170
    this.height = 170
    this.speed = 100
    this.velX = 0
    this.velY = 0
    this.image = new Image()
    this.image.src = images.dragonAzulRight

    this.draw = function () {
        this.fall()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    this.fall = function () {
        if (this.y + this.height > canvas.height - 10) {
            this.y = canvas.height - this.height
        }
        else if (this.y < 10) {
            this.y = 10
        }
        else this.y += gravity
    }

    this.isGetting = function (item) {
        return (this.x < item.x + item.width - 80) &&
            (this.x + this.width > item.x + 80) &&
            (this.y < item.y + item.height - 80) &&
            (this.y + this.height > item.y + 80);
    }

    this.isSmashed = function (item) {
        return (this.x < item.x + item.width - 80) &&
            (this.x + this.width > item.x + 80) &&
            (this.y < item.y + item.height - 80) &&
            (this.y + this.height > item.y + 80);
    }
}

function Player2() {
    Player.call(this)
    this.x = 500
    this.y = 100
    this.image = new Image()
    this.image.src = images.dragonRojoLeft

    this.draw = function () {
        this.fall()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    this.fall = function () {
        if (this.y + this.height > canvas.height - 10) {
            this.y = canvas.height - this.height
        }
        else if (this.y < 10) {
            this.y = 10
        }
        else this.y += gravity
    }
    this.isGetting = function (item) {
        return (this.x < item.x + item.width - 80) &&
            (this.x + this.width > item.x + 80) &&
            (this.y < item.y + item.height - 80) &&
            (this.y + this.height > item.y + 80);
    }
    this.isSmashed = function (item) {
        return (this.x < item.x + item.width - 80) &&
            (this.x + this.width > item.x + 80) &&
            (this.y < item.y + item.height - 80) &&
            (this.y + this.height > item.y + 80);
    }
}

function gettingCoinPlayer1() {
    for (var coin of generatedCoins) {
        if (player1.isGetting(coin)) {
            generatedCoins.splice(generatedCoins.indexOf(coin), 1)
            score1++
        }
    }
}

function gettingCoinPlayer2() {
    for (var coin of generatedCoins) {
        if (player2.isGetting(coin)) {
            generatedCoins.splice(generatedCoins.indexOf(coin), 1)
            score2++
        }
    }
}

function smashedPlayer1() {
    for (var bullet of generatedBulletsUp) {
        if (player1.isSmashed(bullet)) {
            generatedBulletsUp.splice(generatedBulletsUp.indexOf(bullet), 1)
            damage1--
            if (damage1 === 2) {
                lifePlayer1.width = 80
                lifePlayer1.image.src = images.flame2
            } else if (damage1 === 1) {
                lifePlayer1.width = 40
                lifePlayer1.image.src = images.flame

            } else if (damage1 === 0) {
                lifePlayer1.image.src = images.spaceFlame
                setTimeout(function () { gameOver(); }, 500);
            }
        }
    }
}

function smashedPlayer2() {
    for (var bullet of generatedBulletsUp) {
        if (player2.isSmashed(bullet)) {
            generatedBulletsUp.splice(generatedBulletsUp.indexOf(bullet), 1)
            damage2--
            if (damage2 == 2) {
                lifePlayer2.width = 80
                lifePlayer2.image.src = images.flame2
            } else if (damage2 == 1) {
                lifePlayer2.width = 40
                lifePlayer2.image.src = images.flame

            } else if (damage2 == 0) {
                lifePlayer2.image.src = images.spaceFlame
                setTimeout(function () { gameOver(); }, 500);
            }
        }
    }
}

//LA VIDITA

function lifePlayer() {
    this.x = 230
    this.y = 160
    this.width = 120
    this.height = 50
    this.image = new Image()
    this.image.src = images.flame3

    this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}

function lifePlayer2() {
    this.x = 930
    this.y = 160
    this.width = 120
    this.height = 50
    this.image = new Image()
    this.image.src = images.flame3

    this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}

var board = new Board()
var tower = new Tower()
var nubes = new Nubes()
var lifePlayer1 = new lifePlayer()
var lifePlayer2 = new lifePlayer2()
var player1 = new Player()
var player2 = new Player2()


start()

//TEXTO


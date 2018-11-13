
//CANVAS
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

//VARIABLES

var interval
var frames = 0
var images = {

}
var friction = 0.98
var gravity = 0.98
var keys = []

//CLASES



//INSTANCIAS

//MAIN FUNCTIONS

function start() {
    frames = 0
    interval = setInterval(update, 1000 / 60)

}

function update() {
    movementCharacter()
    frames++
    console.log(frames)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player1.draw()
    player2.draw()
}

function gameOver() { }

//AUX FUNCTIONX

//LISTENERS

//TESTERS

function movementCharacter() {


    if (keys[39]) {
        this.console.log("derecha")
        if (player1.velX < player1.speed) {
            player1.velX++
        }

        player1.x += player1.velX;
        player1.velX *= friction;

        if (player1.x >= canvas.width - player1.width) {
            player1.x = canvas.width - player1.width
        }

    }
    if (keys[37]) {
        this.console.log("izquierda")
        if (player1.velX > player1.speed) {
            player1.velX--
        }
        player1.x += player1.velX;
        player1.velX *= friction;
        if (player1.x <= 0) {
            player1.x = 0
        }
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
    }
    if (keys[65]) {
        this.console.log("izquierda2")
        player2.x -= 20
        if (player2.x <= 0) {
            player2.x = 0
        }
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
    /*     //this.image = new Image()
        //this.image.src = images.bg
        //this.image.onload = ()=>this.draw()
        //this.draw = function () {
            this.x--
            if (this.x < -this.width) this.x = 0
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    
        //this.drawScore = function () {
            ctx.font = "bold 24px Avenir"
            ctx.fillText("Score: " + Math.floor(frames / 60), 50, 50)
        } */
}




function Player() {

    this.x = 100
    this.y = 100
    this.width = 100
    this.height = 100
    this.speed = 100
    this.velX = 0
    this.velY = 0
    this.jumping = false
    this.jumStrenght = 5
    this.ground = true
    this.draw = function () {
        this.boundaries()
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
    this.draw = function () {
        this.boundaries()
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.width, this.height)
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

var player1 = new Player()
var player2 = new Player2()


start()


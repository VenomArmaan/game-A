const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

canvas.style.backgroundImage = "url('images/background.png')";
canvas.style.backgroundSize = "cover";

let gravity = 0.7;
let speed = 5;
let jumpPower = 20;
let newoffset = 0;
let offset = 5;

const imgHill = new Image();
const imgPlat = new Image();
const imgStandR = new Image();
const imgStandL = new Image();
const imgMoveR = new Image();
const imgMoveL = new Image();
const imgMoveU = new Image();
const imgMoveD = new Image();
const imgTallPlat = new Image();

let total = 9;

imgHill.src = "images/hills.png";
imgPlat.src = "images/platform.png";
imgStandR.src = "images/spriteStandRight.png";
imgStandL.src = "images/spriteStandLeft.png";
imgMoveR.src = "images/spriteRunRight.png";
imgMoveL.src = "images/spriteRunLeft.png";
imgMoveU.src = "images/spriteRunRight.png";
imgMoveD.src = "images/spriteRunRight.png";
imgTallPlat.src = "images/platformSmallTall.png";

imgHill.onload = picture;
imgPlat.onload = picture;
imgStandR.onload = picture;
imgStandL.onload = picture;
imgMoveR.onload = picture;
imgMoveL.onload = picture;
imgMoveD.onload = picture;
imgMoveU.onload = picture;

function picture() {
    total--;
    if (total == 0) {
        updateAnimation();
    }
}

class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.width = 60;
        this.height = 60;
        this.velocity = { x: 0, y: 0 };
        this.isJumping = false;
        this.isFalling = false;
    }

    draw() {
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            if (face === 1) {
                context.drawImage(imgStandR, 0, 0, 174, 400, this.x, this.y + 10, this.width - 10, this.height - 10);
            } else {
                context.drawImage(imgStandL, 0, 0, 174, 400, this.x, this.y + 10, this.width - 10, this.height - 10);
            }
        }

        if (this.velocity.x > 0) {
            context.drawImage(imgMoveR, 0, 0, 340, 400, this.x, this.y, this.width, this.height);
        }

        if (this.velocity.x < 0) {
            context.drawImage(imgMoveL, 0, 0, 340, 400, this.x, this.y, this.width, this.height);
        }

        if (this.velocity.y < 0) {
            context.drawImage(imgMoveU, 0, 0, 340, 400, this.x, this.y, this.width, this.height);
        }

        if (this.velocity.y > 0) {
            context.drawImage(imgMoveD, 0, 0, 340, 400, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.velocity.y += gravity;

        let Yabc = this.y + this.velocity.y + this.height;

        for (let i = 0; i < plats.length; i++) {
            let plat = plats[i];
            if (
                this.y + this.height <= plat.position.y &&
                Yabc >= plat.position.y &&
                this.x + this.width > plat.position.x + newoffset &&
                this.x < plat.position.x + plat.width + newoffset
            ) {
                this.velocity.y = 0;
                this.y = plat.position.y - this.height;
                this.isJumping = false;
                break;
            }
        }

        for (let i = 0; i < Tallplats.length; i++) {
            let tallplat = Tallplats[i];
            if (
                this.y + this.height <= tallplat.position.y &&
                Yabc >= tallplat.position.y &&
                this.x + this.width > tallplat.position.x + newoffset &&
                this.x < tallplat.position.x + tallplat.width + newoffset
            ) {
                this.velocity.y = 0;
                this.y = tallplat.position.y - this.height;
                this.isJumping = false;
                break;
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.y + this.height > canvas.height) {
            alert("You lost");
            this.reset();
        }

        for (let plat of plats) {
            if (this.y + this.height > plat.position.y && this.y < plat.position.y + plat.height) {
                if (
                    this.velocity.x > 0 &&
                    this.x + this.width <= plat.position.x + newoffset &&
                    this.x + this.width + this.velocity.x >= plat.position.x + newoffset
                ) {
                    this.velocity.x = 0;
                    this.x = plat.position.x + newoffset - this.width;
                }
                if (
                    this.velocity.x < 0 &&
                    this.x >= plat.position.x + plat.width + newoffset &&
                    this.x + this.velocity.x <= plat.position.x + plat.width + newoffset
                ) {
                    this.velocity.x = 0;
                    this.x = plat.position.x + plat.width + newoffset;
                }
            }
        }

        for (let tallplat of Tallplats) {
            if (this.y + this.height > tallplat.position.y && this.y < tallplat.position.y + tallplat.height) {
                if (
                    this.velocity.x > 0 &&
                    this.x + this.width <= tallplat.position.x + newoffset &&
                    this.x + this.width + this.velocity.x >= tallplat.position.x + newoffset
                ) {
                    this.velocity.x = 0;
                    this.x = tallplat.position.x + newoffset - this.width;
                }
                if (
                    this.velocity.x < 0 &&
                    this.x >= tallplat.position.x + tallplat.width + newoffset &&
                    this.x + this.velocity.x <= tallplat.position.x + tallplat.width + newoffset
                ) {
                    this.velocity.x = 0;
                    this.x = tallplat.position.x + tallplat.width + newoffset;
                }
            }
        }

        this.draw();
    }

    reset() {
        this.x = 100;
        this.y = 100;
        this.velocity.x = 0;
        this.velocity.y = 0;
        newoffset = 0;
    }
}

class Platform {
    constructor(x, y, width, height) {
        this.initialX = x;
        this.position = { x, y };
        this.width = width;
        this.height = height;
    }

    draw() {
        context.drawImage(imgPlat, this.position.x + newoffset, this.position.y, this.width, this.height);
    }
}

class TallPlatform {
    constructor(x, y, width, height) {
        this.initialX = x;
        this.position = { x, y };
        this.width = width;
        this.height = height;
    }

    draw() {
        context.drawImage(imgTallPlat, this.position.x + newoffset, this.position.y, this.width, this.height);
    }
}

const player1 = new Player();
let plats = [
    new Platform(0, canvas.height - 100, 500, 100),
    new Platform(600, canvas.height - 100, 150, 100),
    new Platform(900, canvas.height - 100, 350, 100),
    new Platform(1300, canvas.height - 100, 350, 100),
    new Platform(1800, canvas.height - 100, 350, 100),
    new Platform(2100, canvas.height - 100, 350, 100),
    new Platform(2600, canvas.height - 150, 200, 50),
    new Platform(2900, canvas.height - 200, 200, 50),
    new Platform(3200, canvas.height - 250, 200, 50),
    new Platform(3500, canvas.height - 100, 400, 100),
];

let Tallplats = [
    new TallPlatform(0, canvas.height - 300, imgTallPlat.width, 300),
    new TallPlatform(900, canvas.height - 300, 350, 300),
    new TallPlatform(2400, canvas.height - 350, imgTallPlat.width, 350),
];

let face = 1;

document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
        player1.velocity.x = speed;
        face = 1;
    }

    if (event.key == "ArrowLeft") {
        player1.velocity.x = -speed;
        face = 0;
    }

    if (event.key == "ArrowUp") {
        if (!player1.isJumping) {
            player1.velocity.y = -jumpPower;
            player1.isJumping = true;
        }
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
        player1.velocity.x = 0;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("super_mario_theme.mp3");
    audio.loop = true;
    audio.play();
});

let frameIndex = 0;
let frameTimer = 0;
let frameInterval = 5;

function updateAnimation() {
  requestAnimationFrame(updateAnimation);
  context.clearRect(0, 0, canvas.width, canvas.height);

  const cameraOffsetX = canvas.width / 3; 

  if (player1.x > cameraOffsetX) {
      newoffset = -(player1.x - cameraOffsetX);
  } else {
      newoffset = 0;
  }

  const levelWidth = 4000; 
  if (newoffset < -(levelWidth - canvas.width)) {
      newoffset = -(levelWidth - canvas.width);
  }
  if (newoffset > 0) {
      newoffset = 0;
  }

  context.drawImage(imgHill, newoffset * 0.5, 50, imgHill.width, canvas.height);

  for (let plat of plats) plat.draw();
  for (let tallplat of Tallplats) tallplat.draw();

  player1.update();
}
updateAnimation();
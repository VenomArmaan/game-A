const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

canvas.style.backgroundImage = "url('images/background.png')";
canvas.style.backgroundSize = "cover";

let gravity=0.5;
let speed=5;
let offset=0;
let face =1;
let frameStand=0
//let totaloffset =0;
let life=5;
let fireCharge =7;
let fireChargeLost=0;


//Audio const
const boom =new Audio();
const hurt =new Audio();

//Audio sourcing
boom.src = "boom.mp3";
hurt.src = "hurt.mp3";



//img const
const imgHill = new Image()
const imgPlat = new Image()
const imgTallPlat =new Image()
const imgStandR = new Image();
const imgStandL = new Image();
const imgMoveR = new Image();
const imgMoveL = new Image();
const imgMoveU = new Image();
const imgMoveD = new Image();
const imgFireBall = new Image()
const imgCactus =new Image();
const imgPlayerHurt =new Image();


//img sourcing
total =12

imgHill.src = "images/hills.png";
imgPlat.src = "images/platform.png"
imgTallPlat.src = "images/platformSmallTall.png"
imgStandR.src = "images/spriteStandRight.png";
imgStandL.src = "images/spriteStandLeft.png";
imgMoveR.src = "images/spriteRunRight.png";
imgMoveL.src = "images/spriteRunLeft.png";
imgMoveU.src = "images/spriteRunRight.png";
imgMoveD.src = "images/spriteRunRight.png";
imgFireBall.src = "images/fireball.png";
imgCactus.src ="images/Cactus.png"
imgPlayerHurt.src ="images/spriteStandRightHurt.png"


//img loading 
imgHill.onload = picture;
imgPlat.onload = picture;
imgTallPlat.onload = picture;
imgStandR.onload = picture;
imgStandL.onload = picture;
imgMoveR.onload = picture;
imgMoveL.onload = picture;
imgMoveD.onload = picture;
imgMoveU.onload = picture;
imgFireBall.onload =picture;
imgCactus.onload =picture;
imgPlayerHurt.onload =picture;


function picture(){
   
    total--;
     if(total==0){
        updateAnimation();
     }
    
}


// builing up our player
class Player{
    constructor(x1,y2,width,height){
        this.position={x:x1,y:y2}
        this.velocity={x:0,y:1}
        this.width=width
        this.height=height;
        this.frames=1;
    }
    draw(){
    /*   context.fillStyle="Red"
    context.fillRect(this.position.x,this.position.y,this.width,this.height);*/
     
           
        //player images 

        
    this.frames++;
    if(this.frames>=24)
    this.frames=1;
    
    
        if(face==1){
            
            if((this.velocity.x ==0)&&(this.velocity.y==0)){
                context.drawImage(imgStandR,0*this.frames,0,174,400,this.position.x,this.position.y+10,this.width,this.height-10)
            }
            if(this.velocity.y==0 && this.velocity.x>0){
                context.drawImage(imgMoveR,340*this.frames,0,360,400,this.position.x ,this.position.y,this.width,this.height) 
            }
        }
        else if(face==0){
            if((this.velocity.x ==0)&&(this.velocity.y==0)){
                context.drawImage(imgStandL,0*this.frames,0,174,400,this.position.x,this.position.y+10,this.width,this.height-10)
            }
            if(this.velocity.y==0 && this.velocity.x<0){
                context.drawImage(imgMoveL,340*this.frames,0,360,400,this.position.x ,this.position.y,this.width,this.height) 
            }
            
        }

        if(this.velocity.y!=0) { 
            if(face==0){
            context.drawImage(imgMoveL,0,0,360,400,this.position.x ,this.position.y,this.width,this.height)
            }
            if(face==1){
            context.drawImage(imgMoveR,0,0,360,400,this.position.x ,this.position.y,this.width,this.height)
            }
        }

    
        

        // Gravity and Reload game
        if(this.position.y>=canvas.height){  //reload game
        /*   life-=1; 
            this.position.x =100+ totaloffset
            this.position.y=100+totaloffset
            clearRect(0,200,canvas.width,canvas.height-200)
            */
           life=0
           
        }
        else{
        this.velocity.y+=gravity;// gravity 
        }

         //movement x and y
         this.position.y+=this.velocity.y;
         this.position.x+=this.velocity.x

        //preventing left side canvas outage
        if(this.position.x==0){
            this.position.x=10
            
        }



        //horizontal and vertical collison on plaform 
        for(let i=0;i<plats.length;i++){

        //horizontal collision (on the platform)    
        if ((this.position.x + this.width > plats[i].position.x) && (this.position.x < plats[i].position.x + plats[i].width) && (this.position.y + this.height <= plats[i].position.y + this.velocity.y) && (this.position.y + this.height + this.velocity.y >= plats[i].position.y)) {
            this.velocity.y = 0;
            this.position.y = plats[i].position.y - this.height; 
        }
        
        //vertical collision (side of platform)

        // vertical collision from right
        if (
            this.position.x + this.velocity.x < plats[i].position.x + plats[i].width &&
            this.position.x > plats[i].position.x &&
            this.position.y + this.height > plats[i].position.y &&
            this.position.y < plats[i].position.y + plats[i].height
        ) {
            this.velocity.x = 0;
            this.position.x = plats[i].position.x + plats[i].width; 
        }

        // vertical collision from left
        if (
            this.position.x + this.width + this.velocity.x > plats[i].position.x &&
            this.position.x < plats[i].position.x &&
            this.position.y + this.height > plats[i].position.y &&
            this.position.y < plats[i].position.y + plats[i].height
        ) {
            this.velocity.x = 0;
            this.position.x = plats[i].position.x - this.width; 
        }
        
        
        
           
        }
    //Obstacle Collision 
        for(let i=0;i<Obstacles.length;i++){
            if(this.position.x+this.width>=Obstacles[i].x &&
                this.position.y+this.height>=Obstacles[i].y &&
                this.position.x+this.width<=Obstacles[i].x+Obstacles[i].width

            ){  
                this.position.x-=200
                //context.drawImage(imgPlayerHurt,this.position.x ,this.position.y,this.width,this.height)
                hurt.play();
                offset*=-1;
                life--;
                return
                
            }
        
        }

       
    }

}
const player1 = new Player(100,100,100,100);


//platforms
class Platform{
    constructor(x1,y1,width,height,imgX){
        this.position={x:x1,y:y1};
        this.width=width;
        this.height=height;
        this.img=imgX
    }
    draw(){
        context.fillStyle="Yellow"
        this.position.x+= offset
       // context.fillRect(this.position.x  ,this.position.y,this.width,this.height)
        context.drawImage(this.img,this.position.x  ,this.position.y,this.width,this.height)
    }
    /*
    update(){
        this.position.x+= offset
        this.draw();
    }
        */
}

let plats =[]

const plat1= new Platform(0,canvas.height-150,800,150, imgPlat);
const plat2= new Platform(950,canvas.height-350,150,100, imgTallPlat);
const plat3= new Platform(1300,canvas.height-450,150,100, imgTallPlat);
const plat4= new Platform(1600,canvas.height-150,800,150, imgPlat);
plats.push(plat1,plat2,plat3,plat4);

//Fire Ball
class FireBalls{
    constructor(){
        this.x=player1.position.x +player1.width+10
        this.y=player1.position.y + (player1.height/3)
        this.width=50
        this.height=50
    }
    draw(){
        
        context.drawImage(imgFireBall,this.x,this.y,this.width,this.height)
        this.x+=10
        
        
    } 
}
let AFireBalls =[]

//Obstacle
class Obstacle {
    constructor(x,y) {
        this.x =x
        this.y=y
        this.width=50
        this.height=70
    }
    draw(){
        this.x+= offset
        context.drawImage(imgCactus,this.x,this.y,this.width,this.height)
        
    }
}
    
let Obstacles =[]

const obst1= new Obstacle(500,canvas.height-220);
const obst2= new Obstacle(700,canvas.height-220);
const obst3= new Obstacle(1800,canvas.height-220);
const obst4= new Obstacle(2000,canvas.height-220);

Obstacles.push(obst1,obst2,obst3,obst4);


// lifes
function Life(){
    //   context.fillStyle="White"
    //   context.fillRect(canvas.width-100,0,100,50)
       for (let i = 0; i < life; i++) {
           context.fillText("❤️", canvas.width - (50 *(life - i)), 40,);
       }
   }


// FireBallStamina
function FireStamina(){
   
       for (let i = 0; i < fireCharge; i++) {
           context.fillText("🔥",   10 + i * 30, 40);
       }
   }  





// movement controls
document.addEventListener("keydown", function (event) {

    
    console.log(event);
    if (event.key == "ArrowRight") {
        player1.velocity.x = speed;
        offset= -0.7*(speed);
        face=1;
      //  totaloffset +=offset
        
        
    }

    if (event.key == "ArrowLeft") {
        player1.velocity.x = -speed;
        offset= +0.7*(speed);
        face=0;
      //  totaloffset +=offset
        
    }

    if (event.key == "ArrowUp") {
        for (let i = 0; i < plats.length; i++) {
           
            if (player1.position.y + player1.height == plats[i].position.y &&
                player1.position.x + player1.width > plats[i].position.x &&
                player1.position.x < plats[i].position.x + plats[i].width
                
            ) {
                player1.velocity.y = -18;
                break;
            }
            
        }
    }

   

    if (event.key == "f" &&
        fireCharge>0
    ) {
         fireCharge--;
        AFireBalls.push(new FireBalls());
        fireChargeLost++;
       
    }
        
    
})

document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowRight") {
        player1.velocity.x = 0;
        offset=0
        
        
    }

    if (event.key == "ArrowLeft") {
        player1.velocity.x = 0;
        offset=0
        
    }
})




// animation fn
function updateAnimation() {
    if(life>0){
    requestAnimationFrame(updateAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);
    let hilloffset=  -(player1.position.x-player1.width);
    
    context.drawImage(imgHill,2*player1.width +hilloffset,canvas.height-imgHill.height,imgHill.width/1.5,imgHill.height)
    for(let i=0;i<plats.length;i++){
    plats[i].draw();
    }

    for(let i=0;i<Obstacles.length;i++){
        Obstacles[i].draw();
    }

    
    
    player1.draw();


    
    for(let i=0;i<AFireBalls.length;i++){
        AFireBalls[i].draw();
        for(let j=0;j<Obstacles.length;j++){
            if(Obstacles[j].x<=AFireBalls[i].x    &&
                Obstacles[j].x+Obstacles[j].width>=AFireBalls[i].x  &&
               Obstacles[j].y<=AFireBalls[i].y){
                Obstacles.splice(j, 1);
                AFireBalls.splice(i, 1);
                boom.play();
            }
        }
    }
    
    Life();
    FireStamina();
}

    else if(life==0){
        context.clearRect(0,0,canvas.width,canvas.height)
        context.fillStyle="red"
        context.font = "80px Arial";
        context.textAlign = "center"; 
        context.textBaseline = "middle";
        
        context.fillText("You Lost!!!!",canvas.width/2,2* canvas.height/3,canvas.width,canvas.height)
        context.fillText("(Press R to restart)",canvas.width/2, canvas.height/3,canvas.width,canvas.height)


        addEventListener("keydown",function(event){
            if(event.key=="r"){
                
                window.location.reload();
            }
        })
    }
}



































/*
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
*/

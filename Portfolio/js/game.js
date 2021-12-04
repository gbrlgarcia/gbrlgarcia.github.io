var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

canvas.width = 845;
canvas.height = 609;

var keyArray = [];
var cellArray = [];

var tilesImage = new Image();
tilesImage.src = "https://raw.githubusercontent.com/gbrlgarcia/gbrlgarcia.github.io/main/Game/Tileset.png";

var characterImage = new Image();
characterImage.src = "https://raw.githubusercontent.com/gbrlgarcia/gbrlgarcia.github.io/main/Game/Character.png";

var mapLevel1 = [
  [1,1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1,1,1]
];

var tilesMap = [
  {
    x: 0,
    y: 2,
    name: 'grass'
  },
  {
    x: 1,
    y: 2,
    name: 'water'
  },
  {
    x: 2,
    y: 2,
    name: 'dirt'
  },
  {
    x: 3,
    y: 2,
    name: 'stone'
  }
  
];

var characterAnimations = [
  {
    start: 8,
    frames: 9,
    name: 'walkup'
  },
  {
    start: 9,
    frames: 9,
    name: 'walkleft'
  },
  {
    start: 10,
    frames: 9,
    name: 'walkdown'
  },
  {
    start: 11,
    frames: 9,
    name: 'walkright'
  }
  
];


window.addEventListener('keydown', (event) =>{
  if(event.key=='w'){
    keyArray[0]=true;
  }
  if(event.key=='a'){
    keyArray[1]=true;
  }
  if(event.key=='s'){
    keyArray[2]=true;
  }
  if(event.key=='d'){
    keyArray[3]=true;
  }
});

window.addEventListener('keyup', (event) =>{
  if(event.key=='w'){
    keyArray[0]=false;
  }
  if(event.key=='a'){
    keyArray[1]=false;
  }
  if(event.key=='s'){
    keyArray[2]=false;
  }
  if(event.key=='d'){
    keyArray[3]=false;
  }
});

function pause(milliseconds) { 
  var dt = new Date(); 
  while ((new Date()) - dt <= milliseconds) 
  { /* Do nothing */ } 
};

class Player{
  constructor(){
    this.x = 320;
    this.y = 224;
    this.level = 1;
    this.speed = 1 + this.level;
    this.moving = false;
    this.animationIndex = 0;
    this.frameIndex = 0;
    this.frameRate = 5;
  }
  moveUp(){
    this.y -= this.speed;
  }
  moveDown(){
    this.y += this.speed;
  }
  moveLeft(){
    this.x -= this.speed;
  }
  moveRight(){
    this.x += this.speed;
  }
  draw(){
    //ctx.fillStyle = 'black';
    //ctx.fillRect(this.x,this.y,32,32);
   if (this.moving==true) {this.frameIndex++;}
   else {this.frameIndex=0;}
   if (this.frameIndex>8) this.frameIndex=0;
    ctx.drawImage(characterImage,this.frameIndex*32,characterAnimations[this.animationIndex].start*32,32,32,this.x, this.y, 32, 32);
  }
}

const player = new Player();

function handlePlayer(){
  
    if (keyArray[0] || keyArray[1] || keyArray[2] || keyArray[3]) {
      player.moving = true;
    }
  else {
    player.moving = false;
  }
  
    if (keyArray[0]==true){
      player.moveUp();
      player.animationIndex=0;
    }
  
    if (keyArray[1]==true){
      player.moveLeft();
      player.animationIndex=1;
    }
  
    if (keyArray[2]==true) {
      player.moveDown();
      player.animationIndex=2;
    }
    
    if (keyArray[3]==true) {
      player.moveRight();
      player.animationIndex=3;
    }
  
  player.draw();
}

class Cell {
  constructor(x,y,tileIndex){
    this.x = x;
    this.y = y;
    this.tileIndex = tileIndex;
  }
  draw(){
    //ctx.fillStyle = 'hsl('+this.hue+',50%,50%';
    //ctx.fillRect(this.x, this.y, 32, 32);
        ctx.drawImage(tilesImage,tilesMap[this.tileIndex].x*32,tilesMap[this.tileIndex].y*32,32,32,this.x, this.y, 32, 32);
  }
  
}
//console.log(tilesMap[0].name);

function iniGrid(){
  for(let i=0; i<21;i++){
    for(let j=0; j<15;j++){
      cellArray.push(new Cell(i*32,j*32,mapLevel1[j][i]));
    }
  }
}

function drawGrid(){
  cellArray.forEach((element) => { 
    element.draw(); 
  })
}


iniGrid();

function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawGrid();
  handlePlayer();
  requestAnimationFrame(animate);
}


animate();

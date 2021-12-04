var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var particlesArray = [];
var hue = 0;

canvas.width = 845;
canvas.height = 609;

var background = new Image();
background.src = "white-laptop.png";

const mouse = {
  x: undefined,
  y: undefined
}

function  getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}


function sparks(event){
	
	let pos = getMousePos(canvas, event);
	
	if (pos.x >110 && pos.x<735 && pos.y>30 && pos.y<380){
		mouse.x = pos.x;
		mouse.y = pos.y;

		for(let i=0; i<10; i++){
			particlesArray.push(new Particle());
		}
	}
}

canvas.addEventListener('click', (event) =>{
  sparks(event);
});

canvas.addEventListener('mousemove', (event) =>{
	sparks(event);
});

class Particle{
  constructor(){
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.hue = hue;
  }
  update(){
		if (this.x >110 && this.x<735){
			this.x += this.speedX;
		}
		if (this.y >30 && this.y<380){
			this.y += this.speedY;
		}
    if (this.size >0.1) this.size -= 0.1;
  }
  draw(){
    ctx.fillStyle = 'hsl('+this.hue+',100%,50%)';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
    ctx.fill();
  }
  
}

function handleParticles(){
  for(let i=0; i<particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3){
      particlesArray.splice(i,1);
      i--;
    }
  }
}


function animate(){
  ctx.fillStyle = "#212529";
  ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
  handleParticles();
  hue++;
  requestAnimationFrame(animate);
}

animate();
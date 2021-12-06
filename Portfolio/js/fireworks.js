class Particle{
  constructor(hue){
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

class Fireworks{
	constructor(){
		this.particlesArray = [];
		this.hue = 0;
	}
	handleParticles(){
		for(let i=0; i<this.particlesArray.length; i++){
			this.particlesArray[i].update();
			this.particlesArray[i].draw();
			if (this.particlesArray[i].size <= 0.3){
				this.particlesArray.splice(i,1);
				i--;
			}
		}
	}
	createParticles(){
		if (mouse.x >110 && mouse.x<735 && mouse.y>30 && mouse.y<380){
			for(let i=0; i<10; i++){
				this.particlesArray.push(new Particle(this.hue));
			}
		}
	}
	increaseHue(){
		this.hue++;
	}
}

class Block{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.life = 1;
	}
	decreaseLife(){
		this.life--;
	}
	getLife(){
		return this.life;
	}
	draw(style){
		ctx.fillStyle = style;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}

class Ball {
	constructor(x,y,width,height,sx,sy){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speedX = sx;
		this.speedY = sy;
	}
	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}
	kickX(){
		this.speedX *= -1;
	}
	kickY(){
		this.speedY *= -1;
	}
	draw(style){
		ctx.fillStyle = style;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}

class BallGame{
	constructor(num){
		this.size;
		this.blocks = [];
		this.ball = new Ball(200,250,16,16,1,1);
		
		for (let i=0; i<num;i++){
			this.blocks[i] = new Block(17*i,17*i,16,16);
		}
	}
	draw(style){
		for (let i=0; i<this.blocks.length;i++){
			this.blocks[i].draw(style);
		}
		this.ball.draw(style);
	}
	
	
}
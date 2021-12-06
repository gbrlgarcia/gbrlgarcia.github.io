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

class Paddle extends Block{
	setX(x){
		if (mouse.x >109+this.width/2 && mouse.x<725-this.width/2 && mouse.y>30 && mouse.y<380){
			this.x = x;
		}
	}
}

class Ball extends Paddle{
	constructor(x,y,width,height,sx,sy){
		super (x,y,width,height);
		this.speedX = sx;
		this.speedY = sy;
	}
	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}
	moveTo(x,y){
		this.x = x;
		this.y = y;
	}
	kickX(){
		this.speedX *= -1;
	}
	kickY(){
		this.speedY *= -1;
	}

}

class BallGame{ 
	constructor(rows,cols){
		this.start = false;
		this.over = false;
		this.win = false;
		this.deletedBalls = 0;
		this.blocks = [];
		this.ball = new Ball(410,320,16,16,2,-2);
		this.paddle = new Paddle(367,340,100,8);
		
		for (let i=0; i<rows;i++){
			for (let j=0; j<cols;j++){
				this.blocks.push(new Block(215 + 20*j,90 + 20*i,16,16));
			}
		}
	}
	movePaddle(x){
		this.paddle.setX(x-45);
	}
	moveBall(x){
		this.ball.setX(x);
	}
	draw(style){
		for (let i=0; i<this.blocks.length;i++){
			this.blocks[i].draw(style);
		}
		this.ball.draw(style);
		this.paddle.draw(style);
	}
	detectCollision(obj){
		if(this.ball.x > obj.x + obj.width ||
		this.ball.x + this.ball.width < obj.x ||
		this.ball.y > obj.y + obj.height ||
		this.ball.y + this.ball.height < obj.y)
		{
			return false;
		} 
		else{
			return true;
		}
	}
	handleCollisionObject(obj){

		if ((this.ball.speedX<0 && ((this.ball.x+this.ball.speedX) <= (obj.x+obj.width))) || (this.ball.speedX>0 && (this.ball.x+this.ball.width+this.ball.speedX) >= obj.x)){
			this.ball.kickY();
		}
		else
		if((this.ball.speedY<0 && ((this.ball.y+this.ball.speedY) <= (obj.y+obj.height))) || (this.ball.speedY>0 && this.ball.y+this.ball.height+this.ball.speedY >= obj.y)){
			this.ball.kickX();
		}
	}
	doTheTrick(){
		for (let i=0; i<this.blocks.length;i++){
			if(this.detectCollision(this.blocks[i])){
				this.handleCollisionObject(this.blocks[i]);
				this.blocks.splice(i, 1);
				this.deletedBalls++;
				if (this.blocks.length == 0){
					this.win = true;
				}
				break;
			}
		}
		if(this.detectCollision(this.paddle)){
			this.handleCollisionObject(this.paddle);
		}
		
	}
	handleCollisionBorder(obj){

		if ((this.ball.speedX<0 && this.ball.x <110)||(this.ball.speedX>0 && this.ball.x>719)){
			this.ball.kickX();
		}
		
		if((this.ball.speedY<0 && this.ball.y<30)){
			this.ball.kickY();
		}
		
		if (this.ball.speedY>0 && this.ball.y>364){
			this.over = true;
			this.start = false;
			this.ball = new Ball(410,320,16,16,2,-2);
		}
	}
	adjustSpeed(){
		if(this.deletedBalls> 20){
			this.deletedBalls=0;
			this.ball.speedX *= 1.2;
			this.ball.speedY *= 1.2;
		}
	}
}

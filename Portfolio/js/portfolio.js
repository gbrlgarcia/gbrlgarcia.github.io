let selector = "mission";
let messageUser = true;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 845;
canvas.height = 609;

const background = new Image();
background.src = "img/white-laptop.png";

const mouse = {
  x: undefined,
  y: undefined
}

function  getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,    
      scaleY = canvas.height / rect.height; 
			mouse.x = (evt.clientX - rect.left) * scaleX;
			mouse.y = (evt.clientY - rect.top) * scaleY; 
}

let fire = new Fireworks();

let mission = "My mission is to provide the best solution for your needs...";
let font = "30px sans-serif";
let style = "white";
let cursor = new Cursor(15,5);
let box = new TextBox (160, 50, 50, cursor, mission, font);

let game = new BallGame(5,20);

let frameIndex = 0, cursorFrameRate = 36, characterFrameRate = 2;

function animate(){
  ctx.fillStyle = "#212529";
  ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
	switch (selector){
		case "mission":
			frameIndex ++;
			if (frameIndex % cursorFrameRate == 0){
				box.cursor.toggle();
			}
			if (frameIndex % characterFrameRate == 0){
				box.increaseChars()
			}
			box.draw(font,style,box.charsToPrint);
			break;
		
		case "fireworks":
			if (messageUser){
				ctx.font = font;
				ctx.fillStyle = style;
				ctx.fillText("Move mouse pointer over here",210, 200);
			}
			fire.handleParticles();
			fire.increaseHue();
			break;
		case "game":
			if (game.start == true){
				game.ball.move();
				if (frameIndex % 2){
					game.handleCollisionBorder();
					game.doTheTrick();
				}
			}
			game.draw(style);
			if (game.over){
				ctx.font = "bold "+font;
				ctx.fillStyle = "red";
				ctx.fillText("GAME OVER",310, 280);
			}
			break;
	}
	
  requestAnimationFrame(animate);
}

animate();

function changeAnimation(element){
	if (element.id == "mission"){
		box.charsToPrint = 0;
	}
	if (selector=="game"){
		game.start = false;
	}
	selector = element.id;
}

canvas.addEventListener('click', (event) =>{
	getMousePos(canvas, event);
	messageUser = false;
	if (selector=="fireworks"){
		fire.createParticles();
	}
	if (selector=="game" && game.start == false){
		game.start = true;
		game.over = false;
	}
});

canvas.addEventListener('mousemove', (event) =>{
	getMousePos(canvas, event);
	messageUser = false;
	if (selector=="fireworks"){
		fire.createParticles();
	}
	if (selector=="game"){
		game.movePaddle(mouse.x);
		if (!game.start){
			game.moveBall(mouse.x);
		}
	}
});

canvas.addEventListener('mouseleave', (event) =>{
	messageUser = true;
});
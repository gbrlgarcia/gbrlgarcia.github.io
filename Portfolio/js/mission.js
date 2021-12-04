var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
//#3cc4b4 

canvas.width = 845;
canvas.height = 609;

var background = new Image();
background.src = "white-laptop.png";

var mission = "#";

var font = "18px Helvetica, sans-serif";
var fill = "white";
var marginY = 75;
var marginX = 100;
var lineHeight = 50;
var indentation = 50;
var characterFrameRate = 1;
var cursorFrameRate = 36;

class Line {
  constructor(lineIndex){
    this.height = (lineIndex+1)*lineHeight;
    this.words =  [];
    this.count = 0;
    this.text = "";
  }
  updateText(){
    let text = "";
    this.words.forEach(element => text+=element+" ");
    this.text = text;
  }
  newWord(word){
    this.words[this.count] = word;
    this.count++;
    this.updateText();
  }
  removeLastWord(){
    this.words.pop();
    this.updateText();
  }
  draw(){
    
    ctx.fillText(this.text,indentation,this.height);
  }
  draw(length){
    
    ctx.fillText(this.text.substr(0,length),indentation,this.height);
  }
  getSubstr(length){
    return this.text.substr(0,length);
  }
}

class Cursor{
  constructor(width, height){
    this.height = height;
    this.width = width;
    this.appear = 1;
  }
  draw(text,height){
    if (this.appear){
      
      ctx.fillRect(indentation+ctx.measureText(text).width,height-this.height,this.width,this.height);
    }  
  }
  toggle(){
    if (this.appear) this.appear = 0;
    else this.appear = 1;
  }
}

class TextBox {
  constructor(context){
    this.lines = [];
    this.cursor = new Cursor(10,2);
    this.update(context);
  }
  deleteLines(){
    this.lines.splice(0,this.lines.length);
    
  }
  update(context){
    this.deleteLines();
    let words = mission.split(" ");
    let currentLine = 0;
    this.lines[currentLine] = new Line(currentLine);
    words.forEach(element => {
        this.lines[currentLine].newWord(element);
        context.font = font;
        if ((canvas.width-ctx.measureText(this.lines[currentLine].text).width)<1.3*indentation){
          this.lines[currentLine].removeLastWord();
          currentLine++;
          canvas.height += lineHeight;
          this.lines[currentLine] = new Line(currentLine);
          this.lines[currentLine].newWord(element);
        }
    });
  }
  draw(length){
    let i = 0;
    for(; length>this.lines[i].text.length;i++){
      length -= this.lines[i].text.length;
      this.lines[i].draw();
    }
    this.lines[i].draw(length);
    this.cursor.draw(this.lines[i].getSubstr(length+1), this.lines[i].height);
  }
}

var textBox = new TextBox();

//console.log(textBox.lines);
var frameIndex = 0, numberOfChars = 0;

function animate(timestamp){
  frameIndex ++;
  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.font = font;
  
  if (frameIndex % cursorFrameRate == 0){
    textBox.cursor.toggle();
    
  }
 
  if (frameIndex % characterFrameRate == 0){
    if (numberOfChars<=mission.length){
        numberOfChars++;
      }
  }
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  textBox.draw(numberOfChars);
  requestAnimationFrame(animate);
}

animate();

class Line {
  constructor(lineIndex){
    this.index = lineIndex;
    this.text = "";
		this.length = 0;
  }
  updateText(text){
    this.text = text;
		this.length = text.length;
  }
  draw(font, style, x, y){
    ctx.font = font;
		ctx.fillStyle = style;
    ctx.fillText(this.text,x,y);
  }
  draw(font,style,x,y,length){
    ctx.font = font;
		ctx.fillStyle = style;
    ctx.fillText(this.text.substr(0,length),x,y);
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
  draw(font,style,x,y){
    if (this.appear){
			ctx.font = font;
			ctx.style = style;
      ctx.fillRect(x,y,this.width,this.height);
    }  
  }
  toggle(){
    if (this.appear) this.appear = 0;
    else this.appear = 1;
  }
}
//indentation+ctx.measureText(text).width
//height-this.height
class TextBox {
  constructor(x, y, height, cursor, mission, font){
		this.lineHeight = height;
		this.marginX = x;
		this.marginY = y;
    this.lines = [];
    this.cursor = cursor;
		this.charsToPrint = 0;
		this.missionLength = mission.length;
		
    
		let wordsArray = mission.split(" ");
		let lineText = "";
		let currentLine = 0;
		this.lines[currentLine] = new Line(currentLine);
    wordsArray.forEach(word => {
        let lastText = lineText;
				lineText += word + " ";
				this.lines[currentLine].updateText(lineText);
				ctx.font = font;
        if ((canvas.width-ctx.measureText(lineText).width)-2*this.marginX<0){
					lastText.slice(0,-1);
					this.lines[currentLine].updateText(lastText);
          currentLine++;
					this.lines[currentLine] = new Line(currentLine);
					lineText = word+" ";
        }
    });
  }
  draw(font, style, length){
    let i = 0;
    for(; length>this.lines[i].length;i++){
      length -= this.lines[i].length;
      this.lines[i].draw(font, style, this.marginX, this.lineHeight*(i+1)+this.marginY);
    }
    this.lines[i].draw(font, style, this.marginX, this.lineHeight*(i+1)+this.marginY, length);
		ctx.font = font;
		let textToPrint = this.lines[i].getSubstr(length+1);
		let textWidth = ctx.measureText(textToPrint).width;
    this.cursor.draw(font,style,textWidth+this.marginX, this.lineHeight*(i+1)+this.marginY);
  }
	increaseChars(){
		if (this.charsToPrint<this.missionLength){
			this.charsToPrint++;
		}
	}
}

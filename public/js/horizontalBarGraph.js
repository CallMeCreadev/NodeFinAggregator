import { Utils } from "./utils.js";
class HorizontalBarGraph {
    constructor(data) {
      this.container = document.querySelector(".dynamic-box-screen");
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.data = data;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.maxY = this.calculateMaxY();
      


      this.calculateBarWidth();
      this.calculateBarLayout();
      this.container.appendChild(this.canvas); 
      this.render(this.ctx);
      window.addEventListener('resize', this.onResize.bind(this));
    }



    onResize() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.calculateBarWidth();
      this.calculateBarLayout();
      this.render(this.ctx);
    }
    
    calculateMaxY() {
      let maxY = 0;
      for (let key in this.data) {
        let value = Object.values(this.data[key]);
        let sum = value.reduce((acc, curr) => Math.abs(acc) + Math.abs(curr));
        if (sum > maxY) {
          maxY = sum;
        }
      }
      return maxY*1.15; 
    }
      
      calculateBarWidth() {
        

        const n = Object.keys(this.data).length;
        this.barWidth = this.width / (1.34 * n);
      }
      
      calculateBarLayout() {

        this.barHeight = this.height / this.maxY;
        this.barSpacing = this.barWidth / 3;
        this.barYPosition = this.height;
        this.barXPosition = 0;
      }
   
    
    
      renderBars(ctx) {
        let x = this.barSpacing;
        for (let key in this.data) {
          let value = this.data[key];
          let y = this.barYPosition;
          let firstVal = 0;
          let secondVal = 0;
          for (let i = 0; i < value.length; i++) {
            if (i == 0) {
              ctx.fillStyle = "green";
            }
            if (i == 1) {
              if (value[i] > 0) {
                ctx.fillStyle = "#ff6666";
              } else {
                
                ctx.fillStyle = "lightgreen";
              }
            }
            let height = Math.abs(value[i]) * this.barHeight;
            y -= height;
            ctx.fillRect(x, y, this.barWidth, height);
                 
            //add border to bars
            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeRect(x, y, this.barWidth, height); 
                      
            if(i<1) {
              firstVal = value[i]
            }
            else {
              secondVal = value[i]
            }
                        
          }
            //add percentages on top of bars
            const text = Utils.parsePercentage(Utils.makeRatio(firstVal, secondVal));
            ctx.font = "16px Arial"; 
            if(text >= 0){
              ctx.fillStyle = "lightgreen"; 
            }
            else if(text < 0){
              ctx.fillStyle = "#ff6666";
            }
            const textWidth = ctx.measureText(text).width; 
            const textX = x + (this.barWidth - textWidth) / 2;
            const textY = y - 5; 
            ctx.fillText((String(Math.abs(text))+'%'), textX, textY); 
          x += this.barWidth + this.barSpacing;
        }
      }
       
    
    render(ctx) {
      this.renderBars(ctx);
    }
  }

  export {HorizontalBarGraph};
  
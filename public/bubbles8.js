const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
let bubbleArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(context);
let locX = undefined;
let locY = undefined;
let hue = 0;

canvas.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  const canvasRect = canvas.getBoundingClientRect();
  locX = event.clientX - canvasRect.left;
  locY = event.clientY - canvasRect.top;
  for (let i = 0; i < 5; i++) {
    if (bubbleArray.length < 300) bubbleArray.push(new Particles());
  }
}
class Particles {
  constructor() {
    this.x = locX;
    this.y = locY;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 16 + 1;
    this.speedX = Math.random() * 2;
    this.speedY = Math.random() * 2;
    this.speedXConst = Math.random() * 2 - 1;
    this.speedYConst = Math.random() * 2 - 1;
    this.fill = Math.random() > 0.5 ? true : false;
    // this.color = Math.floor(Math.random() * 3 + 1);
    this.color = `hsl(${hue}, 79%, 50%)`;
  }
  update() {
    this.x += this.speedXConst;
    this.y += this.speedYConst;
    if (this.size > 0.2) this.size -= 0.1;

    if (this.x > canvas.width + this.size || this.x < -this.size)
      this.x = Math.random() * canvas.width;
    if (this.y > canvas.height + this.size || this.y < -this.size)
      this.y = Math.random() * canvas.height;
  }

  draw() {
    // if (this.color == 1 && this.fill) {
    //   context.strokeStyle = "black";
    // } else if (this.color == 1 && !this.fill) {
    //   context.fillStyle = "black";
    // }
    // if (this.color == 2 && this.fill) {
    //   context.strokeStyle = "red";
    // } else if (this.color == 2 && !this.fill) {
    //   context.fillStyle = "red";
    // }
    // if (this.color == 3 && this.fill) {
    //   context.strokeStyle = "white";
    // } else if (this.color == 3 && !this.fill) {
    //   context.fillStyle = "white";
    // }
    if (this.fill) {
      context.strokeStyle = this.color;
      context.beginPath();
      context.lineWidth = 1;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      context.stroke();
    } else {
      context.fillStyle = this.color;
      context.beginPath();
      context.lineWidth = 1;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      context.fill();
    }
  }
}

function generateBubbles() {
  for (let i = 0; i < 100; i++) {
    bubbleArray.push(new Particles());
  }
}
generateBubbles();

function handleBubbles() {
  for (let i = 0; i < bubbleArray.length; i++) {
    bubbleArray[i].update();
    bubbleArray[i].draw();
    for(let j=i; j< bubbleArray.length; j++) {
      let dx = bubbleArray[i].x - bubbleArray[j].x;
      let dy = bubbleArray[i].y - bubbleArray[j].y;
      let distance = Math.sqrt(dx*dx+dy*dy);
      if(distance < 60)
      {
        context.fillStyle = "white";
        context.beginPath();
        context.lineWidth = bubbleArray[i].size/10;
        context.moveTo(bubbleArray[i].x, bubbleArray[i].y);
        context.lineTo(bubbleArray[j].x, bubbleArray[j].y);
        context.stroke();
      }
    }
    if (bubbleArray[i].size <= 0.3) {
      bubbleArray.splice(i, 1);
      i--;
    }
  }
}

function bubbleAnimate() {
  context.reset();
  hue+=5;
  handleBubbles();
  requestAnimationFrame(bubbleAnimate);
}
bubbleAnimate();

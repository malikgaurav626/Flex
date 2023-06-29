const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
let bubbleArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let locX = undefined;
let locY = undefined;

canvas.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);
function handleResize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}
function handleMouseMove(event) {
  const canvasRect = canvas.getBoundingClientRect();
  locX = event.clientX - canvasRect.left;
  locY = event.clientY - canvasRect.top;
  for (let i = 0; i < 10; i++) {
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
    this.color = Math.floor(Math.random() * 3 + 1);
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
    if (this.color == 1 && this.fill) {
      context.strokeStyle = "black";
    } else if (this.color == 1 && !this.fill) {
      context.fillStyle = "black";
    }
    if (this.color == 2 && this.fill) {
      context.strokeStyle = "red";
    } else if (this.color == 2 && !this.fill) {
      context.fillStyle = "red";
    }
    if (this.color == 3 && this.fill) {
      context.strokeStyle = "#e5e4e587";
    } else if (this.color == 3 && !this.fill) {
      context.fillStyle = "#e5e4e5";
    }
    if (this.fill) {
      context.beginPath();
      context.lineWidth = 1;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      context.stroke();
    } else {
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
    if (bubbleArray[i].size <= 0.3) {
      bubbleArray.splice(i, 1);
      i--;
    }
  }
}

function bubbleAnimate() {
  context.reset();
  handleBubbles();
  requestAnimationFrame(bubbleAnimate);
}
bubbleAnimate();

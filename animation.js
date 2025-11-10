// SRJ Tools — Header Wave Animation
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, t = 0;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = 260;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
  ctx.clearRect(0, 0, width, height);
  drawWave("#0077ff", 0.015, 15, 0);
  drawWave("#00aaff", 0.02, 20, 100);
  drawWave("#0055ff", 0.018, 10, 200);
  t += 0.015;
  requestAnimationFrame(draw);
}

function drawWave(color, waveLength, amplitude, offset) {
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    const y = Math.sin(x * waveLength + t + offset) * amplitude + height / 2;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
draw();
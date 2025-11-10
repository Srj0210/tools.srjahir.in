/* ============================================================
   SRJ Tools — Original Wave Animation (Header Only)
   ============================================================ */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, t = 0;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = 220;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
  ctx.clearRect(0, 0, width, height);

  drawWave("#0077ff", 0.015, 20, 0);
  drawWave("#00aaff", 0.02, 25, 100);
  drawWave("#0055ff", 0.018, 15, 200);

  t += 0.015;
  requestAnimationFrame(draw);
}

function drawWave(color, waveLength, amplitude, offset) {
  ctx.beginPath();
  ctx.moveTo(0, height / 2);

  for (let x = 0; x < width; x++) {
    const y = Math.sin(x * waveLength + t + offset) * amplitude + height / 2;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
}

draw();
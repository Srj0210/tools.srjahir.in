/* ============================================================
   SRJ Tools — Original Premium Wave Animation (Header Only)
   ============================================================ */

const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, t = 0;

// 🟦 Resize canvas dynamically with window
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = 220; // wave height limited to header
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 🌀 Draw loop
function draw() {
  ctx.clearRect(0, 0, width, height);

  // Multiple layered waves with different speeds + colors
  drawWave("#0077ff", 0.015, 20, 0);
  drawWave("#00aaff", 0.02, 25, 100);
  drawWave("#0055ff", 0.018, 15, 200);

  t += 0.015; // animation speed
  requestAnimationFrame(draw);
}

// 🌊 Draw individual wave function
function drawWave(color, waveLength, amplitude, offset) {
  ctx.beginPath();
  ctx.moveTo(0, height / 2);

  for (let x = 0; x < width; x++) {
    const y =
      Math.sin(x * waveLength + t + offset) * amplitude + height / 2;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
}

draw(); // start animation
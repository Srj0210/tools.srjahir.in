// SRJahir Tech — Dual Layer Wave Animation
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, increment = 0;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = 260;
}
window.addEventListener("resize", resize);
resize();

function drawWave(color, alpha, amp, freq, speed, offset) {
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    const y = height / 2 + Math.sin(x * freq + increment * speed + offset) * amp;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(${color}, ${alpha})`;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawWave("0,150,255", 0.45, 25, 0.015, 1.2, 0);
  drawWave("0,90,255", 0.25, 35, 0.01, 0.8, 2);
  increment += 0.04;
  requestAnimationFrame(animate);
}
animate();
// SRJahir Tech — Wave Animation (behind everything)
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
let width, height, increment = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(0, height * 0.4);
  for (let x = 0; x < width; x++) {
    ctx.lineTo(x, height * 0.4 + Math.sin(x * 0.015 + increment) * 25);
  }
  ctx.strokeStyle = "rgba(0, 150, 255, 0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();
  increment += 0.04;
  requestAnimationFrame(animate);
}
animate();
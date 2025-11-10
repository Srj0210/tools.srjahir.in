/* ============================================================
   SRJ Tools — Full Background Layered Wave Animation
   ============================================================ */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, waves;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  waves = [
    { amp: 25, len: 0.012, speed: 0.03, color: "rgba(0,170,255,0.25)" },
    { amp: 35, len: 0.015, speed: 0.02, color: "rgba(0,120,255,0.2)" },
    { amp: 45, len: 0.009, speed: 0.018, color: "rgba(0,80,255,0.15)" },
  ];
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let t = 0;
function drawWaves() {
  ctx.clearRect(0, 0, width, height);

  waves.forEach((w, i) => {
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const y =
        Math.sin(x * w.len + t * w.speed) * w.amp +
        Math.cos(x * 0.015 + t * (w.speed * 0.6)) * 10 +
        height / 2 +
        i * 60 -
        100;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = w.color;
    ctx.shadowColor = w.color;
    ctx.shadowBlur = 20;
    ctx.fill();
  });

  t += 1;
  requestAnimationFrame(drawWaves);
}
drawWaves();
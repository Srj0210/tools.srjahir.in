/* ============================================================
   SRJ Tools — Full-Background Elegant Wave Lines
   ============================================================ */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, waves = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // Elegant soft waves, distributed vertically
  waves = [
    { amp: 25, len: 0.009, speed: 0.02, color: "rgba(0,160,255,0.45)", offset: 0 },
    { amp: 35, len: 0.007, speed: 0.018, color: "rgba(0,120,255,0.35)", offset: 50 },
    { amp: 20, len: 0.012, speed: 0.015, color: "rgba(0,180,255,0.25)", offset: 120 },
    { amp: 15, len: 0.010, speed: 0.022, color: "rgba(0,100,255,0.2)", offset: 200 }
  ];
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let t = 0;
function draw() {
  ctx.clearRect(0, 0, width, height);

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#000814");
  gradient.addColorStop(1, "#000000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  waves.forEach((w, i) => {
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const y = Math.sin(x * w.len + t * w.speed) * w.amp + (height / 3) + w.offset;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = w.color;
    ctx.lineWidth = 1.6;
    ctx.shadowColor = w.color;
    ctx.shadowBlur = 15;
    ctx.stroke();
  });

  t += 1;
  requestAnimationFrame(draw);
}

draw();
/* ============================================================
   SRJ Tools — Elegant Wave Lines Animation
   ============================================================ */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height, waves = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // Create multiple wave lines
  waves = [
    { amp: 25, len: 0.01, speed: 0.02, color: "rgba(0,180,255,0.6)" },
    { amp: 35, len: 0.012, speed: 0.018, color: "rgba(0,150,255,0.4)" },
    { amp: 20, len: 0.008, speed: 0.015, color: "rgba(0,120,255,0.3)" }
  ];
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let t = 0;
function animate() {
  ctx.clearRect(0, 0, width, height);

  // draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#000814");
  gradient.addColorStop(1, "#000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  waves.forEach((w, i) => {
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const y = Math.sin(x * w.len + t * w.speed) * w.amp + height / 2 + i * 40 - 50;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = w.color;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = w.color;
    ctx.shadowBlur = 10;
    ctx.stroke();
  });

  t += 1;
  requestAnimationFrame(animate);
}

animate();
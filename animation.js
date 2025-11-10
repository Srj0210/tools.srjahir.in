/* ============================================================
   SRJ Tools — Floating Particle Background Animation
   ============================================================ */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];

  // Create particles
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    });
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,170,255,0.8)";
    ctx.shadowColor = "rgba(0,170,255,0.8)";
    ctx.shadowBlur = 12;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();
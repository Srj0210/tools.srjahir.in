// ============================================================
// SRJ Tools — Dynamic Wave Background + Navbar Animation
// ============================================================

// Background Waves
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
let w, h, t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function draw() {
  ctx.clearRect(0, 0, w, h);
  t += 0.015;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const color = `hsla(${200 + i * 20}, 100%, 55%, 0.15)`;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    for (let x = 0; x < w; x += 10) {
      const y = Math.sin(x * 0.01 + t + i * 2) * 25 +
                Math.cos(x * 0.008 + t) * 15 +
                h / 2 + i * 30;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  requestAnimationFrame(draw);
}
draw();

// Navbar + Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("active"));
  }

  if (typeof gsap !== "undefined") {
    gsap.from(".navbar", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
  }
});
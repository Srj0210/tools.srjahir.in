/* ============================================================
   SRJ Tools — Background Wave Animation (behind cards)
   ============================================================ */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let step = 0;
function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const colors = ["#002b5b", "#004080", "#0077ff"];
  step += 0.02;

  colors.forEach((color, i) => {
    ctx.beginPath();
    const angle = step + i * Math.PI / 2;
    for (let x = 0; x <= canvas.width; x++) {
      const y = Math.sin(x * 0.01 + angle) * 20 + 150 + i * 30;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  requestAnimationFrame(drawWave);
}
drawWave();
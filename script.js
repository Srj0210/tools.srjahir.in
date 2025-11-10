/* ============================================================
   SRJahir Tech - Interactive Script
   Author: SRJ (srjahir.in)
   ============================================================ */

// Scroll-to-top Button Setup
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "↑";
scrollBtn.className = "scroll-top";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 250 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth hover effect on tool cards
const cards = document.querySelectorAll(".tool-card");
cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,150,255,0.15), rgba(0,30,60,0.35))`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(0, 30, 60, 0.35)";
  });
});

// File upload preview logic (common for tools)
const fileInputs = document.querySelectorAll("input[type='file']");
fileInputs.forEach(input => {
  input.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const infoBox = document.createElement("div");
      infoBox.textContent = `✅ Selected: ${file.name}`;
      infoBox.style.color = "#00aaff";
      infoBox.style.marginTop = "10px";
      infoBox.style.fontSize = "0.9rem";
      input.insertAdjacentElement("afterend", infoBox);
      setTimeout(() => infoBox.remove(), 5000);
    }
  });
});

// Responsive Navbar Shadow on Scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = "0 0 15px rgba(0,150,255,0.25)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// Simple fade-in animation on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => (document.body.style.opacity = 1));
});
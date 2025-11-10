/* ============================================================
   SRJahir Tech — Final Script (No Navbar, No Scroll Arrow)
   ============================================================ */

// 🌟 Fade-in animation on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => (document.body.style.opacity = 1));
});

// 💫 Smooth hover ripple effect for tool cards
const cards = document.querySelectorAll(".tool-card");
cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,150,255,0.15), rgba(0,30,60,0.4))`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(0,30,60,0.4)";
  });
});

// ⚙️ Simple page fade-in for sections (like GSAP but light)
const fadeElements = document.querySelectorAll(".fade-in");
const fadeOptions = { threshold: 0.1 };
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, fadeOptions);

fadeElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.8s ease";
  fadeObserver.observe(el);
});

// 🧩 Handle file inputs (if exist in other pages like pdftoword.html)
const fileInputs = document.querySelectorAll("input[type='file']");
fileInputs.forEach(input => {
  input.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const info = document.createElement("div");
      info.textContent = `✅ Selected: ${file.name}`;
      info.style.color = "#00aaff";
      info.style.marginTop = "10px";
      info.style.fontSize = "0.9rem";
      input.insertAdjacentElement("afterend", info);
      setTimeout(() => info.remove(), 5000);
    }
  });
});

// 🧠 Safe check for missing images
const imgs = document.querySelectorAll("img");
imgs.forEach(img => {
  img.onerror = () => {
    console.warn("Missing image:", img.src);
    img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23000'/><text x='50' y='55' fill='%23fff' text-anchor='middle' font-family='Poppins' font-size='16'>SRJ</text></svg>";
  };
});
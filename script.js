/* ============================================================
   SRJ Tools — Script (Tools, Scroll & Animation)
   ============================================================ */

// Tool List
const tools = [
  { icon: "📝", name: "Word to PDF", sub: "Convert Word files to PDF", link: "wordtopdf.html" },
  { icon: "📄", name: "PDF to Word", sub: "Make your PDF editable", link: "pdftoword.html" },
  { icon: "➕", name: "Merge PDF", sub: "Combine multiple PDFs", link: "#" },
  { icon: "✂️", name: "Split PDF", sub: "Separate pages easily", link: "#" },
  { icon: "📦", name: "Compress PDF", sub: "Reduce file size easily", link: "#" },
  { icon: "🔓", name: "Unlock PDF", sub: "Remove password protection", link: "#" },
  { icon: "🔒", name: "Protect PDF", sub: "Add password security", link: "#" }
];

const grid = document.getElementById("toolsGrid");
tools.forEach(tool => {
  const card = document.createElement("div");
  card.className = "tool-card fade-in";
  card.innerHTML = `
    <div class="tool-icon">${tool.icon}</div>
    <div class="tool-name">${tool.name}</div>
    <div class="tool-sub">${tool.sub}</div>
  `;
  card.onclick = () => {
    if (tool.link !== "#") window.location.href = tool.link;
  };
  grid.appendChild(card);
});

// Scroll-to-top button
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Navbar toggle for mobile
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));

// Fade-in animations
const fadeElements = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
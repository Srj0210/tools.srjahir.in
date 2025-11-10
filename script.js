/* ============================================================
   SRJ Tools — Dynamic Homepage + Converter Logic
   ============================================================ */

// ✅ Tool Data
const tools = [
  { name: "Word to PDF", icon: "📝", desc: "Convert Word files to PDF", link: "wordtopdf.html" },
  { name: "PDF to Word", icon: "📄", desc: "Make your PDF editable", link: "pdftoword.html" },
  { name: "Merge PDF", icon: "➕", desc: "Combine multiple PDFs", link: "#" },
  { name: "Split PDF", icon: "✂️", desc: "Separate pages easily", link: "#" },
  { name: "Compress PDF", icon: "🗜️", desc: "Reduce file size easily", link: "#" },
  { name: "Unlock PDF", icon: "🔓", desc: "Remove password protection", link: "#" },
  { name: "Protect PDF", icon: "🔒", desc: "Add password security", link: "#" }
];

// ✅ Generate Tools on Homepage
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("toolsGrid");
  if (grid) {
    tools.forEach(tool => {
      const div = document.createElement("div");
      div.className = "tool-card fade-in";
      div.innerHTML = `
        <div class="tool-icon">${tool.icon}</div>
        <div class="tool-name">${tool.name}</div>
        <div class="tool-sub">${tool.desc}</div>
      `;
      div.addEventListener("click", () => {
        if (tool.link === "#" || tool.link.startsWith("#")) {
          alert(`${tool.name} coming soon! 🚀`);
        } else {
          window.location.href = tool.link;
        }
      });
      grid.appendChild(div);
    });

    // Fade-in for cards
    setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 100);
      });
    }, 500);
  }
});
// SRJ Tools — Main Script
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
if (grid) {
  tools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
      <div class="tool-icon" style="font-size:2rem;">${tool.icon}</div>
      <div class="tool-name">${tool.name}</div>
      <div class="tool-sub">${tool.sub}</div>
    `;
    card.onclick = () => {
      if (tool.link !== "#") window.location.href = tool.link;
    };
    grid.appendChild(card);
  });
}
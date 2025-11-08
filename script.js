// Tool list
const tools = [
  { name: "Word to PDF", icon: "📝", desc: "Convert Word files to PDF", link: "#wordtopdf" },
  { name: "PDF to Word", icon: "📄", desc: "Make your PDF editable", link: "#pdftoword" },
  { name: "Merge PDF", icon: "➕", desc: "Combine multiple PDFs", link: "#mergepdf" },
  { name: "Split PDF", icon: "✂️", desc: "Separate pages easily", link: "#splitpdf" },
  { name: "Compress PDF", icon: "🗜️", desc: "Reduce PDF size", link: "#compresspdf" },
  { name: "Unlock PDF", icon: "🔓", desc: "Remove password lock", link: "#unlockpdf" },
  { name: "Protect PDF", icon: "🔒", desc: "Add password security", link: "#protectpdf" }
];

const grid = document.getElementById("toolsGrid");
tools.forEach(tool => {
  const div = document.createElement("div");
  div.className = "tool-card fade-in-up";
  div.innerHTML = `
    <div class="tool-icon">${tool.icon}</div>
    <div class="tool-name">${tool.name}</div>
    <div class="tool-sub">${tool.desc}</div>
  `;
  div.addEventListener("click", () => alert(`${tool.name} coming soon!`));
  grid.appendChild(div);
});

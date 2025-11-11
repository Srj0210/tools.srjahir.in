// SRJ Tools — Main Script
const API_BASE = "https://api.srjahir.in";

// 🧩 Homepage Tools Loader
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

// 🧠 Converter Page Logic (Manual Download)
async function handleConversion(fileInputId, buttonId, endpoint, downloadName) {
  const fileInput = document.getElementById(fileInputId);
  const convertBtn = document.getElementById(buttonId);
  const progressBar = document.getElementById("progressBar");
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput || !convertBtn) return;

  let fileBlob = null; // store blob temporarily

  convertBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Please select a file first!");

    progressBar.style.width = "0%";
    downloadLink.style.display = "none";
    fileBlob = null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const progressSim = setInterval(() => {
        const width = parseInt(progressBar.style.width) || 0;
        if (width < 90) progressBar.style.width = width + 10 + "%";
      }, 300);

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressSim);
      progressBar.style.width = "100%";

      if (!res.ok) throw new Error("Conversion failed");

      fileBlob = await res.blob();
      downloadLink.style.display = "block";
      downloadLink.textContent = "⬇ Download Converted File";
      downloadLink.onclick = () => {
        if (!fileBlob) return alert("No file ready yet!");
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = downloadName;
        a.click();
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      alert("❌ Conversion failed! Please try again.");
      console.error(err);
    }
  });
}

// Word → PDF
if (document.getElementById("convertWordToPdf")) {
  handleConversion("wordFile", "convertWordToPdf", "word-to-pdf", "converted.pdf");
}

// PDF → Word
if (document.getElementById("convertPdfToWord")) {
  handleConversion("pdfFile", "convertPdfToWord", "pdf-to-word", "converted.docx");
}
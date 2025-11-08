/* ============================================================
   SRJ Tools — Smart · Fast · Secure — All-in-One PDF Suite
   by SRJahir Tech
   ============================================================ */

// ✅ Define Tool Data for Homepage
const tools = [
  {
    name: "Word to PDF",
    icon: "📝",
    desc: "Convert Word files to PDF",
    link: "wordtopdf.html"
  },
  {
    name: "PDF to Word",
    icon: "📄",
    desc: "Make your PDF editable",
    link: "pdftoword.html"
  },
  {
    name: "Merge PDF",
    icon: "➕",
    desc: "Combine multiple PDFs",
    link: "#mergepdf"
  },
  {
    name: "Split PDF",
    icon: "✂️",
    desc: "Separate pages easily",
    link: "#splitpdf"
  },
  {
    name: "Compress PDF",
    icon: "🗜️",
    desc: "Reduce file size easily",
    link: "#compresspdf"
  },
  {
    name: "Unlock PDF",
    icon: "🔓",
    desc: "Remove password protection",
    link: "#unlockpdf"
  },
  {
    name: "Protect PDF",
    icon: "🔒",
    desc: "Add password security",
    link: "#protectpdf"
  }
];

// ============================================================
// 🏠 HOME PAGE DYNAMIC TOOL CARDS (index.html)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("toolsGrid");

  if (grid) {
    tools.forEach(tool => {
      const div = document.createElement("div");
      div.className = "tool-card fade-in-up";
      div.innerHTML = `
        <div class="tool-icon">${tool.icon}</div>
        <div class="tool-name">${tool.name}</div>
        <div class="tool-sub">${tool.desc}</div>
      `;
      div.addEventListener("click", () => {
        if (tool.link && !tool.link.startsWith("#")) {
          window.location.href = tool.link;
        } else {
          alert(`${tool.name} coming soon! 🚀`);
        }
      });
      grid.appendChild(div);
    });

    // GSAP Header Animations
    gsap.from(".logo", { duration: 1.2, opacity: 0, y: -30, ease: "power2.out" });
    gsap.from("h1", { duration: 1.2, opacity: 0, y: -10, delay: 0.3, ease: "power2.out" });
    gsap.from(".subtitle", { duration: 1, opacity: 0, y: 20, delay: 0.5 });

    // GSAP Scroll Animation for Cards
    gsap.to(".fade-in-up", {
      scrollTrigger: {
        trigger: ".tools-section",
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });

    // Scroll to Top Button
    const scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-top";
    scrollBtn.innerHTML = "⬆️";
    document.body.appendChild(scrollBtn);
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
    });
  }

  // ============================================================
  // 📝 WORD → PDF CONVERTER PAGE
  // ============================================================

  const uploadWord = document.getElementById("wordFile");
  const convertWordBtn = document.getElementById("convertBtn");
  const downloadWordBtn = document.getElementById("downloadBtn");
  const statusWord = document.getElementById("statusText");
  const fileWordName = document.getElementById("fileNameText");

  let selectedWord = null;
  let convertedWordPDF = null;

  if (uploadWord) {
    uploadWord.addEventListener("change", (e) => {
      selectedWord = e.target.files[0];
      if (selectedWord) {
        fileWordName.textContent = `📄 ${selectedWord.name}`;
        fileWordName.style.display = "block";
        convertWordBtn.disabled = false;
      } else {
        fileWordName.style.display = "none";
        convertWordBtn.disabled = true;
      }
    });

    convertWordBtn.addEventListener("click", async () => {
      if (!selectedWord) {
        alert("Please select a Word file first!");
        return;
      }

      statusWord.innerHTML = "⏳ Converting... please wait";
      convertWordBtn.disabled = true;
      downloadWordBtn.style.display = "none";

      const formData = new FormData();
      formData.append("file", selectedWord);

      try {
        const response = await fetch("https://api.srjahir.in/word-to-pdf", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("Conversion failed!");

        const blob = await response.blob();
        convertedWordPDF = window.URL.createObjectURL(blob);
        const baseName = selectedWord.name.replace(/\.[^/.]+$/, "");

        statusWord.innerHTML = "✅ Conversion complete!";
        downloadWordBtn.style.display = "block";

        downloadWordBtn.onclick = () => {
          const a = document.createElement("a");
          a.href = convertedWordPDF;
          a.download = `${baseName}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      } catch (err
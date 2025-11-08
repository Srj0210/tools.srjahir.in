/* ============================================================
   SRJ Tools — Smart · Fast · Secure — All-in-One PDF Suite
   by SRJahir Tech
   ============================================================ */

// ✅ Define All Tool Data
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
    link: "#pdftoword"
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

// ✅ Select Grid Container
const grid = document.getElementById("toolsGrid");

// ✅ Create Dynamic Cards
tools.forEach(tool => {
  const div = document.createElement("div");
  div.className = "tool-card fade-in-up";

  div.innerHTML = `
    <div class="tool-icon">${tool.icon}</div>
    <div class="tool-name">${tool.name}</div>
    <div class="tool-sub">${tool.desc}</div>
  `;

  div.addEventListener("click", () => {
    // If tool has a valid link (not coming soon)
    if (tool.link && !tool.link.startsWith("#")) {
      window.location.href = tool.link;
    } else {
      alert(`${tool.name} coming soon!`);
    }
  });

  grid.appendChild(div);
});

// ✅ GSAP Animation Integration
window.addEventListener("load", () => {
  // Animate Header
  gsap.from(".logo", {
    duration: 1.2,
    opacity: 0,
    y: -30,
    ease: "power2.out"
  });

  gsap.from("h1", {
    duration: 1.2,
    opacity: 0,
    y: -10,
    delay: 0.3,
    ease: "power2.out"
  });

  gsap.from(".subtitle", {
    duration: 1,
    opacity: 0,
    y: 20,
    delay: 0.5
  });

  // Animate Tool Cards (on scroll)
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
});

// ✅ Add Smooth Scroll to Top Button (optional polish)
const scrollBtn = document.createElement("button");
scrollBtn.className = "scroll-top";
scrollBtn.innerHTML = "⬆️";
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
// =====================================================
// SRJ Tools - Universal Converter Script
// Supports: Word → PDF & PDF → Word
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  // 🟦 GLOBAL STYLE EFFECTS (Optional Visual Startup Animation)
  const fadeElems = document.querySelectorAll(".fade-in");
  fadeElems.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 100);
  });

  // =====================================================
  // 📝 WORD → PDF CONVERTER
  // =====================================================

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
        fileWordName.textContent = "";
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
      } catch (err) {
        statusWord.innerHTML = "❌ Error: " + err.message;
      } finally {
        convertWordBtn.disabled = false;
      }
    });
  }

  // =====================================================
  // 📄 PDF → WORD CONVERTER
  // =====================================================

  const pdfInput = document.getElementById("pdfFile");
  const pdfConvertBtn = document.getElementById("pdfConvertBtn");
  const pdfDownloadBtn = document.getElementById("pdfDownloadBtn");
  const pdfFileName = document.getElementById("pdfFileName");
  const pdfStatus = document.getElementById("pdfStatus");

  let selectedPDF = null;
  let convertedDOCX = null;

  if (pdfInput) {
    pdfInput.addEventListener("change", (e) => {
      selectedPDF = e.target.files[0];
      if (selectedPDF) {
        pdfFileName.textContent = `📄 ${selectedPDF.name}`;
        pdfFileName.style.display = "block";
        pdfConvertBtn.disabled = false;
      } else {
        pdfFileName.textContent = "";
        pdfFileName.style.display = "none";
        pdfConvertBtn.disabled = true;
      }
    });

    pdfConvertBtn.addEventListener("click", async () => {
      if (!selectedPDF) {
        alert("Please select a PDF file first!");
        return;
      }

      pdfStatus.innerHTML = "⏳ Converting PDF to Word...";
      pdfConvertBtn.disabled = true;
      pdfDownloadBtn.style.display = "none";

      const formData = new FormData();
      formData.append("file", selectedPDF);

      try {
        const response = await fetch("https://api.srjahir.in/pdf-to-word", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Conversion failed!");

        const blob = await response.blob();
        convertedDOCX = window.URL.createObjectURL(blob);

        const baseName = selectedPDF.name.replace(/\.[^/.]+$/, "");
        pdfStatus.innerHTML = "✅ Conversion complete!";
        pdfDownloadBtn.style.display = "block";

        pdfDownloadBtn.onclick = () => {
          const a = document.createElement("a");
          a.href = convertedDOCX;
          a.download = `${baseName}.docx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      } catch (err) {
        pdfStatus.innerHTML = "❌ Error: " + err.message;
      } finally {
        pdfConvertBtn.disabled = false;
      }
    });
  }

});
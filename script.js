document.addEventListener("DOMContentLoaded", () => {

  // ======== WORD → PDF ===========
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
      }
    });

    convertWordBtn.addEventListener("click", async () => {
      if (!selectedWord) return;
      statusWord.innerHTML = "⏳ Converting...";
      convertWordBtn.disabled = true;

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

  // ======== PDF → WORD ===========
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
      }
    });

    pdfConvertBtn.addEventListener("click", async () => {
      if (!selectedPDF) return;

      pdfStatus.innerHTML = "⏳ Converting PDF...";
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
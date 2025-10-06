// 📘 SRJahir Tools - Frontend Script
// Handles all PDF tool actions with backend API

async function handlePDF(tool, fileInputId, textAreaId = null) {
  const fileInput = document.getElementById(fileInputId);
  const textInput = textAreaId ? document.getElementById(textAreaId).value : null;

  // Show popup while processing
  alert("⏳ Please wait... converting your file!");

  const formData = new FormData();

  if (tool === "merge-pdf") {
    // Multiple PDFs for merging
    for (let f of fileInput.files) formData.append("files", f);
  } else if (tool === "text-to-pdf") {
    // Text to PDF conversion
    formData.append("text", textInput);
  } else {
    // Single file tools (Word→PDF, PDF→Word, Split)
    formData.append("file", fileInput.files[0]);
  }

  try {
    const response = await fetch(`https://api.srjahir.in/${tool}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("HTTP error " + response.status);

    // Get file response
    const blob = await response.blob();
    const link = document.createElement("a");

    // Generate file name
    const fileName = fileInput.files[0]
      ? fileInput.files[0].name.replace(/\.[^/.]+$/, "") + "_converted.pdf"
      : tool + "_output.pdf";

    // Download
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    alert("✅ Conversion successful!");
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
}

// 🧩 Event bindings for all buttons
document.addEventListener("DOMContentLoaded", () => {
  // Word → PDF
  document.getElementById("wordToPdfBtn").addEventListener("click", () => {
    handlePDF("word-to-pdf", "wordToPdfInput");
  });

  // PDF → Word
  document.getElementById("pdfToWordBtn").addEventListener("click", () => {
    handlePDF("pdf-to-word", "pdfToWordInput");
  });

  // Merge PDF
  document.getElementById("mergePdfBtn").addEventListener("click", () => {
    handlePDF("merge-pdf", "mergePdfInput");
  });

  // Split PDF
  document.getElementById("splitPdfBtn").addEventListener("click", () => {
    handlePDF("split-pdf", "splitPdfInput");
  });

  // Text → PDF
  document.getElementById("textToPdfBtn").addEventListener("click", () => {
    handlePDF("text-to-pdf", null, "textToPdfInput");
  });
});
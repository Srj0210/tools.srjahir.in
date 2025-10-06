document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".convert-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const tool = btn.dataset.tool;
      const parent = btn.parentElement;
      const formData = new FormData();

      if (tool === "merge-pdf") {
        const files = parent.querySelector("input[type='file']").files;
        if (files.length === 0) return alert("Please select PDF files!");
        for (let f of files) formData.append("files", f);
      } else if (tool === "text-to-pdf") {
        const text = parent.querySelector("textarea").value.trim();
        if (!text) return alert("Please write some text!");
        formData.append("text", text);
      } else {
        const file = parent.querySelector("input[type='file']").files[0];
        if (!file) return alert("Please select a file first!");
        formData.append("file", file);
      }

      // 🔔 popup message
      alert("Processing your file... Please wait ⏳");

      try {
        const response = await fetch(`https://api.srjahir.in/${tool}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("HTTP error " + response.status);

        const blob = await response.blob();
        const downloadLink = document.createElement("a");
        const fileName = `${tool}_output.${
          tool.includes("word") ? "docx" : tool.includes("split") ? "zip" : "pdf"
        }`;
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        alert("✅ File is ready and downloaded!");
      } catch (err) {
        console.error("Error:", err);
        alert("❌ Conversion failed: " + err.message);
      }
    });
  });
});
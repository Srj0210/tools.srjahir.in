const API_BASE = "https://api.srjahir.in"; // backend API root

async function handleTool(tool) {
  const overlay = document.getElementById("loader-overlay");
  const toast = document.getElementById("toast");
  overlay.style.display = "flex";

  const form = new FormData();

  try {
    if (tool === "text-to-pdf") {
      const text = document.getElementById("text-to-pdf-text").value.trim();
      if (!text) throw new Error("Please enter text");
      form.append("text", text);

    } else if (tool === "merge-pdf") {
      const files = document.getElementById("merge-pdf-input").files;
      if (!files.length) throw new Error("Please select PDF files");
      for (let f of files) form.append("files", f);

    } else if (tool === "split-pdf") {
      const file = document.getElementById("split-pdf-input").files[0];
      const pages = document.getElementById("split-pages").value.trim();

      if (!file) throw new Error("Please select a PDF file");
      if (!pages) {
        const confirmAll = confirm(
          "You didn't enter any pages. Do you want to split all pages?"
        );
        if (!confirmAll) throw new Error("Operation cancelled");
      }

      form.append("file", file);
      form.append("pages", pages);

    } else {
      const fileInput = document.getElementById(`${tool}-input`);
      const file = fileInput?.files[0];
      if (!file) throw new Error("Please select a file");
      form.append("file", file);
    }

    const res = await fetch(`${API_BASE}/${tool}`, { method: "POST", body: form });
    if (!res.ok) throw new Error("Server error " + res.status);

    const blob = await res.blob();
    const cd = res.headers.get("Content-Disposition");
    let filename = "output.pdf";
    if (cd && cd.includes("filename="))
      filename = cd.split("filename=")[1].replace(/['"]/g, "");

    // Download file
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Toast success
    toast.innerText = "✅ File downloaded successfully! Refresh site to use again 🔁";
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
      toast.innerText = "✅ File ready for download"; // reset text for next use
    }, 3500);

    // Cleanup local
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 6000);

  } catch (e) {
    alert("❌ " + e.message);
  } finally {
    overlay.style.display = "none";
  }
}
const API_BASE = "https://api.srjahir.in"; // backend root URL

function showPopup(msg) {
  const popup = document.getElementById("popup");
  popup.innerText = msg;
  popup.style.display = "block";
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

async function handleTool(tool) {
  try {
    showPopup("Processing... Please wait ⏳");

    let endpoint = `${API_BASE}/${tool}`;
    let formData = new FormData();

    // Determine what to send based on the tool
    if (tool === "text-to-pdf") {
      const text = document.getElementById("text-to-pdf-text").value.trim();
      if (!text) {
        alert("Please enter text");
        hidePopup();
        return;
      }
      formData.append("text", text);
    } else if (tool === "merge-pdf") {
      const files = document.getElementById("merge-pdf-input").files;
      if (files.length === 0) {
        alert("Please select at least one PDF");
        hidePopup();
        return;
      }
      for (let f of files) formData.append("files", f);
    } else {
      // for single-file tools like word-to-pdf, pdf-to-word
      const fileInput = document.getElementById(`${tool}-input`);
      const file = fileInput?.files[0];
      if (!file) {
        alert("Please select a file");
        hidePopup();
        return;
      }
      formData.append("file", file);
    }

    const response = await fetch(endpoint, { method: "POST", body: formData });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      alert("Error: " + (err.error || response.statusText));
      hidePopup();
      return;
    }

    // if everything okay — download the returned file
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // detect filename from content-disposition
    const cd = response.headers.get("Content-Disposition");
    let filename = "output.pdf";
    if (cd && cd.includes("filename=")) {
      filename = cd.split("filename=")[1].replace(/['"]/g, "");
    }

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    alert("Unexpected error: " + err.message);
  } finally {
    hidePopup();
  }
}
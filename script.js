// script.js - frontend fetch + download helper
const API_BASE = "https://api.srjahir.in"; // use your API domain

async function callTool(tool, fileInputElement, textValue) {
  let formData = new FormData();

  if (tool === "merge-pdf") {
    const files = fileInputElement.files;
    if (!files || files.length === 0) throw new Error("No files selected");
    for (let f of files) formData.append("files", f);
  } else if (tool === "text-to-pdf") {
    formData.append("text", textValue || "");
  } else {
    // single file tools
    const f = fileInputElement.files[0];
    if (!f) throw new Error("No file selected");
    formData.append("file", f);
  }

  const endpoint = `${API_BASE}/${tool}`;

  const resp = await fetch(endpoint, {
    method: "POST",
    body: formData
  });

  if (!resp.ok) {
    // try to show JSON message if present
    let txt;
    try { txt = await resp.json(); } catch (e) { txt = await resp.text(); }
    throw new Error(`HTTP ${resp.status} - ${JSON.stringify(txt)}`);
  }

  const blob = await resp.blob();
  // guess filename from Content-Disposition if present
  let filename = "download";
  const cd = resp.headers.get("content-disposition");
  if (cd) {
    const match = cd.match(/filename\*?=([^;]+)/);
    if (match) {
      filename = match[1].replace(/utf-8''/i, "").trim();
      filename = filename.replace(/["']/g, "");
    }
  } else {
    // fallback naming
    const ext = blob.type === "application/pdf" ? ".pdf" : (blob.type === "application/zip" ? ".zip" : "");
    filename = tool + ext;
  }

  // download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Example wiring (call this when user clicks convert)
async function onConvertClicked(tool, fileInputId, textareaId) {
  try {
    const fileInput = document.getElementById(fileInputId);
    const textValue = textareaId ? document.getElementById(textareaId).value : "";
    // show loader if you want
    await callTool(tool, fileInput, textValue);
    // hide loader
  } catch (err) {
    alert("Error: " + (err.message || err));
  }
}
const API_BASE = "https://api.srjahir.in/";

async function handleTool(tool) {
  const fileInput = document.getElementById(`${tool}-input`);
  const textInput = document.getElementById(`${tool}-text`);

  // show loader
  showLoader();

  const formData = new FormData();

  try {
    if (tool === "merge-pdf") {
      for (let f of fileInput.files) formData.append("files", f);
    } else if (tool === "text-to-pdf") {
      formData.append("text", textInput.value.trim());
    } else {
      formData.append("file", fileInput.files[0]);
    }

    let response = await fetch(API_BASE + tool, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("HTTP Error " + response.status);

    let blob = await response.blob();
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = tool + "_output.pdf";
    link.click();
  } catch (err) {
    alert("❌ Error: " + err.message);
    console.error(err);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  document.getElementById("loader-overlay").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader-overlay").style.display = "none";
}
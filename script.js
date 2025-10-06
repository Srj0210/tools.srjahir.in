async function handleTool(tool) {
    const fileInput = document.getElementById(tool + "-file");
    const textInput = document.getElementById(tool + "-text");
    const button = document.getElementById(tool + "-btn");

    button.disabled = true;
    const originalHTML = button.innerHTML;
    button.innerHTML = `<div class="loader"></div> Processing...`;
    button.style.opacity = "0.7";

    const formData = new FormData();
    if (tool === "merge-pdf") {
        for (let f of fileInput.files) formData.append("files", f);
    } else if (fileInput && fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    } else if (textInput && textInput.value.trim()) {
        formData.append("text", textInput.value);
    } else {
        showToast("⚠️ Please select or enter content first.");
        resetButton(button, originalHTML);
        return;
    }

    try {
        const response = await fetch("https://api.srjahir.in/" + tool, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("HTTP Error:", response.status);
            showToast("❌ Server Error " + response.status);
            return;
        }

        const blob = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = "output.pdf";
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match) filename = match[1];
        }

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();

        showToast("✅ Download complete!");
    } catch (err) {
        console.error(err);
        showToast("⚠️ Something went wrong!");
    } finally {
        resetButton(button, originalHTML);
    }
}

function resetButton(button, originalHTML) {
    button.innerHTML = originalHTML;
    button.disabled = false;
    button.style.opacity = "1";
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "custom-toast";
    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = "0"), 2500);
    setTimeout(() => toast.remove(), 3000);
}
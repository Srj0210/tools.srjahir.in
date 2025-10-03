async function uploadFile(tool, inputId) {
    const fileInput = document.getElementById(inputId);
    if (!fileInput.files.length) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    if (tool === "merge-pdf") {
        for (let f of fileInput.files) {
            formData.append("files", f);
        }
    } else {
        formData.append("file", fileInput.files[0]);
    }

    try {
        let response = await fetch("https://api.srjahir.in/" + tool, {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("HTTP error " + response.status);

        // download the file
        let blob = await response.blob();
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = tool + "_output.pdf";
        link.click();

    } catch (error) {
        alert("Error: " + error);
    }
}

async function textToPdf() {
    const text = document.getElementById("textInput").value;
    const formData = new FormData();
    formData.append("text", text);

    try {
        let response = await fetch("https://api.srjahir.in/text-to-pdf", {
            method: "POST",
            body: formData
        });

        let blob = await response.blob();
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "text_output.pdf";
        link.click();
    } catch (error) {
        alert("Error: " + error);
    }
}

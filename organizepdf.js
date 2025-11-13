const fileInput = document.getElementById("fileInput");
const pagesContainer = document.getElementById("pagesContainer");
const confirmBtn = document.getElementById("confirmBtn");
const progressBar = document.getElementById("progressBar");
const downloadBtn = document.getElementById("downloadBtn");

let pdfPages = [];
let sortedPages = [];

// Auto load on upload
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) loadPDF(file);
});

// Load PDF pages
async function loadPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    pagesContainer.innerHTML = "";
    pdfPages = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: canvas.getContext("2d"),
            viewport: viewport
        }).promise;

        const wrapper = document.createElement("div");
        wrapper.className = "page-item";
        wrapper.draggable = true;
        wrapper.dataset.index = i - 1;

        // IMPORTANT – stop image context menu
        canvas.style.pointerEvents = "none";
        canvas.style.userSelect = "none";
        canvas.style.touchAction = "none";

        wrapper.appendChild(canvas);
        wrapper.appendChild(document.createElement("p")).innerText = `Page ${i}`;

        pagesContainer.appendChild(wrapper);
        pdfPages.push({ pageNumber: i, canvas });
    }

    enableDragAndDrop();
}

function enableDragAndDrop() {
    let dragged;

    document.querySelectorAll(".page-item").forEach(item => {

        item.addEventListener("dragstart", () => {
            dragged = item;
        });

        item.addEventListener("dragover", e => {
            e.preventDefault();
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            if (dragged !== item) {
                pagesContainer.insertBefore(dragged, item);
            }
        });

    });
}

// CONFIRM organization
confirmBtn.addEventListener("click", () => {
    sortedPages = Array.from(document.querySelectorAll(".page-item"))
        .map(div => parseInt(div.dataset.index));

    progressBar.style.display = "block";
    progressBar.value = 10;

    setTimeout(() => {
        progressBar.value = 40;
    }, 500);

    setTimeout(() => {
        progressBar.value = 70;
    }, 1000);

    setTimeout(() => {
        progressBar.value = 100;
        downloadBtn.style.display = "block";
    }, 1500);
});

// DOWNLOAD button
downloadBtn.addEventListener("click", () => {
    generateOrganizedPDF();
});

async function generateOrganizedPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    sortedPages.forEach((pIndex, i) => {
        const canvas = pdfPages[pIndex].canvas;
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    });

    pdf.save("Organized.pdf");
}
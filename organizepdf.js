const fileInput = document.getElementById("fileInput");
const pagesContainer = document.getElementById("pagesContainer");
const confirmBtn = document.getElementById("confirmBtn");
const downloadBtn = document.getElementById("downloadBtn");
const progressFill = document.querySelector("#progressBar .fill");

let pdfPages = [];
let sortedPages = [];

// Auto load when file selected
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) loadPDF(file);
});

async function loadPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    pagesContainer.innerHTML = "";
    pdfPages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        // ✨ Perfect thumbnail size (same as before)
        const viewport = page.getViewport({ scale: 0.25 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        // Prevent long-press Google popup
        canvas.style.pointerEvents = "none";
        canvas.style.touchAction = "none";
        canvas.style.userSelect = "none";

        // Wrapper div
        const wrapper = document.createElement("div");
        wrapper.className = "page-item";
        wrapper.draggable = true;
        wrapper.dataset.index = i - 1;

        wrapper.appendChild(canvas);

        const label = document.createElement("p");
        label.innerText = `Page ${i}`;
        wrapper.appendChild(label);

        pagesContainer.appendChild(wrapper);
        pdfPages.push({ pageNumber: i, canvas });
    }

    enableDragAndDrop();
    confirmBtn.style.display = "block";
}

function enableDragAndDrop() {
    let draggedItem = null;

    document.querySelectorAll(".page-item").forEach((item) => {
        item.addEventListener("dragstart", () => {
            draggedItem = item;
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });

        item.addEventListener("dragover", (e) => e.preventDefault());

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            if (draggedItem !== item) {
                pagesContainer.insertBefore(draggedItem, item);
            }
        });
    });
}

// Confirm organization
confirmBtn.addEventListener("click", () => {
    sortedPages = Array.from(document.querySelectorAll(".page-item"))
        .map((div) => parseInt(div.dataset.index));

    startProgress(() => {
        downloadBtn.style.display = "block";
    });
});

// Fake smooth progress
function startProgress(callback) {
    progressFill.parentElement.style.display = "block";

    let width = 0;
    const interval = setInterval(() => {
        width += 20;
        progressFill.style.width = width + "%";

        if (width >= 100) {
            clearInterval(interval);
            callback();
        }
    }, 300);
}

// Download final PDF
downloadBtn.addEventListener("click", () => {
    generateFinalPDF();
});

async function generateFinalPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    sortedPages.forEach((index, i) => {
        const canvas = pdfPages[index].canvas;
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    });

    pdf.save("Organized.pdf");
}
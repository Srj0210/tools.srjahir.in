const fileInput = document.getElementById("fileInput");
const pagesContainer = document.getElementById("pagesContainer");
const confirmBtn = document.getElementById("confirmBtn");
const downloadBtn = document.getElementById("downloadBtn");
const progressBar = document.querySelector("#progressBar .fill");

let pdfPages = [];
let sortedPages = [];

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

        canvas.style.pointerEvents = "none";
        canvas.style.touchAction = "none";

        wrapper.appendChild(canvas);
        wrapper.append(`Page ${i}`);

        pagesContainer.appendChild(wrapper);
        pdfPages.push({ pageNumber: i, canvas });
    }

    enableDragAndDrop();
    confirmBtn.style.display = "block";
}

function enableDragAndDrop() {
    let draggedItem;

    document.querySelectorAll(".page-item").forEach(item => {
        item.addEventListener("dragstart", () => {
            draggedItem = item;
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });

        item.addEventListener("dragover", e => e.preventDefault());

        item.addEventListener("drop", e => {
            e.preventDefault();
            if (draggedItem !== item) {
                pagesContainer.insertBefore(draggedItem, item);
            }
        });
    });
}

confirmBtn.addEventListener("click", () => {
    sortedPages = Array.from(document.querySelectorAll(".page-item"))
        .map(div => parseInt(div.dataset.index));

    showProgress(() => {
        downloadBtn.style.display = "block";
    });
});

function showProgress(callback) {
    progressBar.parentElement.style.display = "block";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            callback();
        }
    }, 300);
}

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
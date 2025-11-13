// ===============================
// SRJ Tools — Organize PDF (FINAL STABLE VERSION)
// ===============================

const fileInput = document.getElementById("fileInput");
const pagesContainer = document.getElementById("pagesContainer");
const confirmBtn = document.getElementById("confirmBtn");
const downloadBtn = document.getElementById("downloadBtn");
const progressFill = document.querySelector("#progressBar .fill");

let pdfPages = [];
let sortedPages = [];

// Auto preview when file selected
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
        const viewport = page.getViewport({ scale: 0.25 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;

        canvas.style.pointerEvents = "none";
        canvas.style.userSelect = "none";
        canvas.style.touchAction = "none";

        const wrapper = document.createElement("div");
        wrapper.className = "page-item";
        wrapper.draggable = true;
        wrapper.dataset.page = i;          // ✔ page number stored safely

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

// ===============================
// Drag & Drop Sorting (Perfect Stable)
// ===============================
function enableDragAndDrop() {
    let dragging = null;

    pagesContainer.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("page-item")) {
            dragging = e.target;
            dragging.classList.add("dragging");
        }
    });

    pagesContainer.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("page-item")) {
            dragging.classList.remove("dragging");
            dragging = null;
        }
    });

    pagesContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        const after = getAfterElement(e.clientY);
        if (after == null) pagesContainer.appendChild(dragging);
        else pagesContainer.insertBefore(dragging, after);
    });
}

function getAfterElement(y) {
    const items = [...pagesContainer.querySelectorAll(".page-item:not(.dragging)")];
    return items.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

// ===============================
// Confirm Sorting
// ===============================
confirmBtn.addEventListener("click", () => {
    sortedPages = Array.from(document.querySelectorAll(".page-item"))
        .map((div) => parseInt(div.dataset.page) - 1);  // ✔ Now real page order

    startProgress(() => {
        downloadBtn.style.display = "block";
    });
});

// ===============================
// Progress Bar
// ===============================
function startProgress(callback) {
    progressFill.parentElement.style.display = "block";
    let width = 0;
    const interval = setInterval(() => {
        width += 25;
        progressFill.style.width = width + "%";

        if (width >= 100) {
            clearInterval(interval);
            callback();
        }
    }, 300);
}

// ===============================
// Generate Final PDF (WORKING)
// ===============================
downloadBtn.addEventListener("click", generateFinalPDF);

async function generateFinalPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    sortedPages.forEach((index, i) => {
        const canvas = pdfPages[index].canvas;
        const img = canvas.toDataURL("image/jpeg", 1.0);

        if (i !== 0) pdf.addPage();

        pdf.addImage(img, "JPEG", 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
    });

    pdf.save("Organized.pdf");
}
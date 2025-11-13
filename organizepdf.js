// ===============================
// SRJ Tools — Organize PDF
// ===============================

const fileInput = document.getElementById("fileInput");
const pagesContainer = document.getElementById("pagesContainer");
const confirmBtn = document.getElementById("confirmBtn");
const downloadBtn = document.getElementById("downloadBtn");
const progressFill = document.querySelector("#progressBar .fill");

let pdfPages = [];
let sortedPages = [];

// Auto preview after selecting file
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

        // Prevent long-press Google behaviour
        canvas.style.pointerEvents = "none";
        canvas.style.userSelect = "none";
        canvas.style.touchAction = "none";

        // Wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "page-item";
        wrapper.draggable = true;

        // Save canvas
        pdfPages.push({ pageNumber: i, canvas });

        wrapper.appendChild(canvas);

        const label = document.createElement("p");
        label.innerText = `Page ${i}`;
        wrapper.appendChild(label);

        pagesContainer.appendChild(wrapper);
    }

    enableDragAndDrop();
    confirmBtn.style.display = "block";
}

// ===============================
// Drag & Drop Sort
// ===============================
function enableDragAndDrop() {
    let draggedItem = null;

    pagesContainer.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("page-item")) {
            draggedItem = e.target;
            e.target.classList.add("dragging");
        }
    });

    pagesContainer.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("page-item")) {
            e.target.classList.remove("dragging");
        }
    });

    pagesContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        const after = getDragAfterElement(pagesContainer, e.clientY);

        if (after == null) {
            pagesContainer.appendChild(dragging);
        } else {
            pagesContainer.insertBefore(dragging, after);
        }
    });
}

// Helper to place drag item correctly
function getDragAfterElement(container, y) {
    const items = [...container.querySelectorAll(".page-item:not(.dragging)")];

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
        .map((item) => {
            const label = item.querySelector("p").innerText;
            const pageNum = parseInt(label.replace("Page ", ""));
            return pageNum - 1;
        });

    startProgress(() => {
        downloadBtn.style.display = "block";
    });
});

// Progress Bar
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
// Generate Final PDF
// ===============================
downloadBtn.addEventListener("click", generateFinalPDF);

async function generateFinalPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    sortedPages.forEach((index, i) => {
        const canvas = pdfPages[index].canvas;
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        if (i !== 0) pdf.addPage();

        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH);
    });

    pdf.save("Organized.pdf");
}
let pageOrder = [];
let loadedPDF = null;

document.getElementById("loadBtn").addEventListener("click", async () => {
  const file = document.getElementById("pdfFile").files[0];
  if (!file) return alert("Please upload a PDF file.");

  const bar = document.getElementById("progressBar");
  bar.style.width = "0%";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    bar.style.width = progress + "%";
    if (progress >= 100) clearInterval(interval);
  }, 100);

  const buffer = await file.arrayBuffer();
  loadedPDF = await pdfjsLib.getDocument({ data: buffer }).promise;

  const grid = document.getElementById("thumbGrid");
  grid.innerHTML = "";
  pageOrder = [];

  for (let i = 1; i <= loadedPDF.numPages; i++) {
    const page = await loadedPDF.getPage(i);
    const viewport = page.getViewport({ scale: 0.3 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    const item = document.createElement("div");
    item.className = "thumb-item";
    item.draggable = true;
    item.dataset.page = i;

    item.innerHTML = `<img src="${canvas.toDataURL()}"><span>Page ${i}</span>`;
    grid.appendChild(item);
    pageOrder.push(i);

    enableDragging(item);
  }

  document.getElementById("organizeBtn").style.display = "block";
});

function enableDragging(item) {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    updateOrder();
  });

  document.getElementById("thumbGrid").addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const grid = document.getElementById("thumbGrid");
    const items = [...grid.querySelectorAll(".thumb-item:not(.dragging)")];

    let nearest = items[0];
    let minDist = Infinity;

    items.forEach((el) => {
      const box = el.getBoundingClientRect();
      const dist = Math.abs(e.clientY - box.top);
      if (dist < minDist) {
        minDist = dist;
        nearest = el;
      }
    });

    grid.insertBefore(dragging, nearest);
  });
}

function updateOrder() {
  pageOrder = [...document.querySelectorAll(".thumb-item")].map(
    (item) => Number(item.dataset.page)
  );
}

document.getElementById("organizeBtn").addEventListener("click", async () => {
  if (pageOrder.length === 0) return;

  const formData = new FormData();
  formData.append("file", document.getElementById("pdfFile").files[0]);
  formData.append("order", pageOrder.join(","));

  const res = await fetch("https://api.srjahir.in/organize-pdf", {
    method: "POST",
    body: formData,
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Organized_File.pdf";
  a.click();
});
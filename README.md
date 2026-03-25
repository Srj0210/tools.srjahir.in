# SRJ Tools — Free Online PDF Toolkit

**Website:** [tools.srjahir.in](https://tools.srjahir.in)  
**Built by:** [SRJahir Tech](https://srjahir.in)  
**Status:** Live & Active  
**License:** Proprietary — All rights reserved by SRJahir Tech

---

## What Is This?

SRJ Tools is a free, browser-based PDF toolkit that lets anyone convert, merge, split, compress, protect, sign, and edit PDF files online. No account needed, no watermarks, no file limits.

It's a static frontend hosted on GitHub Pages, connected to a backend API at `api.srjahir.in` for server-side processing tasks.

---

## Live Site

- **Homepage:** https://tools.srjahir.in
- **Blog & Guides:** https://tools.srjahir.in/blog/
- **API Backend:** https://api.srjahir.in ([source code](https://github.com/Srj0210/api.srjahir.in))

---

## Tools Available (19 Total)

### 📂 Organize PDF
| Tool | File | Description |
|------|------|-------------|
| Merge PDF | `mergepdf.html` | Combine multiple PDF files into one |
| Split PDF | `splitpdf.html` | Extract selected pages with visual preview |
| Remove Pages | `removepages.html` | Delete unwanted pages from a PDF |
| Organize PDF | `organizepdf.html` | Drag-and-drop page reordering |

### ⚙️ Optimize PDF
| Tool | File | Description |
|------|------|-------------|
| Compress PDF | `compresspdf.html` | Reduce file size without quality loss |
| Repair PDF | `repairpdf.html` | Fix corrupted or damaged PDFs |
| OCR PDF | `ocrpdf.html` | Extract text from scanned documents |

### 🔄 Convert To PDF
| Tool | File | Description |
|------|------|-------------|
| Word to PDF | `wordtopdf.html` | Convert .doc/.docx to PDF |
| Excel to PDF | `exceltopdf.html` | Convert .xls/.xlsx to PDF |
| HTML to PDF | `htmltopdf.html` | Convert web pages or HTML files to PDF |

### 📤 Convert From PDF
| Tool | File | Description |
|------|------|-------------|
| PDF to Word | `pdftoword.html` | Convert PDF to editable .docx |
| PDF to Excel | `pdftoexcel.html` | Extract tables from PDF to .xlsx |
| PDF to JPG | `pdftoimage.html` | Convert PDF pages to image files |

### ✏️ Edit PDF
| Tool | File | Description |
|------|------|-------------|
| Rotate PDF | `rotatepdf.html` | Rotate pages 90°/180°/270° |
| Add Watermark | `addwatermark.html` | Add text or image watermark |
| Sign PDF | `signpdf.html` | Add digital signature with live preview |

### 🔐 PDF Security
| Tool | File | Description |
|------|------|-------------|
| Protect PDF | `protectpdf.html` | Lock PDF with password encryption |
| Unlock PDF | `unlockpdf.html` | Remove password from protected PDFs |

---

## Project Structure

```
tools.srjahir.in/
├── index.html              # Homepage with all tools listed
├── style.css               # Global stylesheet (CloudAI Blue theme)
├── animation.js            # Wave canvas animation
├── script.js               # Shared conversion logic
├── ga.js                   # Google Analytics (GA4)
├── manifest.json           # PWA manifest
├── robots.txt              # Search engine directives
├── sitemap.xml             # Full sitemap (35+ URLs)
├── CNAME                   # GitHub Pages custom domain
├── tools.png               # Site logo / favicon
│
├── about.html              # About SRJ Tools
├── contact.html            # Contact page
├── privacy.html            # Privacy Policy
├── terms.html              # Terms & Conditions
│
├── mergepdf.html           # Tool pages (19 total)
├── splitpdf.html
├── removepages.html
├── organizepdf.html
├── compresspdf.html
├── repairpdf.html
├── ocrpdf.html
├── wordtopdf.html
├── exceltopdf.html
├── htmltopdf.html
├── pdftoword.html
├── pdftoexcel.html
├── pdftoimage.html
├── rotatepdf.html
├── addwatermark.html
├── signpdf.html
├── protectpdf.html
├── unlockpdf.html
│
├── blog/                   # Blog & how-to guides
│   ├── index.html
│   ├── how-to-merge-pdf-online-free.html
│   ├── how-to-convert-word-to-pdf.html
│   ├── how-to-compress-pdf-without-losing-quality.html
│   ├── how-to-split-pdf-pages.html
│   ├── how-to-protect-pdf-with-password.html
│   ├── how-to-convert-pdf-to-word.html
│   ├── how-to-remove-pages-from-pdf.html
│   ├── pdf-file-management-tips.html
│   ├── best-free-online-pdf-tools-2026.html
│   └── ocr-pdf-guide.html
│
├── assets/                 # Logo layers
│   ├── cloud.png
│   ├── gear-ring.png
│   └── code-center.png
│
├── positioner.html         # [DEV] Logo positioning tool (blocked in robots.txt)
└── logo.html               # [DEV] Logo preview (blocked in robots.txt)
```

---

## Tech Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks)
- **Styling:** Custom CSS with CloudAI Blue Gradient theme
- **PDF Processing (client-side):** [PDF.js](https://mozilla.github.io/pdf.js/) for thumbnails, previews, and page manipulation
- **PDF Processing (server-side):** Backend API at `api.srjahir.in` handles conversions, merging, compression, OCR, etc.
- **Hosting:** GitHub Pages with custom domain via CNAME
- **Analytics:** Google Analytics 4 (GA4)
- **PWA:** Basic manifest for installability

---

## How the Backend Works

The frontend talks to a separate backend API hosted at `api.srjahir.in`. The backend is a Python Flask app running inside a Docker container on Render. Source code: [github.com/Srj0210/api.srjahir.in](https://github.com/Srj0210/api.srjahir.in)

Tools that require server processing (Word→PDF, Merge, Compress, OCR, etc.) send files to the API via `POST` requests with `FormData`. The API processes the file using the appropriate engine and returns a blob for download.

### Architecture

```
tools.srjahir.in (Static Frontend — GitHub Pages)
        ↓ POST request with file
api.srjahir.in (Flask API — Docker on Render)
        ↓ Processes file using:
        │  • LibreOffice (Word/Excel conversion)
        │  • Ghostscript + pikepdf (compression)
        │  • Ghostscript + QPDF (repair)
        │  • Tesseract OCR (text extraction)
        │  • PyPDF2 (merge, split, rotate, protect)
        │  • ReportLab (watermark, signature)
        ↓
Returns processed file → auto-deletes both files
```

### Backend Tech Stack

| Component | Technology |
|-----------|-----------|
| Language | Python 3.11 |
| Framework | Flask 3.0 + Gunicorn |
| PDF Engine | PyPDF2, pikepdf, pdfminer.six, pypdfium2 |
| Doc Conversion | LibreOffice headless |
| OCR | Tesseract (English + Gujarati) |
| Compression | Ghostscript (primary) + pikepdf (fallback) |
| Container | Docker on Render |

**API base URL:** `https://api.srjahir.in`

**Key endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/word-to-pdf` | POST | Convert .docx to PDF (LibreOffice) |
| `/pdf-to-word` | POST | Convert PDF to .docx (pdf2docx) |
| `/merge-pdf` | POST | Merge multiple PDFs (PyPDF2) |
| `/split-pdf` | POST | Extract selected pages |
| `/remove-pages` | POST | Delete specific pages |
| `/organize-pdf` | POST | Reorder pages by index |
| `/compress-pdf` | POST | Compress PDF (Ghostscript) |
| `/repair-pdf` | POST | Fix corrupted PDFs (Ghostscript + QPDF) |
| `/ocr-pdf` | POST | OCR scanned PDF (Tesseract) |
| `/excel-to-pdf` | POST | Convert Excel to PDF (LibreOffice) |
| `/pdf-to-excel` | POST | Extract tables to Excel (pdfplumber + OCR fallback) |
| `/pdf-to-image` | POST | Convert pages to JPG ZIP (pypdfium2) |
| `/rotate-pdf` | POST | Rotate pages 90/180/270° |
| `/add-watermark` | POST | Add text or image watermark (ReportLab) |
| `/sign-pdf` | POST | Add digital signature overlay |
| `/protect-pdf` | POST | Encrypt PDF with password (AES-128) |
| `/unlock-pdf` | POST | Remove PDF password |

All file transfers happen over HTTPS. Files are automatically deleted after processing via Flask's `@after_this_request` cleanup.

---

## SEO & Discoverability

Every page includes:
- Descriptive `<title>` and `<meta description>` tags
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD) — WebSite, FAQPage, Article schemas
- Internal linking between related tools
- Blog content targeting long-tail keywords

**Sitemap:** `sitemap.xml` (35+ URLs with `lastmod` and `priority`)  
**Robots:** `robots.txt` blocks dev tools (`positioner.html`, `logo.html`) and internal paths

---

## Security Considerations

- All file uploads are via HTTPS
- Server-side files are auto-deleted post-processing
- No user accounts or personal data collected
- Client-side tools (Rotate, Organize) never upload files — processing happens in the browser
- `robots.txt` blocks access to dev/internal pages
- Password protection uses standard PDF encryption

---

## Blog & Content

The `/blog/` section contains 10 how-to articles targeting common PDF-related search queries:

1. How to Merge PDF Files Online for Free
2. How to Convert Word to PDF — The Complete Guide
3. How to Compress a PDF Without Losing Quality
4. How to Split PDF Pages — Extract What You Need
5. How to Password-Protect a PDF File
6. How to Convert PDF to Word (Editable DOCX)
7. How to Remove Pages from a PDF
8. 10 PDF File Management Tips Everyone Should Know
9. Best Free Online PDF Tools in 2026
10. What is OCR? How to Extract Text from Scanned PDFs

Each article includes internal links to relevant tools, a CTA button, structured data markup, and human-readable content (no AI-sounding filler).

---

## Deployment

This is a static site deployed via **GitHub Pages**.

1. Push to the `main` branch
2. GitHub Pages builds and serves from root
3. Custom domain (`tools.srjahir.in`) configured via `CNAME` file and DNS

No build step required. No dependencies to install. Just HTML, CSS, and JS.

---

## Related Projects

| Project | URL | Description |
|---------|-----|-------------|
| SRJ Tools | [tools.srjahir.in](https://tools.srjahir.in) | Free PDF toolkit (this repo) |
| SRJ Tools API | [github.com/Srj0210/api.srjahir.in](https://github.com/Srj0210/api.srjahir.in) | Backend API (Flask + Docker on Render) |
| SRJ Stocks | [stocks.srjahir.in](https://stocks.srjahir.in) | Stock market learning platform |
| CloudAI | [cloudai.srjahir.in](https://cloudai.srjahir.in) | AI chat assistant |
| SRJahir Main | [srjahir.in](https://srjahir.in) | Personal/portfolio site |

---

## Contributing

This is a personal project by SRJahir Tech. If you find bugs or have suggestions, open an issue on the GitHub repo or reach out via the [Contact page](https://tools.srjahir.in/contact.html).

---

## Changelog (March 2026 Update)

### Added
- About page (`about.html`)
- Privacy Policy page (`privacy.html`)
- Terms & Conditions page (`terms.html`)
- Contact page (`contact.html`)
- Blog section with 10 how-to articles (`blog/`)
- Sign PDF tool added to homepage
- Info/instruction sections added to 9 tool pages that were missing them
- Navigation footer on all pages

### Fixed
- `sitemap.xml` — added all new pages, `lastmod` dates, and priority values
- `robots.txt` — blocked dev tools (`positioner.html`, `logo.html`)
- Sign PDF (`signpdf.html`) was missing from homepage and sitemap
- Internal linking added across all tool pages and blog posts

### Security
- Dev/internal pages blocked from search indexing
- All pages now have proper canonical URLs
- File handling documented in privacy policy

---

**Built with care by SRJahir Tech. No nonsense, just tools.**

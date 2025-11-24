// ========== Smart File Converter JS ==========
// Supports: Image->PDF, Image->Text (OCR), PDF Edit, PDF->Image
// Paid plan placeholders included

// Include libraries in index.html:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/dist/tesseract.min.js"></script>
// <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>

const fileInput = document.getElementById('fileInput');
const convertBtn = document.getElementById('convertBtn');
const outputType = document.getElementById('outputType');

convertBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) { alert('Please select a file'); return; }

    const type = outputType.value;

    if (type === 'imageToPDF') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            const doc = new jspdf.jsPDF();
            doc.addImage(imgData, 'JPEG', 10, 10, 180, 0);
            doc.save('converted.pdf');
        };
        reader.readAsDataURL(file);
    } else if (type === 'imageToText') {
        Tesseract.recognize(file, 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                const blob = new Blob([text], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'converted.txt';
                link.click();
            });
    } else if (type === 'pdfEdit') {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const arrayBuffer = e.target.result;
            const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            // Example: remove last page (editable)
            const pageCount = pdfDoc.getPageCount();
            pdfDoc.removePage(pageCount - 1);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'edited.pdf';
            link.click();
        };
        reader.readAsArrayBuffer(file);
    } else if (type === 'pdfToImage') {
        alert('PDF to Image conversion is under development for future update (paid feature possible)');
        // Placeholder for paid feature integration
    } else {
        alert('Unsupported conversion type');
    }
});

// ========== Paid Plan Placeholder ==========
// Example: limit free users to 3 conversions/day
// For paid users, unlock unlimited conversions and higher quality

let userPlan = 'free'; // or 'paid'
const maxFreeConversions = 3;
let conversionsToday = 0;

function checkPlan() {
    if (userPlan === 'free' && conversionsToday >= maxFreeConversions) {
        alert('Upgrade to premium for unlimited conversions and high-quality output');
        return false;
    }
    conversionsToday++;
    return true;
}

document.getElementById('convertBtn').addEventListener('click', convertToPDF);

function convertToPDF() {
  const files = document.getElementById('upload-file').files;

  if (files.length === 0) {
    alert('Please select at least one image file.');
    return;
  }

  const pdf = new jsPDF();

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      const imgData = reader.result;
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      if (index < files.length - 1) {
        pdf.addPage();
      } else {
        const pdfName = 'converted.pdf';
        pdf.save(pdfName);
        displayDownloadLink(pdfName);
      }
    };
    reader.readAsDataURL(file);
  });
}

function displayDownloadLink(filename) {
  const outputDiv = document.getElementById('output');
  const link = document.createElement('a');
  link.setAttribute('class', 'pdf-link');
  link.href = filename;
  link.innerHTML = 'Download PDF';
  outputDiv.appendChild(link);
}

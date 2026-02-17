import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import starTrekIpsum from 'star-trek-ipsum';

const PDFDemo: React.FC = () => {
  const [numLines, setNumLines] = useState(5);

  const wrapText = (text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] => {
    const words = text.split(' ');
    let line = '';
    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    return lines;
  };

  const createPdf = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const lineHeight = fontSize * 1.5;
    const margin = 50;
    const maxWidth = width - 2 * margin;

    // Generate unique ipsums for each line
    const ipsums = Array.from({ length: numLines }, () => starTrekIpsum({ unit: 'lines', value: 1 }));

    // Draw title
    page.drawText('Star Trek Ipsum PDF', {
      x: margin,
      y: height - margin,
      size: 24,
      font,
      color: rgb(0, 0.53, 0.71),
    });

    let y = height - margin - 30;

    for (let i = 0; i < ipsums.length; i++) {
      const text = `${i + 1}. ${ipsums[i]}`;
      const wrappedLines = wrapText(text, font, fontSize, maxWidth);

      for (const line of wrappedLines) {
        if (y < margin) {
          page = pdfDoc.addPage();
          y = height - margin;
        }
        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      }
      y -= lineHeight * 0.5; // Add a little extra space between ipsums
    }

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    // Trigger the download
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'star-trek-ipsum.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <section className="container" style={{ padding: 20 }}>
      <h2>PDF Generation Demo</h2>
      <p>Enter the number of lines of Star Trek ipsum text you want to generate.</p>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="numLines">Number of Lines:</label>
        <input
          type="number"
          id="numLines"
          value={numLines}
          onChange={(e) => setNumLines(parseInt(e.target.value, 10))}
          min="1"
          style={{ marginLeft: 10, width: 60 }}
        />
      </div>
      <button onClick={createPdf} className="btn">
        Generate PDF
      </button>
    </section>
  );
};

export default PDFDemo;

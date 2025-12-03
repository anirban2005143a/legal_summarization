import jsPDF from "jspdf";
import { showToast } from "./ShowToast";

export const handleDownload = ({ data, textContent, textContentRef }) => {
  try {
    const doc = new jsPDF();
    const content =
    textContent ||
    textContentRef.current?.innerText?.trim() ||
    "";

    const title = data.title?.trim() || "Untitled";
    if (!content) return;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const titleLines = doc.splitTextToSize(title, 190);
    let titleY = 20;
    titleLines.forEach((line) => {
      doc.text(line, 10, titleY);
      titleY += 10; // spacing between title lines
    });

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 7;
    const maxY = pageHeight - 20;

    let y = titleY + 5; // Add small spacing after title block
    const lines = doc.splitTextToSize(content, 190);

    lines.forEach((line) => {
      if (y > maxY) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += lineHeight;
    });

    doc.save(`${title}.pdf`);
  } catch (error) {
    console.log(error);
    showToast(error.message || "Download failed", 1);
  }
};

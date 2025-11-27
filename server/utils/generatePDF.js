import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateAdmissionPDF = (data) => {
  // Ensure uploads directory exists
  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const doc = new PDFDocument();
  const filename = `admission_${Date.now()}.pdf`;
  const filePath = path.join(uploadsDir, filename);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Arihant Coaching Classes", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text("Admission Confirmation Receipt", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(12).text(`Student Name: ${data.studentName}`);
  doc.text(`Class: ${data.standard}`);
  doc.text(`Medium: ${data.medium}`);
  doc.text(`Contact: ${data.contact}`);
  doc.text(`Email: ${data.email}`);
  doc.text(`Payment ID: ${data.paymentId}`);
  doc.text(`Status: ${data.paymentStatus}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);

  doc.end();
  return `/uploads/${filename}`;
};

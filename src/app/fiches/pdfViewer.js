"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./pdfViewer.module.css";

// Configuration du worker pour pdf.js
pdfjs.GlobalWorkerOptions.disableWorker = true;

export default function PdfViewer({ base64Data }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);

  useEffect(() => {
    if (base64Data) {
      // Création de la data URI pour le PDF
      const dataURI = `data:application/pdf;base64,${base64Data}`;
      setPdfDataUrl(dataURI);
    }
  }, [base64Data]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Réinitialiser à la première page
  }

  const previousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };
  console.log("pdfdataurl", pdfDataUrl);

  return (
    <div className={styles.pdfViewerSection}>
      {pdfDataUrl && (
        <Document file={pdfDataUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      {numPages && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={previousPage} disabled={pageNumber <= 1}>
            Page Précédente
          </button>
          <button onClick={nextPage} disabled={pageNumber >= numPages}>
            Page Suivante
          </button>
          <p>
            Page {pageNumber} sur {numPages}
          </p>
        </div>
      )}
    </div>
  );
}

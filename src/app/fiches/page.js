"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./page.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Arborescence from "./arborescence";
import PdfViewer from "./pdfViewer";
import { useState } from "react";

export default function Fiches() {
  const [selectedFileForViewing, setSelectedFileForViewing] = useState(null);
  console.log(selectedFileForViewing);
  return (
    <div id={styles.fichesPage}>
      <Header />
      <div className={styles.bodyFichesAnalysePage}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.arborescence}>
            <Arborescence
              setSelectedFileForViewing={(file) =>
                setSelectedFileForViewing(file.file)
              }
            />
          </div>
        </DndProvider>
        <div className={styles.filesPdfViewerSection}>
          {selectedFileForViewing !== null ? (
            <PdfViewer fileBase64={selectedFileForViewing.file} />
          ) : (
            <p>Veuillez sélectionner un fichier à visualiser</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./page.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Arborescence from "./arborescence";

export default function Fiches() {
  return (
    <div id={styles.fichesPage}>
      <Header />
      <div className={styles.bodyFichesAnalysepage}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.arborescence}>
            <Arborescence />
          </div>
        </DndProvider>
        <div className={styles.filesPdfViewerSection}>
          <h2>PDF viewer</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import styles from "./arborescence.module.css";
import { getAllFolders, getFolderChildren } from "../lib/db";

export default function Arborescence() {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  console.log(expandedFolders);

  useEffect(() => {
    async function fetchData() {
      try {
        const allFolders = await getAllFolders();
        setFolders(allFolders);
      } catch (err) {
        console.error("Erreur lors de la récupération des dossiers :", err);
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  const toggleFolder = async (folderId) => {
    if (expandedFolders[folderId]) {
      setExpandedFolders({ ...expandedFolders, [folderId]: false });
    } else {
      try {
        const children = await getFolderChildren(folderId);
        setExpandedFolders({
          ...expandedFolders,
          [folderId]: children,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération des dossiers :", err);
        setError(err.message);
      }
    }
  };

  const renderFolder = (folder) => {
    const hasChildren = expandedFolders[folder.id];
    return (
      <div key={folder.id} className={styles.folderItem}>
        <div
          onClick={() => toggleFolder(folder.id)}
          className={styles.folderName}
        >
          {folder.name}
        </div>
        {hasChildren && (
          <div className={styles.children}>
            {hasChildren.folders.map((childFolder) =>
              renderFolder(childFolder)
            )}
            {hasChildren.files.map((file) => (
              <div key={file.id} className={styles.childFile}>
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={styles.filesArborescenceSection}>
      <h2>Gestion files/folders</h2>
      <span className="material-symbols-outlined">settings</span>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.folderTree}>
        {folders.length > 0 &&
          folders
            .filter((item) => item.parentId === null)
            .map((item) => renderFolder(item))}
      </div>
    </section>
  );
}

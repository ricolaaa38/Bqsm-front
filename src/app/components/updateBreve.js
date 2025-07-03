"use client";

import { useState } from "react";
import { useData } from "../context/DataContext";
import {
  updateBreveById,
  addPictureForBreve,
  addIntervenantForBreve,
} from "../lib/db";
import {
  getIconByContributeur,
  getIconByIntervenant,
} from "../lib/iconSelector";
import styles from "./updateBreve.module.css";
import Image from "next/image";
import { getNames } from "country-list";

export default function UpdateBreveSection({
  brevePreviousInfo,
  previousPictures,
  previousIntervenants,
  previousContributeurs,
}) {
  const countryNames = getNames();
  const { setNeedRefresh, filters } = useData();
  const [showAddNewPictureForm, setShowAddNewPictureForm] = useState(false);
  const [showAddNewIntervenantForm, setShowAddNewIntervenantForm] =
    useState(false);
  const [showAddNewContributeurForm, setShowAddNewContributeurForm] =
    useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [breveInfo, setBreveInfo] = useState({
    bqsmNumb: brevePreviousInfo.bqsmNumb,
    categorie: brevePreviousInfo.categorie,
    contenu: brevePreviousInfo.contenu,
    date: brevePreviousInfo.date.slice(0, 10),
    id: brevePreviousInfo.id,
    latitude: brevePreviousInfo.latitude,
    longitude: brevePreviousInfo.longitude,
    pays: brevePreviousInfo.pays,
    titre: brevePreviousInfo.titre,
    zone: brevePreviousInfo.zone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBreveInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBreveUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateBreveById(breveInfo.id, breveInfo);
      if (result) {
        setNeedRefresh((prev) => !prev);
      } else {
        console.error("La mise à jour a échoué");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la brève !!!",
        error.message
      );
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setImageFileName(selectedFile.name);
    }
  };
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !imageFileName) {
      alert("Merci de choisir un fichier !!!");
      return;
    }
    try {
      const result = await addPictureForBreve(
        imageFileName,
        brevePreviousInfo.id,
        imageFile
      );
      setNeedRefresh((prev) => !prev);
    } catch (error) {
      console.error("erreur lors de l'envoi de l'image :", error.message);
    }
  };

  return (
    <section className={styles.updateBreveInfoSection}>
      <form onSubmit={handleBreveUpdateSubmit}>
        <div className={styles.formRow}>
          <div>
            <label htmlFor="bqsmNumb">BQSM-num</label>
            <input
              type="text"
              name="bqsmNumb"
              value={breveInfo.bqsmNumb}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              value={breveInfo.date.slice(0, 10)}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div>
            <label htmlFor="titre">Titre</label>
            <input
              type="text"
              name="titre"
              value={breveInfo.titre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="categorie">Catégorie</label>
            <select
              name="categorie"
              value={breveInfo.categorie}
              onChange={handleChange}
            >
              <option value="">-- Choisir une catégorie --</option>
              {filters
                .filter((liste) => liste.categorie === "categorie")
                .map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={styles.formRow}>
          <div>
            <label htmlFor="zone">Zone</label>
            <select name="zone" value={breveInfo.zone} onChange={handleChange}>
              <option value="">-- Choisir une zone --</option>
              {filters
                .filter((liste) => liste.categorie === "zone")
                .map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="pays">Pays</label>
            <select name="pays" value={breveInfo.pays} onChange={handleChange}>
              <option value="">-- Sélectionner un pays --</option>
              {countryNames.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formRow}>
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={breveInfo.latitude}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={breveInfo.longitude}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.formTextArea}>
          <label htmlFor="contenu">Compte-rendu</label>
          <textarea
            name="contenu"
            value={breveInfo.contenu}
            onChange={handleChange}
          />
        </div>
        <button type="submit">modifier</button>
      </form>
      <div className={styles.updateBrevePictures}>
        {!showAddNewPictureForm ? (
          <div
            className={`${styles.pictureCard} ${styles.openAddNewPictureForm}`}
            onClick={() => setShowAddNewPictureForm(!showAddNewPictureForm)}
          >
            <span
              className="material-symbols-outlined"
              title="ajouter une nouvelle image"
            >
              add
            </span>
          </div>
        ) : (
          <div
            className={`${styles.pictureCard} ${styles.addNewPictureFormDiv}`}
          >
            <button
              className={styles.closeAddNewPictureFormBtn}
              onClick={() => setShowAddNewPictureForm(!showAddNewPictureForm)}
              title="fermer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <form onSubmit={handleImageSubmit}>
              <input type="file" onChange={handleImageChange} />
              <button type="submit">envoyer</button>
            </form>
          </div>
        )}
        {previousPictures.length > 0 &&
          previousPictures.map((picture, index) => (
            <div key={index} className={styles.pictureCard}>
              <img
                src={`data:image/jpeg;base64,${picture.base64}`}
                alt={picture.name || "photo"}
              />
            </div>
          ))}
      </div>
      <h4>Intervenants :</h4>
      <div className={styles.updateIntervenants}>
        {!showAddNewIntervenantForm ? (
          <div
            className={`${styles.intervenantCard} ${styles.openAddNewIntervenantForm}`}
            onClick={() =>
              setShowAddNewIntervenantForm(!showAddNewIntervenantForm)
            }
          >
            <span
              className="material-symbols-outlined"
              title="ajouter une nouvelle image"
            >
              add
            </span>
          </div>
        ) : (
          <div className={`${styles.intervenantCard}`}>test</div>
        )}
        {previousIntervenants.length > 0 &&
          previousIntervenants.map((item, index) => (
            <div
              className={`${styles.intervenantCard} ${styles.intervenantLogo}`}
              key={item.name + item.id + index}
            >
              <Image
                src={getIconByIntervenant(item.name)}
                alt={item.name}
                title={item.name}
                width={90}
                height={90}
              />
            </div>
          ))}
      </div>
      <h4>Contributeurs :</h4>
      <div className={styles.updateContributeurs}>
        {!showAddNewContributeurForm ? (
          <div
            className={`${styles.contributeurCard} ${styles.openAddNewContributeurForm}`}
            onClick={() =>
              setShowAddNewContributeurForm(!showAddNewContributeurForm)
            }
          >
            <span
              className="material-symbols-outlined"
              title="ajouter une nouvelle image"
            >
              add
            </span>
          </div>
        ) : (
          <div className={`${styles.contributeurCard}`}>test</div>
        )}
        {previousContributeurs.length > 0 &&
          previousContributeurs.map((item, index) => (
            <div
              className={`${styles.contributeurCard} ${styles.contributeurLogo}`}
              key={item.name + item.id + index}
            >
              <Image
                src={getIconByContributeur(item.name)}
                alt={item.name}
                title={item.name}
                width={90}
                height={90}
              />
            </div>
          ))}
      </div>
    </section>
  );
}

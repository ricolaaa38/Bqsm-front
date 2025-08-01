"use client";

import { useState } from "react";
import { useData } from "../context/DataContext";
import { addNewBreve } from "../lib/db";
import styles from "./addANewBreve.module.css";
import { getNames } from "country-list";

export default function AddANewBreveSection({ handleClose }) {
  const countryNames = getNames();
  const { setNeedRefresh, filters } = useData();
  const [breveInfo, setBreveInfo] = useState({
    bqsmNumb: "",
    categorie: "",
    contenu: "",
    date: "",
    id: "",
    latitude: "",
    longitude: "",
    pays: "",
    titre: "",
    zone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBreveInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBreveSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addNewBreve(breveInfo);
      if (result) {
        setNeedRefresh((prev) => !prev);
      } else {
        console.error("L'ajout de la brève a échoué !!!");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la brève !!!", error.message);
    }
  };

  return (
    <section className={styles.addBreveSection}>
      <div className={styles.addBreveDiv}>
        <div className={styles.addBreveTitle}>
          <h2>Ajouter une nouvelle brève</h2>
          <span
            onClick={handleClose}
            className="material-symbols-outlined"
            title="Fermer"
          >
            close
          </span>
        </div>
        <form onSubmit={handleBreveSubmit}>
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
              <select
                name="zone"
                value={breveInfo.zone}
                onChange={handleChange}
              >
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
              <select
                name="pays"
                value={breveInfo.pays}
                onChange={handleChange}
              >
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
          <button type="submit">ajouter</button>
        </form>
      </div>
    </section>
  );
}

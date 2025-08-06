"use client";

import { useState } from "react";
import { useData } from "../context/DataContext";
import {
  updateBreveById,
  addPictureForBreve,
  addIntervenantForBreve,
  addContributeurForBreve,
  addLinkForBreve,
  deleteContributeur,
  deleteIntervenant,
  deletePicture,
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
  previousLinks,
}) {
  const countryNames = getNames();
  const { setNeedRefresh, filters } = useData();
  const [showAddNewLinkForm, setShowAddNewLinkForm] = useState(false);
  const [showAddNewPictureForm, setShowAddNewPictureForm] = useState(false);
  const [showAddNewIntervenantForm, setShowAddNewIntervenantForm] =
    useState(false);
  const [showAddNewContributeurForm, setShowAddNewContributeurForm] =
    useState(false);
  const [hoveredIntervenant, setHoveredIntervenant] = useState(null);
  const [hoveredContributeur, setHoveredContributeur] = useState(null);
  const [hoveredPicture, setHoveredPicture] = useState(null);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [intervenantName, setIntervenantName] = useState("");
  const [contributeurName, setContributeurName] = useState("");
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

  const handleDeletePicture = async (pictureId) => {
    try {
      await deletePicture(pictureId);
      setNeedRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error);
    }
  };

  const handleIntervenantChange = (e) => {
    setIntervenantName(e.target.value);
  };

  const handleIntervenantSubmit = async (e) => {
    e.preventDefault();
    if (!intervenantName) {
      alert("Merci de choisir un intervenant !!!");
      return;
    }
    try {
      await addIntervenantForBreve(brevePreviousInfo.id, intervenantName);
      setNeedRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'intervenant :", error);
    }
  };

  const handleDeleteIntervenant = async (intervenantId) => {
    try {
      await deleteIntervenant(intervenantId);
      setNeedRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'intervenant :", error);
    }
  };

  const handleContributeurChange = (e) => {
    setContributeurName(e.target.value);
  };

  const handleContributeurSubmit = async (e) => {
    e.preventDefault();
    if (!contributeurName) {
      alert("Merci de choisir un contributeur !!!");
      return;
    }
    try {
      await addContributeurForBreve(brevePreviousInfo.id, contributeurName);
      setNeedRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de l'ajout du contributeur :", error);
    }
  };

  const handleDeleteContributeur = async (contributeurId) => {
    try {
      await deleteContributeur(contributeurId);
      setNeedRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la suppression du contributeur :", error);
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!linkName || !linkUrl) {
      alert("Merci de remplir tous les champs !");
      return;
    }
    try {
      await addLinkForBreve(brevePreviousInfo.id, {
        name: linkName,
        link: linkUrl,
      });
      setNeedRefresh((prev) => !prev);
      setLinkName("");
      setLinkUrl("");
      setShowAddNewLinkForm(false);
    } catch (error) {
      alert(error.message || "Erreur lors de l'ajout du lien");
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

      <div className={styles.updateBreveLinks}>
        <div className={styles.updateBreveLinksHeader}>
          <h4>Liens :</h4>
          <div className={`${styles.linkFormCard}`}>
            <form onSubmit={handleLinkSubmit}>
              <input
                type="text"
                placeholder="Nom du lien"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="URL du lien"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
              />
              <button type="submit">Ajouter</button>
            </form>
          </div>
        </div>
        <div className={styles.updateBreveBodyLink}>
          {previousLinks.length > 0 ? (
            previousLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                title={`lien vers ${link.name}`}
              >
                <span className="material-symbols-outlined">link</span>
                {link.name}
              </a>
            ))
          ) : (
            <p>Aucun lien disponible</p>
          )}
        </div>
      </div>

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
            <div
              key={index}
              className={styles.pictureCard}
              onMouseEnter={() => setHoveredPicture(picture.id)}
              onMouseLeave={() => setHoveredPicture(null)}
            >
              <img
                src={`data:image/jpeg;base64,${picture.base64}`}
                alt={picture.name || "photo"}
              />
              {hoveredPicture === picture.id && (
                <button
                  className={styles.deletePictureBtn}
                  onClick={() => handleDeletePicture(picture.id)}
                  title="Supprimer l'image"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}
            </div>
          ))}
      </div>
      <h4>Intervenants :</h4>
      <div className={styles.updateIntervenants}>
        {!showAddNewIntervenantForm ? (
          <div
            className={`${styles.intervenantCard} ${styles.openAddNewIntervenantForm} ${styles.addNewIntervenantIcon}`}
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
          <div
            className={`${styles.intervenantCard} ${styles.openAddNewIntervenantForm}`}
          >
            <button
              className={styles.closeAddNewIntervenantFormBtn}
              onClick={() =>
                setShowAddNewIntervenantForm(!showAddNewIntervenantForm)
              }
              title="fermer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <form onSubmit={handleIntervenantSubmit}>
              <select name="intervenant" onChange={handleIntervenantChange}>
                <option value="">Catégorie</option>
                {filters
                  .filter((liste) => liste.categorie === "intervenant")
                  .map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <button type="submit">ajouter</button>
            </form>
          </div>
        )}
        {previousIntervenants.length > 0 &&
          previousIntervenants.map((item, index) => (
            <div
              className={`${styles.intervenantCard} ${styles.intervenantLogo}`}
              key={item.name + item.id + index}
              onMouseEnter={() => setHoveredIntervenant(item.id)}
              onMouseLeave={() => setHoveredIntervenant(null)}
            >
              <Image
                src={getIconByIntervenant(item.name)}
                alt={item.name}
                title={item.name}
                width={90}
                height={90}
              />
              {hoveredIntervenant === item.id && (
                <button
                  className={styles.deleteIntervenantBtn}
                  onClick={() => handleDeleteIntervenant(item.id)}
                  title="Supprimer l'intervenant"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}
            </div>
          ))}
      </div>
      <h4>Contributeurs :</h4>
      <div className={styles.updateContributeurs}>
        {!showAddNewContributeurForm ? (
          <div
            className={`${styles.contributeurCard} ${styles.openAddNewContributeurForm} ${styles.addNewContributeurIcon}`}
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
          <div
            className={`${styles.contributeurCard} ${styles.openAddNewContributeurForm}`}
          >
            <button
              className={styles.closeAddNewContributeurFormBtn}
              onClick={() =>
                setShowAddNewContributeurForm(!showAddNewContributeurForm)
              }
              title="fermer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <form onSubmit={handleContributeurSubmit}>
              <select name="contributeur" onChange={handleContributeurChange}>
                <option value="">Catégorie</option>
                {filters
                  .filter((liste) => liste.categorie === "contributeur")
                  .map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <button type="submit">ajouter</button>
            </form>
          </div>
        )}
        {previousContributeurs.length > 0 &&
          previousContributeurs.map((item, index) => (
            <div
              className={`${styles.contributeurCard} ${styles.contributeurLogo}`}
              key={item.name + item.id + index}
              onMouseEnter={() => setHoveredContributeur(item.id)}
              onMouseLeave={() => setHoveredContributeur(null)}
            >
              <Image
                src={getIconByContributeur(item.name)}
                alt={item.name}
                title={item.name}
                width={90}
                height={90}
              />
              {hoveredContributeur === item.id && (
                <button
                  className={styles.deleteContributeurBtn}
                  onClick={() => handleDeleteContributeur(item.id)}
                  title="Supprimer le contributeur"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import {
  getContributeursByBreveId,
  getIntervenantsByBreveId,
  getPicturesByBreveId,
} from "../lib/db";
import {
  getIconByCategorie,
  getIconByIntervenant,
  getIconByContributeur,
} from "../lib/iconSelector";
import styles from "./breveDetails.module.css";
import Image from "next/image";

export default function BreveDetails({
  breve,
  closeBreveDetails,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  if (!breve) return null;

  const { userRole } = useData();
  const [pictures, setPictures] = useState([]);
  const [current, setCurrent] = useState(0);
  const [intervenants, setIntervenants] = useState([]);
  const [contributeurs, setContributeurs] = useState([]);

  function nextPic() {
    setCurrent((c) => (c < pictures.length - 1 ? c + 1 : 0));
  }
  function prevPic() {
    setCurrent((c) => (c > 0 ? c - 1 : pictures.length - 1));
  }

  useEffect(() => {
    if (breve?.id) {
      getIntervenantsByBreveId(breve.id).then(setIntervenants);
      getContributeursByBreveId(breve.id).then(setContributeurs);
      getPicturesByBreveId(breve.id).then(setPictures);
      setCurrent(0);
    }
  }, [breve]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalNav}>
          <div>
            <button onClick={onPrev} disabled={!hasPrev} title="précédent">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button onClick={onNext} disabled={!hasNext} title="suivant">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          {userRole === "admin" ? (
            <button title="modifier">
              <span className="material-symbols-outlined">edit_square</span>
            </button>
          ) : (
            <button title="ajouter un commentaire">
              <span className="material-symbols-outlined">comment</span>
            </button>
          )}

          <button onClick={closeBreveDetails} title="fermer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className={styles.breveCardHeader}>
          <div className={styles.breveIcon}>
            <span className="material-symbols-outlined">
              {getIconByCategorie(breve.categorie)}
            </span>
          </div>
          <div className={styles.breveInfo}>
            <div>
              <h3>BQSM - {breve.bqsmNumb}</h3>
              <p>{breve.date.slice(0, 10)}</p>
            </div>
            <p>{breve.categorie}</p>
            <p>
              <strong>{breve.titre}</strong>
            </p>
            <p>{breve.zone}</p>
          </div>
        </div>
        <div className={styles.breveCarroussel}>
          {pictures.length > 0 ? (
            <div>
              <button
                className={styles.previousPictureButton}
                onClick={prevPic}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <img
                src={`data:image/jpeg;base64,${pictures[current].base64}`}
                alt={pictures[current].name || "photo"}
              />
              <button className={styles.nextPictureButton} onClick={nextPic}>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <div className={styles.carouselDots}>
                {pictures.map((_, idx) => (
                  <span
                    key={idx}
                    className={`${styles.dot} ${
                      current === idx ? styles.activeDot : ""
                    }`}
                    onClick={() => setCurrent(idx)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>Veuillez ajouter des images !</p>
          )}
        </div>
        <div className={styles.breveBody}>
          <p>{breve.contenu}</p>
        </div>
        <div className={styles.breveIntervenantsBody}>
          <h3>Intervenants</h3>
          <div className={styles.breveIntervenants}>
            {intervenants.length > 0 ? (
              intervenants.map((item, index) => (
                <p
                  className={styles.intervenantLogo}
                  key={item.name + item.id + index}
                >
                  <Image
                    src={getIconByIntervenant(item.name)}
                    alt={item.name}
                    title={item.name}
                    width={90}
                    height={90}
                  />
                </p>
              ))
            ) : (
              <p>Veuillez ajouter des intervenants !</p>
            )}
          </div>
        </div>
        <div className={styles.breveContributeursBody}>
          <h3>Contributeurs</h3>
          <div className={styles.breveContributeurs}>
            {contributeurs.length > 0 ? (
              contributeurs.map((item, index) => (
                <p
                  className={styles.contributeurLogo}
                  key={item.name + item.id + index}
                >
                  <Image
                    src={getIconByContributeur(item.name)}
                    alt={item.name}
                    title={item.name}
                    width={90}
                    height={90}
                  />
                </p>
              ))
            ) : (
              <p>Veuillez ajouter des contributeurs !</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

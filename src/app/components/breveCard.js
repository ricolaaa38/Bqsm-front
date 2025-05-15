import { forwardRef } from "react";
import Link from "next/link";
import styles from "./breveCard.module.css";

function BreveCard({ item }, ref) {
  function getIconByCategorie(categorie) {
    switch (categorie) {
      case "Peche":
        return "phishing";
      case "Piraterie":
        return "skull";
      case "Drogue":
        return "cannabis";
      case "Terrorisme":
        return "bomb";
      default:
        return "info";
    }
  }

  return (
    <section className={styles.breveCard}>
      <div className={styles.breveCardBody}>
        <div className={styles.breveIcon}>
          <span className="material-symbols-outlined">
            {getIconByCategorie(item.categorie)}
          </span>
        </div>
        <div ref={ref} className={styles.breveInfo}>
          <div>
            <p>BQSM - {item.bqsmNumb}</p>
            <p>{item.date.slice(0, 10)}</p>
          </div>
          <p>{item.categorie}</p>
          <p>
            <strong>{item.titre}</strong>
          </p>
          <p>{item.zone}</p>
        </div>
      </div>
      <div className={styles.breveCardButton}>
        <Link href="#">
          <span className="material-symbols-outlined">visibility</span>lire la
          breve
        </Link>
        <Link href="#">
          <span className="material-symbols-outlined">location_on</span>Voir sur
          la carte
        </Link>
      </div>
    </section>
  );
}

export default forwardRef(BreveCard);

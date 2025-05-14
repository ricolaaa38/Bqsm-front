import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header id={styles.header}>
      <h1>
        <Link href="/">
          <span className="material-symbols-outlined">public</span>
          <p>FMS COFGC</p>
        </Link>
      </h1>
      <nav>
        <div>
          <Link href="/">
            <span className="material-symbols-outlined">home</span>
            <p>Accueil</p>
          </Link>
        </div>
        <div>
          <Link href="/profil">
            <span className="material-symbols-outlined">person</span>
            <p>Profil</p>
          </Link>
        </div>
        <div>
          <Link href="/carte">
            <span className="material-symbols-outlined">map</span>
            <p>Carte</p>
          </Link>
        </div>
        <div>
          <Link href="/fiches">
            <span className="material-symbols-outlined">folder_open</span>
            <p>Fiches d'analyse</p>
          </Link>
        </div>
        <div>
          <Link href="/" title="settings">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
        <div>
          <Link href="/" title="Déconnexion">
            <span className="material-symbols-outlined">logout</span>
            {/* <p>Deconnexion</p> */}
          </Link>
        </div>
      </nav>
    </header>
  );
}

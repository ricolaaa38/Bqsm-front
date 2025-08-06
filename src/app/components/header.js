"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

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
          <Link href="/" className={pathname === "/" ? styles.active : ""}>
            <span className="material-symbols-outlined">home</span>
            <p>Accueil</p>
          </Link>
        </div>
        {/* <div>
          <Link
            href="/profil"
            className={pathname === "/profil" ? styles.active : ""}
          >
            <span className="material-symbols-outlined">person</span>
            <p>Profil</p>
          </Link>
        </div> */}
        <div>
          <Link
            href="/carte"
            className={pathname === "/carte" ? styles.active : ""}
          >
            <span className="material-symbols-outlined">map</span>
            <p>Carte</p>
          </Link>
        </div>
        <div>
          <Link
            href="/fiches"
            className={pathname === "/fiches" ? styles.active : ""}
          >
            <span className="material-symbols-outlined">folder_open</span>
            <p>Fiches d'analyse</p>
          </Link>
        </div>
        <div>
          <Link
            href="/settings"
            title="settings"
            className={pathname === "/settings" ? styles.active : ""}
          >
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

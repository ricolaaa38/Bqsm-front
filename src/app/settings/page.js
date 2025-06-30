"use client";

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useData } from "../context/DataContext";
import { addFiltres } from "../lib/db";
import { updateFiltres, deleteFiltres } from "../lib/db";
import styles from "./page.module.css";

export default function SettingsPage() {
  const { filters, setNeedRefresh } = useData();
  const [isActive, setIsActive] = useState("");
  const categories = Array.from(new Set(filters.map((item) => item.categorie)));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showNewFilterForm, setShowNewFilterForm] = useState(false);
  const [showUpdateFilterBtn, setShowUpdateFilterBtn] = useState(false);
  const [showDeleteFilterBtn, setShowDeleteFilterBtn] = useState(false);
  const [menuState, setMenuState] = useState("closed");

  const toggleShowBtns = () => {
    if (menuState === "open") {
      setMenuState("closing");
      setTimeout(() => setMenuState("closed"), 400);
    } else {
      setMenuState("open");
    }
  };

  const openMenu = () => {
    if (menuState === "closed") {
      setMenuState("open");
    }
  };

  const closeMenu = () => {
    if (menuState === "open") {
      setMenuState("closing");
      setTimeout(() => {
        setMenuState("closed");
      }, 400);
    }
  };

  useEffect(() => {
    if (filters.length > 0 && !selectedCategory) {
      setSelectedCategory(filters[0].categorie);
      setIsActive(filters[0].categorie);
    }
  }, [filters]);

  const handleAddFilter = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFilter = {
      name: formData.get("name"),
      categorie: selectedCategory,
    };
    await addFiltres(newFilter);
    setNeedRefresh((prev) => !prev);
  };

  const handleUpdateFilter = async (e, filterId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedFilter = {
      id: filterId,
      name: formData.get("name"),
      categorie: selectedCategory,
    };
    await updateFiltres(updatedFilter);
    setNeedRefresh((prev) => !prev);
  };

  const handleDeleteFilter = async (filterId) => {
    await deleteFiltres(filterId);
    setNeedRefresh((prev) => !prev);
  };

  return (
    <section className={styles.settingsPage}>
      <Header />
      <div className={styles.settingsContains}>
        <h2>Paramètres</h2>
        <div className={styles.categoriesBtns}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsActive(cat);
              }}
              className={isActive === cat ? styles.active : ""}
            >
              {cat}
            </button>
          ))}
          <div className={styles.fabContainer}>
            <div
              className={styles.fabHoverZone}
              onClick={toggleShowBtns}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <button className={`${styles.fabMain} ${styles[menuState]}`}>
                <span className="material-symbols-outlined">spoke</span>
              </button>

              {menuState !== "closed" && (
                <div className={`${styles.fabMenu} ${styles[menuState]}`}>
                  <button
                    className={styles.fabItem}
                    onClick={() => {
                      setShowNewFilterForm(!showNewFilterForm);
                      setShowUpdateFilterBtn(false);
                      setShowDeleteFilterBtn(false);
                    }}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button
                    className={styles.fabItem}
                    onClick={() => {
                      setShowUpdateFilterBtn(!showUpdateFilterBtn);
                      setShowNewFilterForm(false);
                      setShowDeleteFilterBtn(false);
                    }}
                  >
                    <span className="material-symbols-outlined">autorenew</span>
                  </button>
                  <button
                    className={styles.fabItem}
                    onClick={() => {
                      setShowUpdateFilterBtn(false);
                      setShowNewFilterForm(false);
                      setShowDeleteFilterBtn(!showDeleteFilterBtn);
                    }}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ul className={styles.filtersList}>
          <li className={styles.spacer}></li>
          {filters
            .filter((item) => item.categorie === selectedCategory)
            .map((item) => (
              <li key={item.id} className={styles.filterItem}>
                <span className={styles.nameWithDot}>{item.name}</span>
                {showUpdateFilterBtn && (
                  <form
                    className={styles.updateForm}
                    onSubmit={(e) => handleUpdateFilter(e, item.id)}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="nom du filtre"
                      required
                    />
                    <button type="submit">Modifier</button>
                  </form>
                )}
                {showDeleteFilterBtn && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteFilter(item.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </li>
            ))}
          {showNewFilterForm && (
            <li className={styles.newFilterForm}>
              <form onSubmit={handleAddFilter}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom du filtre"
                  required
                />
                <button type="submit">Ajouter</button>
              </form>
            </li>
          )}
          <li className={styles.spacer}></li>
        </ul>
      </div>
      <Footer />
    </section>
  );
}

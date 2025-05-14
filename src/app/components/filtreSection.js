"use client";

import styles from "./filtreSection.module.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext";

export default function FiltreSection() {
  const [dateRange, setDateRange] = useState([]);
  const [zone, setZone] = useState("");
  const [categorie, setCategorie] = useState("");
  const [intervenant, setIntervenant] = useState("");
  const [contributeur, setContributeur] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { filters, setActiveFilters } = useData();
  const containerRef = useRef(null);
  const filterCategories = [
    { id: "zone", label: "ZONE", state: zone, setState: setZone },
    {
      id: "categorie",
      label: "CATEGORIE",
      state: categorie,
      setState: setCategorie,
    },
    {
      id: "intervenant",
      label: "INTERVENANT",
      state: intervenant,
      setState: setIntervenant,
    },
    {
      id: "contributeur",
      label: "CONTRIBUTEUR",
      state: contributeur,
      setState: setContributeur,
    },
  ];

  useEffect(() => {
    setActiveFilters({
      zone,
      categorie,
      intervenant,
      contributeur,
      startDate: dateRange[0] ? dateRange[0].toISOString() : undefined,
      endDate: dateRange[1] ? dateRange[1].toISOString() : undefined,
    });
  }, [zone, categorie, intervenant, contributeur, dateRange, setActiveFilters]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       containerRef.current &&
  //       !containerRef.current.contains(event.target) &&
  //       !document.querySelector(".flatpickr-calendar")?.contains(event.target)
  //     ) {
  //       if (dateRange.length === 0) {
  //         setIsActive(false);
  //       }
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [dateRange]);

  const resetFilter = () => {
    setDateRange([]);
    setZone("");
    setCategorie("");
    setIntervenant("");
    setContributeur("");
  };

  return (
    <section id={styles.filtreSection}>
      <span
        className="material-symbols-outlined"
        onClick={resetFilter}
        title="reset filter"
      >
        refresh
      </span>
      <label
        ref={containerRef}
        htmlFor="dateRange"
        className={
          dateRange.length === 0 || !isActive
            ? styles.labelFilter
            : styles.labelFilterActive
        }
        onMouseDown={() => setIsActive(true)}
      >
        <p>BQSM</p>
        <Flatpickr
          id="dateRange"
          options={{
            mode: "range",
            dateFormat: "d/m/Y",
            closeOnSelect: false,
            onOpen: () => setIsActive(true),
            onClose: () => setIsActive(false),
          }}
          value={dateRange}
          onChange={(selectedDates) => {
            setDateRange(selectedDates);
          }}
        />
      </label>

      {filterCategories.map((category) => (
        <select
          key={category.id}
          id={category.id}
          name={category.id}
          className={styles.selectFilter}
          onChange={(e) => category.setState(e.target.value)}
          value={category.state}
        >
          <option value="" disabled>
            {category.label}
          </option>
          {filters
            .filter((item) => item.categorie === category.id)
            .map((item, index) => (
              <option key={index + item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      ))}
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import styles from "./page.module.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import FiltreSection from "../components/filtreSection";
import BreveSection from "../components/breveSection";

export default function Carte() {
  const mapRef = useRef(null);
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [261845, 6250561],
        zoom: 5,
      }),
    });
    mapRef.current = map;
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div id={styles.cartePage}>
      <Header />
      <FiltreSection />
      <div className={styles.bodyCartePage}>
        <div id="map" className={styles.mapContainer}></div>
        <div className={styles.breveSectionContainer}>
          <BreveSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

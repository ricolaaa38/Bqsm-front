"use client";

import styles from "./breveSection.module.css";
import { useData } from "../context/DataContext";
import { useCallback, useRef } from "react";
import BreveCard from "./breveCard";

export default function BreveSection() {
  const { breves, loadMoreBreves, hasMore } = useData();
  const observer = useRef();

  const lastBreveRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreBreves();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMoreBreves]
  );

  console.log(breves);
  return (
    <section id={styles.breveSection}>
      <div className={styles.breveSectionTitle}>
        <h4>Résumé des brèves</h4>
        <p>Nombre breves : {breves.totalElements}</p>
      </div>
      <div className={styles.brevesCards}>
        {breves.content?.map((item, index) => {
          if (index === breves.content.length - 1) {
            return (
              <BreveCard
                ref={lastBreveRef}
                key={`${index}.${item.id}`}
                item={item}
              />
            );
          } else {
            return <BreveCard key={`${index}.${item.id}`} item={item} />;
          }
        })}
      </div>
    </section>
  );
}

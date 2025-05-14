"use client";

import styles from "./breveSection.module.css";
import { useData } from "../context/DataContext";
import { useCallback, useRef } from "react";

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
      <div className={styles.brevesCards}>
        {breves.content?.map((item, index) => {
          if (index === breves.content.length - 1) {
            return (
              <p ref={lastBreveRef} key={`${index}.${item.id}`}>
                {item.date}, {item.titre}
              </p>
            );
          } else {
            return (
              <p key={`${index}.${item.id}`}>
                {item.date}, {item.titre}
              </p>
            );
          }
        })}
      </div>
    </section>
  );
}

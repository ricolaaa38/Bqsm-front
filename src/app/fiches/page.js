import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./page.module.css";

export default function Fiches() {
  return (
    <div id={styles.fichesPage}>
      <Header />
      <h2>Page des fiches d'analyse</h2>
      <Footer />
    </div>
  );
}

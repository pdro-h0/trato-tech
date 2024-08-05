import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import styles from "./styles.module.scss";
import Footer from "../footer";

const DefaultLayout = () => (
  <div className={styles.container}>
    <Navbar />

    <div className={styles["container-outlet"]}>
      <Outlet />
    </div>

    <Footer />
  </div>
);

export default DefaultLayout;

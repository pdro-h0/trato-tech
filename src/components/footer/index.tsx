import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import styles from "./styles.module.scss";

const iconsProps = {
  color: "white",
  size: 24,
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <FaFacebook {...iconsProps} />
        <FaTwitter {...iconsProps} />
        <FaInstagram {...iconsProps} />
      </div>

      <span>Desenvolvido por Pedro.</span>
    </footer>
  );
};

export default Footer;

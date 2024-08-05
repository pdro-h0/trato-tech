import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface HeaderWithImageProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  children?: ReactNode;
}

const HeaderWithImage = ({
  description,
  image,
  title,
  className,
  children
}: HeaderWithImageProps) => {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles["header-texto"]}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {children}
      </div>

      <div className={styles["header-imagem"]}>
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default HeaderWithImage;

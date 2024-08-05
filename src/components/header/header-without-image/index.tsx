import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface HeaderWithoutImageProps {
  title: string;
  description: string;
  children: ReactNode
}

const HeaderWithoutImage = ({
  title,
  description,
  children
}: HeaderWithoutImageProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>{title}</h1>

      <h2 className={styles.descricao}>{description}</h2>

      {children}
    </div>
  );
};

export default HeaderWithoutImage;

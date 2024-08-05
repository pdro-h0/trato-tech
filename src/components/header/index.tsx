import { ReactNode } from "react";
import HeaderWithImage from "./header-with-image";
import HeaderWithoutImage from "./header-without-image";
import styles from "./styles.module.scss";

interface HeaderProps {
  title: string;
  description: string;
  className?: string;
  image?: string;
  children?: ReactNode;
}

const Header = ({
  className = "",
  description,
  title,
  image,
  children,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      {title && image && (
        <HeaderWithImage
          description={description}
          image={image}
          title={title}
          className={className}
        >
          {children}
        </HeaderWithImage>
      )}

      {title && !image && (
        <HeaderWithoutImage description={description} title={title}>
          {children}
        </HeaderWithoutImage>
      )}
    </header>
  );
};

export default Header;

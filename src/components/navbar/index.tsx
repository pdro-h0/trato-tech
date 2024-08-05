/// <reference types="vite-plugin-svgr/client" />

import styles from "./styles.module.scss";
import Logo from "../../assets/logo.svg?react";
import classNames from "classnames";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import Search from "../search";
import { Link, useLocation, useNavigate } from "react-router-dom";

const iconsProps = {
  color: "white",
  size: 24,
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} onClick={() => navigate("/")} />

      <div className={styles.links}>
        <div>
          <Link
            to="/"
            className={classNames(styles.link, {
              [styles.selected]: location.pathname === "/",
            })}
          >
            Página Inicial
          </Link>
        </div>
      </div>

      <div className={styles.busca}>
        <Search />
      </div>

      <div className={styles.icones}>
        <Link to="/carrinho">
          {window.location.pathname === "/carrinho" ? (
            <RiShoppingCartFill {...iconsProps} />
          ) : (
            <RiShoppingCart2Line {...iconsProps} />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

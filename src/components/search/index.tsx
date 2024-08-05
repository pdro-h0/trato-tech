import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { changeSearch, resetSearch } from "../../store/slices/search";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";

const Search = () => {
  const search = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(resetSearch());
  }, [location.pathname, dispatch]);

  return (
    <div className={styles.busca}>
      <input
        type="text"
        placeholder="O que você procura"
        className={styles.input}
        value={search}
        onChange={(ev) => dispatch(changeSearch(ev.target.value))}
      />
    </div>
  );
};

export default Search;

import Header from "../../components/header";
import styles from "./styles.module.scss";
import clock from "../../assets/inicial.png";
import { useNavigate } from "react-router-dom"; 
import { useAppDispatch, useAppSelector } from "../../store";
import Button from "../../components/button";
import { searchCategory } from "../../store/slices/categories";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate()

  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(searchCategory())
  }, [dispatch]);

  return (
    <div>
      <Header
        className={styles.header}
        description="Compre diversos tipos de produtos no melhor site do Brasil!"
        image={clock}
        title="Classificados Tech"
      >
        <Button onClick={() => navigate("/anuncie")}>Quero anunciar</Button>
      </Header>
      <div className={styles.categorias}>
        <div className={styles["categorias-title"]}>
          <h1>Categorias</h1>
        </div>

        <div className={styles["categorias-container"]}>
          {categories.map((category, index) => (
            <div key={index} onClick={() => navigate(`/categoria/${category.id}`)}>
              <img src={category.thumbnail} alt={category.nome} />
              <h1>{category.nome}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

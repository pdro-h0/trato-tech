import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../store";
import Item from "../../components/item";
import Button from "../../components/button";
import { useEffect } from "react";
import { fetchData } from "../../store/slices/itens";

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { category, itens } = useAppSelector((state) => {
    const category = state.categories.find(
      (category) => category.id === categoryId! || {}
    );
    const itens = state.itens.filter(
      (item) =>
        item.categoria === categoryId &&
        item.titulo.toLowerCase().includes(state.search)
    );

    return { category, itens };
  });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (!category) return;
 
  return (
    <div>
      <Header
        description={category.descricao}
        image={category.header}
        title={category.nome}
        className=""
      >
        <Button onClick={() => navigate(`/anuncie/${categoryId}`)}>
          Quero anunciar
        </Button>
      </Header>

      <div className={styles.itens}>
        {itens.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Category;

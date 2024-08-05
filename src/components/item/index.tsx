import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiOutlineHeart,
} from "react-icons/ai";
import styles from "./styles.module.scss";
import { FaCartPlus } from "react-icons/fa6";
import { changeFavorite, changeItem, deleteItem } from "../../store/slices/itens";
import { changeCart, changeQuantity } from "../../store/slices/cart";
import { useAppDispatch, useAppSelector } from "../../store";
import classNames from "classnames";
import { useState } from "react";
import { Input } from "../input";

interface itemProps {
  id: number;
  titulo: string;
  descricao: string;
  foto: string;
  favorito: boolean;
  preco: number;
  categoria: string;
  carrinho: boolean;
  quantity: number;
}

const iconProps = {
  size: 24,
  color: "#041833",
};

const quantityProps = {
  size: 32,
  color: "#1875e8",
};

const Item = (props: itemProps) => {
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(props.titulo);
  const dispatch = useAppDispatch();

  const handleFavorite = () => {
    dispatch(changeFavorite(props.id));
  };

  const handleCart = () => {
    dispatch(changeCart(props.id));
  };

  interface IHandleChangeQuantity {
    id: number;
    quantity: number;
  }
  const handleIncreaseQuantity = ({ id, quantity }: IHandleChangeQuantity) => {
    dispatch(
      changeQuantity({
        id,
        quantity,
      })
    );
  };

  const handleDecreaseQuantity = ({ id, quantity }: IHandleChangeQuantity) => {
    dispatch(
      changeQuantity({
        id,
        quantity,
      })
    );

    if (props.quantity - 1 <= 0) {
      handleCart();
    }
  };

  const isOnCart = useAppSelector((state) =>
    state.cart.some((itemOnCart) => itemOnCart.id === props.id)
  );

  const EditModeComponent = () => (
    <>
      {isOnEditMode ? (
        <AiOutlineCheck
          {...iconProps}
          className={styles["item-acao"]}
          onClick={() => {
            setIsOnEditMode(false);
            console.log(props.id);
            dispatch(
              changeItem({
                id: props.id,
                item: { title: newTitle },
              })
            );
          }}
        />
      ) : (
        <AiFillEdit
          {...iconProps}
          className={styles["item-acao"]}
          onClick={() => setIsOnEditMode(true)}
        />
      )}
    </>
  );

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: props.carrinho === true,
      })}
    >
      <AiFillCloseCircle
        {...iconProps}
        className={`${styles["item-acao"]} ${styles["item-deletar"]}`}
        onClick={() => dispatch(deleteItem(props.id))}
      />
      <div className={styles["item-imagem"]}>
        <img src={props.foto} alt={props.titulo} />
      </div>

      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          {isOnEditMode ? (
            <Input
              type="text"
              value={newTitle}
              onChange={(ev) => setNewTitle(ev.target.value)}
            />
          ) : (
            <h2>{newTitle}</h2>
          )}
          <p>{props.descricao}</p>
        </div>

        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>
            R$ {props.preco.toFixed(2)}
          </div>

          <div className={styles["item-acoes"]}>
            {props.favorito ? (
              <AiFillHeart
                {...iconProps}
                color="#ff0000"
                className={styles["item-acao"]}
                onClick={handleFavorite}
              />
            ) : (
              <AiOutlineHeart
                {...iconProps}
                className={styles["item-acao"]}
                onClick={handleFavorite}
              />
            )}

            {props.carrinho ? (
              <div className={styles.quantidade}>
                Quantidade:
                <AiFillMinusCircle
                  onClick={() =>
                    handleDecreaseQuantity({
                      id: props.id,
                      quantity: -1,
                    })
                  }
                  {...quantityProps}
                />
                <span>{String(props.quantity).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  onClick={() =>
                    handleIncreaseQuantity({
                      id: props.id,
                      quantity: +1,
                    })
                  }
                  {...quantityProps}
                />
              </div>
            ) : (
              <>
                <FaCartPlus
                  {...iconProps}
                  color={isOnCart ? "#1875e8" : iconProps.color}
                  className={styles["item-acao"]}
                  onClick={handleCart}
                />
                <EditModeComponent />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

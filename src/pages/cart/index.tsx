import Button from "../../components/button";
import Header from "../../components/header";
import Item from "../../components/item";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetCart } from "../../store/slices/cart";
import { itensInitialState } from "../../store/slices/itens";
import styles from "./styles.module.scss";

interface itensReduce extends itensInitialState {
  quantity: number;
}

const Cart = () => {
  const dispatch = useAppDispatch()

  const { cartReduce, total} = useAppSelector((state) => {
    let total = 0
    const cartReduce = state.cart.reduce((itens: itensReduce[], itenOnCart) => {
    const regexp = new RegExp(state.search, "i");

      const item = state.itens.find((item) => item.id === itenOnCart.id);
      total += (item?.preco * itenOnCart.quantity) || 0
      if(item?.titulo.match(regexp)){
        itens.push({
          ...item!,
          quantity: itenOnCart.quantity,
        });
      }

      return itens;
    }, []);

    return {
      cartReduce,
      total
    };
  });

  const handleResetCart = () =>{
    dispatch(resetCart())
  }

  return (
    <div>
      <Header
        description="Confira os produtos que você adicionou ao carrinho"
        title="Carrinho de compras"
        image=""
      />

      <div className={styles.carrinho}>
        {cartReduce.map((item) => (
          <Item key={item.id} {...item} carrinho />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>

          <span>
            Subtotal: <strong>R$ {total.toFixed(2)}</strong>
          </span>
        </div>
        <Button onClick={handleResetCart}>Finalizar compra</Button>
      </div>
    </div>
  );
};

export default Cart;

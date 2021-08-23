import styles from "../styles/Cart.module.scss";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  console.log(cart);

  if (!cart.length > 0) {
    return (
      <>
        <div className={styles.svg}>
          <img src="./images/emptyCart.svg" alt="" />
        </div>
        <h1 className={styles.noItem}>Currently there is No items in Cart !</h1>
      </>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}

export default Cart;

import styles from "../styles/Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GrClose } from "react-icons/Gr";
import { removeFromCart, saveToLocalStorage } from "../Redux/Actions/Cart";
import { useEffect, useState } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const cart2 = useSelector((state) => state);
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
  console.log(cart2);
  useEffect(() => {
    setstate(cart);
  }, []);
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    dispatch(saveToLocalStorage());
  };

  if (!cart) {
    return <h1>Loading</h1>;
  }

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
    <section className={styles.cart}>
      <div className={styles.cartHeader}>
        <h2>Your Order From</h2>
        <img src="/images/logo.png" alt="cakespot logo" />
      </div>
      <div className={styles.wrapper}>
        {cart.map((item) => {
          return (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.countArea}>
                <AiOutlinePlus />
                <span className={styles.itemNos}>1</span>
                <AiOutlineMinus />
              </div>
              <p className={styles.price}>
                <span>₹ </span>
                {item.price}
              </p>
              <GrClose onClick={() => handleRemoveFromCart(item)} />
            </div>
          );
        })}
        <div className={styles.subtotal}>
          <div>
            <h3>Subtotal</h3>
            <h3>
              <span>₹ </span> 200
            </h3>
          </div>
          <div>
            <h3>Shipping</h3>
            <h3>
              <span>₹ </span> N/A
            </h3>
          </div>
          <div>
            <h3>Total</h3>
            <h3>
              <span>₹ </span> 200
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;

import styles from "../styles/Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GrClose } from "react-icons/Gr";
import { removeFromCart, setUpLocalStorage } from "../Redux/Actions/Cart";
import backendAxios from "../helpers/backendAxios";
import { useState } from "react";
import router from "next/router";

function Cart() {
  const state = useSelector((state) => state);
  const [buyNowError, setbuyNowError] = useState(null);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    if (state.user.user) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(setUpLocalStorage("REMOVE_FROM_LOCAL_CART", item));
      return dispatch(setUpLocalStorage("SAVE_TO_LOCAL_STORAGE", item));
    }
  };

  const handleCheckout = async () => {
    try {
      setbuyNowError("Loading ...");
      const res = await backendAxios.post("checkoutCart", {});
      router.push(res.data.url);
    } catch (error) {
      setbuyNowError("Something Went Wrong");
      console.log(error.message);
    }
  };

  if (!state.cart.items.length > 0) {
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
        {state.cart.items.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              <img src={item.image || item.images[0].url} alt={item.title} />
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
        <div className={styles.checkout}>
          <button onClick={handleCheckout}>Checkout</button>
          <p>{buyNowError ? buyNowError : ""}</p>
        </div>
      </div>
    </section>
  );
}

export default Cart;

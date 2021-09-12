import styles from "../styles/Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GrClose } from "react-icons/Gr";
import {
  removeFromCart,
  setUpLocalStorage,
  addToCart,
} from "../Redux/Actions/Cart";
import backendAxios from "../helpers/backendAxios";
import { useState } from "react";
import { useRouter } from "next/router";

function Cart() {
  const state = useSelector((state) => state);
  const [buyNowError, setbuyNowError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveFromCart = (item, removeAll) => {
    if (state.user.user) {
      if (removeAll) {
        dispatch(removeFromCart(item, false));
      } else {
        dispatch(removeFromCart(item, true));
      }
    } else {
      dispatch(setUpLocalStorage("REMOVE_FROM_LOCAL_CART", item));
      return dispatch(setUpLocalStorage("SAVE_TO_LOCAL_STORAGE", item));
    }
  };

  const handleQuantity = (item) => {
    dispatch(addToCart(item, false));
  };

  const handleCheckout = async () => {
    if (!state.user.user) {
      return router.push("/SignIn");
    }
    try {
      setbuyNowError("Loading ...");
      const res = await backendAxios.post("checkoutCart", {});
      router.push(res.data.url);
    } catch (error) {
      setbuyNowError("Something Went Wrong");
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
              {state.user.user ? (
                <div className={styles.countArea}>
                  <AiOutlinePlus onClick={() => handleQuantity(item)} />
                  <span className={styles.itemNos}>
                    {item.quantity ? item.quantity : 0}
                  </span>
                  <AiOutlineMinus
                    onClick={() => handleRemoveFromCart(item, true)}
                  />
                </div>
              ) : (
                ""
              )}

              <p className={styles.price}>
                <span>₹ </span>
                {item.price}
              </p>
              <GrClose onClick={() => handleRemoveFromCart(item, false)} />
            </div>
          );
        })}
        <div className={styles.subtotal}>
          {/* <div>
            <h3>Subtotal</h3>
            <h3>
              <span>₹</span>
              {state.cart.items.reduce((acc, item) => acc.price + item.price)}
            </h3>
          </div> */}
          <div style={{ display: "block" }}>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Shipping, Total and GST will be calculated in next page.
            </p>
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

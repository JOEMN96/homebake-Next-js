import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadLocalStorage, loadCart } from "../Redux/Actions/Cart";
import { isUserLoggedIn } from "../Redux/Actions/User";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(loadCart());
  }, []);

  return (
    <main>
      <Navbar router={router} />
      <div>{children}</div>
      <Footer />

      <style jsx>{`
        div {
          min-height: 98vh;
        }
      `}</style>
    </main>
  );
}

export default Layout;

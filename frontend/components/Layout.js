import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../Redux/Actions/User";
import { setUpLocalStorage } from "../Redux/Actions/Cart";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(isUserLoggedIn());
    if (!user) {
      dispatch(setUpLocalStorage("GET_FORM_LOCAL_STORAGE", null));
    } else {
      dispatch(setUpLocalStorage("STOP_LOADING_LOCAL_STORAGE", null));
    }
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

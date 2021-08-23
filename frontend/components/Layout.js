import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loadLocalStorage } from "../Redux/Actions/Cart";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalStorage());
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

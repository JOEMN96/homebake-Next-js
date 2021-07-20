import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();

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

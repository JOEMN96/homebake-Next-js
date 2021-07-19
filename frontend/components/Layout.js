import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <main>
      <Navbar />
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

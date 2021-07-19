import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />

      <style jsx>{``}</style>
    </main>
  );
}

export default Layout;

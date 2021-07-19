import React from "react";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Avatar } from "antd";
import styles from "../styles/Navbar.module.scss";

function Navbar() {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/">
          <a>HomeBake</a>
        </Link>
        <ul className="websiteRelated">
          <li>
            <Link href="/">Cakes</Link>
          </li>
          <li>
            <Link href="/">Surprise Packs</Link>
          </li>
          <li>
            <Link href="/">Blog</Link>
          </li>
          <li>
            <Link href="/d">About</Link>
          </li>
        </ul>

        <ul className="userRelated">
          <li>
            <Link href="/">
              <BsBag />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Avatar size={42} icon={<AiOutlineUser />} />
            </Link>
          </li>
          {/* <li>
            <Link href="/"></Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

import React from "react";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Avatar } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a className="logo">Cake Spot</a>
        </Link>
        <ul className="websiteRelated">
          <li>
            <Link href="/">Cakes</Link>
          </li>
          <li>
            <Link href="/">Surprise Packs</Link>
          </li>
          <li>
            <Link href="/Blog">Blog</Link>
          </li>
          <li>
            <Link href="/d">About</Link>
          </li>
        </ul>

        <ul className="userRelated">
          <li>
            <Link className="cart" href="/">
              <a>
                <BsBag size={26} />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <Avatar size={26} icon={<AiOutlineUser />} />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

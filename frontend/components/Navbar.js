import React from "react";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import { Avatar } from "antd";
import { Drawer, Button } from "antd";
import styles from "../styles/Navbar.module.scss";

class Navbar extends React.Component {
  state = { visible: false, placement: "left" };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { placement, visible } = this.state;

    return (
      <>
        <Drawer
          title="Cake Spot"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
          <ul className={styles.websiteRelatedSideMenu}>
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
        </Drawer>
        <header>
          <nav>
            <Link href="/">
              <a className="logo">Cake Spot</a>
            </Link>
            <ul className="websiteRelated">
              <li
                className={
                  this.props.router.pathname == "/Cakes" ? "navActive" : ""
                }
              >
                <Link href="/Cakes">Cakes</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/Packs" ? "navActive" : ""
                }
              >
                <Link href="/Packs">Surprise Packs</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/Blog" ? "navActive" : ""
                }
              >
                <Link href="/Blog">Blog</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/About" ? "navActive" : ""
                }
              >
                <Link href="/About">About</Link>
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
              <li className="sidebarToggle">
                <Button onClick={this.showDrawer}>
                  <HiMenuAlt4 size={26} />
                </Button>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default Navbar;

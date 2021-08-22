import React from "react";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import { Avatar } from "antd";
import { Drawer, Button } from "antd";
import styles from "../styles/Navbar.module.scss";
import { connect } from "react-redux";

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
              <Link href="/Cakes">Cakes</Link>
            </li>
            <li>
              <Link href="/SurprisePacks">Surprise Packs</Link>
            </li>
            <li>
              <Link href="/Deserts">Deserts</Link>
            </li>
            <li>
              <Link href="/Blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/Gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/About">About</Link>
            </li>
            <li>
              <Link href="/Contact">Contact Us</Link>
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
                  this.props.router.pathname == "/SurprisePacks"
                    ? "navActive"
                    : ""
                }
              >
                <Link href="/SurprisePacks">Surprise Packs</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/Deserts" ? "navActive" : ""
                }
              >
                <Link href="/Deserts">Deserts</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/Blogs" ? "navActive" : ""
                }
              >
                <Link href="/Blogs">Blogs</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/About" ? "navActive" : ""
                }
              >
                <Link href="/About">About</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/Gallery" ? "navActive" : ""
                }
              >
                <Link href="/Gallery">Gallery</Link>
              </li>
              <li
                className={
                  this.props.router.pathname == "/Contact" ? "navActive" : ""
                }
              >
                <Link href="/Contact">Contact US</Link>
              </li>
            </ul>

            <ul className="userRelated">
              <li style={{ position: "relative" }}>
                <Link className="cart" href="/Cart">
                  <a>
                    <BsBag size={26} />
                    <span className={styles.cartLen}>
                      {this.props.cart.length}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/Profile">
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

const mapStateToProps = (state) => ({ cart: state.cart.items });

export default connect(mapStateToProps, null)(Navbar);

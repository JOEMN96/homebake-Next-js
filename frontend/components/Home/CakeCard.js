import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/Actions/Cart";

const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <AiOutlineArrowRight
      style={{
        verticalAlign: "sub",
        marginTop: "1px",
        fontSize: "18px",
        marginLeft: "2px",
      }}
    />
  );
});

function CakeCard({ cake }) {
  const { title, price, images, id } = cake;
  const [addedToCart, setAddedTOCart] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const alreadyInCart = cart.find((item) => item.id == id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (alreadyInCart) {
      setAddedTOCart(true);
    }
  }, []);

  const handleCart = () => {
    setAddedTOCart(!addedToCart);
    if (addedToCart) {
      dispatch(removeFromCart({ id }));
    } else {
      dispatch(addToCart({ title, price, image: images[0].url, id, count: 0 }));
    }
  };

  return (
    <article>
      <div
        style={{
          backgroundImage: `url(${images[0].url})`,
        }}
        className="img"
      ></div>

      <div className="content">
        <div className="flex2">
          <h2>
            <Link href={"/Cake/" + id}>
              <a> {title}</a>
            </Link>
          </h2>
          <button className="viewBtn">
            <Link href={"/Cake/" + id}>
              <a>
                <MyButton />
              </a>
            </Link>
          </button>
        </div>

        <div className="flex">
          <div>
            <p>
              <span style={{ fontFamily: "cursive" }}>₹ </span>
              {price}
            </p>
          </div>
          <div onClick={() => handleCart(addedToCart)}>
            <a className="addToCart">
              {addedToCart ? (
                <MdRemoveShoppingCart />
              ) : (
                <RiShoppingCartLine className="arrow" />
              )}
            </a>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .img {
            height: 250px;
            width: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            border-radius: 10px 10px 0 0;
          }

          .content {
            padding:10px;
          }

          h2 {
            padding-top: 20px;
            color: black;
          }
          h2:hover {
            color: #49a159;c
            cursor:pointer;
          }
          p {
            font-size: 17px;
            font-weight: 500;
            color: #254053;
            margin-bottom: 3px;
          }
          .addToCart {
            color: #254053;
            padding: 8px 13px;
            border-radius: 10px;
            font-size:26px;
          }
          .addToCart:hover {
            color: #cecece;
            transition: all 0.2s ease-in;
            font-size:30px;
          }
          article {
            border-radius: 10px;
            max-width: 280px;
            margin: 20px;
            box-shadow: 5px 20px 30px rgba(0,0,0,0.2)
          }
       
          .flex {
            display: flex;
            justify-content: space-between;
            align-items:center;
            height:40px;
          }
          .flex2 {
            display: flex;
            justify-content: space-between;
            align-items:center;
          }
          .viewBtn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #cecece;
            cursor:pointer;
          }

          .arrow  {
            vertical-align: sub;
            margin-top: 4px;
            font-size: 18px;
            margin-left: 2px;
          }

          .viewBtn:hover {
            color: #49A159;
            border-color: #49A159;
            transition: all 0.2s ease-in;
          }

        
        `}
      </style>
    </article>
  );
}

export default CakeCard;

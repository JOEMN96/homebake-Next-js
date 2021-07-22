import React from "react";
import Link from "next/link";
import { FaBolt } from "react-icons/Fa";

function CakeCard({ title, price }) {
  return (
    <article>
      <div className="img">
        <img src="/cake.jpg" alt={title + " cakeSpot"} />
      </div>
      <h2>{title}</h2>

      <p style={{ marginBottom: "12px" }}>
        <FaBolt color="gold" /> trending no 1
      </p>
      <div className="flex">
        <div>
          <p>Price</p>
          <p>₹ {price}</p>
        </div>
        <div>
          <Link href="/">
            <a>Add to cart</a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          h2 {
            padding-top: 20px;
            color: black;
          }
          p {
            font-size: 17px;
            font-weight: 500;
            color: #888888;
            margin-bottom: 3px;
          }
          a {
            color: black;
            font-weight: 500;
            border: 1px solid #cecece;
            padding: 8px 13px;
            border-radius: 10px;
          }
          article {
            border: 1px solid #cecece;
            border-radius: 20px;
            max-width: 250px;
            margin: 20px;
            padding: 10px;
          }
          img {
            max-width: 200px;
          }
          .img {
            text-align: center;
          }
          .flex {
            display: flex;
            justify-content: space-between;
          }
          svg {
            color: gold;
          }
        `}
      </style>
    </article>
  );
}

export default CakeCard;

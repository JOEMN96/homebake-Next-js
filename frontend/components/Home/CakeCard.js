import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBolt } from "react-icons/Fa";

function CakeCard({ title, price, img, index }) {
  return (
    <article>
      <div className="img">
        <Image
          width={200}
          height={220}
          src={`${process.env.CMSDOMAIN}${img}`}
          alt={title}
        />
      </div>
      <h2>{title}</h2>

      <p style={{ marginBottom: "12px" }}>
        <FaBolt color="gold" /> Trending at {index == 0 ? 1 : index + 1}
      </p>
      <div className="flex">
        <div>
          <p>Price</p>
          <p>₹ {price}</p>
        </div>
        <div>
          <Link href="/">
            <a className="addToCart">Add to cart</a>
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
          .addToCart {
            color: black;
            font-weight: 500;
            border: 1px solid #cecece;
            padding: 8px 13px;
            border-radius: 10px;
          }
          .addToCart:hover {
            border: 1px solid black;
            color: #cecece;
            transition: all 0.4s ease;
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

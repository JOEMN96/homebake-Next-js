import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import { FcCalendar } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillRead } from "react-icons/ai";

function BlogsCard({ blog }) {
  const { title, description, showCaseImage, createdAt, id, author } = blog;
  return (
    <article className="blogCard">
      <div className="img">
        <img src={`${showCaseImage.url}`} alt={title} />
      </div>

      <div className="contents">
        <h2>
          <Link href={`/Blog/${id}`}>
            <a>{title}</a>
          </Link>
        </h2>

        <p>{description}</p>
        <div className="icons">
          <FcCalendar />
          <Moment format="MMMM Do YYYY" date={createdAt}></Moment>
          <AiOutlineUser />
          <p style={{ display: "inline-block", marginBottom: 0 }}>{author}</p>
        </div>
        <button>
          <AiFillRead size={17} />
          <Link href={`/Blog/${id}`}>
            <a>Read More </a>
          </Link>
        </button>
      </div>

      <style jsx>
        {`
          article {
            display: flex;
            border: 2px solid #f2f2f2;
            border-radius: 8px;
            width: 100%;
          }
          .img {
            width: 50%;
          }
          .img img {
            width: 100%;
            height: 100%;
          }
          .contents {
            padding: 5px 10px;
            flex-basis: 50%;
          }
          h2 {
            font-family: "Roboto Slab", serif;
            font-weight: medium;
          }
          .icons {
            display: flex;
            align-items: center;
          }
          .icons > svg {
            margin-left: 10px;
          }

          time {
            padding: 7px;
          }
          p {
            text-align: justify;
          }
          button {
            display: flex;
            align-items: center;
            padding: 4px 8px 4px 12px;
            margin: 8px auto;
            border-radius: 4px;
            border: 2px solid currentColor;
            color: black;
            background: none;
            cursor: pointer;
            font-weight: bold;
          }
          button:hover {
            color: #49a159;
            border-color: #49a159;
            transition: all 0.5 ease;
          }
        `}
      </style>
    </article>
  );
}

export default BlogsCard;

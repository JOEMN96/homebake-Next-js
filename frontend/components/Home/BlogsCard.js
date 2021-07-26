import React from "react";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";

function BlogsCard({ blog }) {
  const { title, description, showCaseImage, created_at, id } = blog;
  return (
    <article>
      <div className="img">
        <Image
          width={200}
          height={220}
          src={`${process.env.CMSDOMAIN}${showCaseImage.url}`}
          alt={title}
        />
      </div>

      <h2>
        <Link href={`/Blog/${id}`}>
          <a>{title}</a>
        </Link>
      </h2>

      <p>{description}</p>
      <p>
        <Moment format="D-MMMM-YYYY" date={created_at}></Moment>
      </p>

      <style jsx>
        {`
          h2 {
            padding-top: 20px;
            color: black;
          }
          p {
            font-size: 14px;
            font-weight: 400;
            color: #888888;
            margin-bottom: 3px;
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
        `}
      </style>
    </article>
  );
}

export default BlogsCard;

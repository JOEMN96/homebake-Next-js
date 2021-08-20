import React from "react";
import { useQuery } from "react-query";
import axios from "../helpers/Axios";
import { Row, Col, Spin } from "antd";
import BlogsCard from "../components/Home/BlogsCard";

const fetchBlogs = async () => {
  const res = await axios.get("blogs");
  const data = await res.data;
  return data;
};

function Blog() {
  const { data, status } = useQuery("blogs", fetchBlogs);

  if (status == "loading") {
    return <Spin wrapperClassName="loader" size="large" />;
  }
  return (
    <div>
      <section className="blogPageHeader"></section>
      <div className="titleWrapper">
        <h1 className="headings">News</h1>
        <h2>Blogs</h2>
      </div>

      {status == "error" && (
        <h1 style={{ textAlign: "center" }}>
          Currently there is No Product available Available
        </h1>
      )}
      <Row>
        {status == "success" &&
          data.map((blog) => {
            return (
              <Col key={blog.id} xs={24} sm={12} md={6} lg={8} xl={8}>
                <BlogsCard blog={blog} />
              </Col>
            );
          })}
      </Row>
      <style jsx>
        {`
          .blogPageHeader {
            background-image: url(/images/blogHeader.svg);
            background-position: center center;
            background-size: auto;
            background-repeat: no-repeat;
          }
          .blogPageHeader {
            height: 40vh;
          }
        `}
      </style>
    </div>
  );
}

export default Blog;

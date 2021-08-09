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
  console.log(data);

  return (
    <div>
      <section className="blogPageHeader"></section>
      <h1>Blogs</h1>
      {status == "loading" && <Spin wrapperClassName="loader" size="large" />}
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

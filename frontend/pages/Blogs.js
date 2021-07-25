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
      <h1>Blogs</h1>
      {status == "loading" && <Spin wrapperClassName="loader" size="large" />}
      <Row>
        {status == "success" &&
          data.map((blog) => {
            return (
              <Col key={blog.id}>
                <BlogsCard blog={blog} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default Blog;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

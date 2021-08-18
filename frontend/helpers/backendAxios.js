import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2000/",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
  crossDomain: true,
});

instance.defaults.withCredentials = true;

export default instance;

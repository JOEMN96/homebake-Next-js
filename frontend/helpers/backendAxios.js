import axios from "axios";

const instance = axios.create({
  baseURL: "https://cakespotbackend.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  crossDomain: true,
});

// instance.defaults.withCredentials = true;

export default instance;

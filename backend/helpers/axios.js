import axios from "axios";

const instance = axios.create({
  baseURL: "https://cakespotcms.herokuapp.com/",
});

export default instance;

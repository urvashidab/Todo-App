import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-app-r6ke.onrender.com/api",
});

export default API;

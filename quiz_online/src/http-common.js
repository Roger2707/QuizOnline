import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9597",
  headers: {
    "Content-type": "application/json"
  }
});
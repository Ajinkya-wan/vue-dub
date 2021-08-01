import axios from "axios";

export default axios.create({
  baseURL: "http://13.232.221.164:8081",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
  },
});

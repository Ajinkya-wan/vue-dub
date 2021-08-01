import axios from "axios";

console.log(
  JSON.parse(localStorage.getItem("user")),
  "ddddddddddddddddaaaaaaaaaaaaaaaaaaaaaa"
);
export default axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
  },
});

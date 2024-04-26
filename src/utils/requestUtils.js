import axios from "axios";
// https://3.70.166.110:3000
const client = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export { client };

import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true, //gửi cookie nếu có và gửi đến backend url
});

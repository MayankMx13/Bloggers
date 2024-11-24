import axios from "axios";

const apiReq = axios.create({
  baseURL: "https://bloggers-j9hw.onrender.com",
  withCredentials: true,
});

export default apiReq;

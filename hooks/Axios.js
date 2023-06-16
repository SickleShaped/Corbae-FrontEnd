import axios from "axios";
import Cookies from "js-cookie";

const axiosprotect = axios.create({
  withCredentials: true,
});

axiosprotect.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + Cookies.get("jwt");
  return config;
});

export default axiosprotect;

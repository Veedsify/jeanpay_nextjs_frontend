import { API_BASE } from "@/constants/api";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export { axiosClient };

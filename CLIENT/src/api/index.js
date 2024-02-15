import axios from "axios"
import { useSelector } from "react-redux";

export const instance = axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
    },
})

export const createPrivateInstance = () => {
  const { token } = useSelector((state) => state.auth);

  return axios.create({
    baseURL: import.meta.env.VITE_IMG_FILE,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



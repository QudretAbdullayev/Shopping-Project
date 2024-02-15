import { instance } from "./index"

export const reg = async (registerObj) => {
    const registerData = await instance.post("auth/local/register", registerObj);
    return registerData.data;
};

export const login = async (loginObj) => {
    const loginData = await instance.post("auth/local", loginObj);
    return loginData.data;
};


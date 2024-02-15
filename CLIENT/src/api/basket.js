import axios from "axios";

export const updateUserBasket = async ({ userId, token, updatedBasket,updatedTotal }) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_IMG_FILE}/api/users/${userId}`,
      { basket: updatedBasket, basketcount: updatedTotal },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const getProfileData = async (userId, token) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_IMG_FILE}/api/users/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log({ error });
    return null; // or handle the error as needed
  }
};
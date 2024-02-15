import { instance } from "./index"
export const getProducts = async () =>{
    const productData = await instance.get("/products?populate=*")
    return productData.data
}

export const getOneProducts = async (id) => {
    const productData = await instance.get(`products/${id}/?populate=*`);
    return productData.data;
};

export const getCategories = async () =>{
    const categoryData = await instance.get("/categories?populate=*")
    return categoryData.data
}

export const getArticles = async () =>{
    const articlesData = await instance.get("/articles?populate=*")
    return articlesData.data
}

export const getSliders = async () =>{
    const slidersData = await instance.get("/favorite-products?populate=*")
    return slidersData.data
}
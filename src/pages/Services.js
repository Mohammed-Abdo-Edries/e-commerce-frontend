import axios from 'axios'
import { url } from "../http-common"

export const getDress = async () => {
    const { data } = await axios.get(`${url}/product/`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                category: "dress"
            }
        });
    return data;
};
export const getPants = async () => {
    const { data } = await axios.get(`${url}/product/`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                category: "pants"
            }
        });
    return data;
}
export const getShirts = async () => {
    const { data } = await axios.get(`${url}/product/`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                category: "shirt"
            }
        });
    return data;
}
export const getShoes = async () => {
    const { data } = await axios.get(`${url}/product/`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                category: "shoes"
            }
        });
    return data;
}
export const getAllProducts = async () => {
    const { data } = await axios.get(`${url}/product/suggestions`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    return data;
}
export const getSearch = async (itemName) => {
    const { data } = await axios.get(`${url}/product/search`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                name: itemName
            }
        });
    return data;
}
export const deleteAllProudcts = async (email) => {
    const response = await axios.delete(`${url}/product/deleteAllProudcts`,
        Headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                category: "dress",
                email
            }
        });
    return response;
}
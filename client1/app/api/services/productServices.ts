import { apiClient } from "../axios/base";

interface Product {
    name: string;
}

export const getProducts = async () => {
    const response = await apiClient.get("/api/products");
    return response.data;
};

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/api/product/${id}`);
    return response.data;
};

export const createProduct = async (name: string) => {
    const response = await apiClient.post("/api/product", { name });
    return response.data;
};

export const updateProduct = async (id: string, data: Product) => {
    const response = await apiClient.put(`/api/product/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await apiClient.delete(`/api/product/${id}`);
    return response.data;
};
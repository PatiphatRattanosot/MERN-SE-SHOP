import api from "./api";
const API_URL = "/product";

const getAll = async () => await api.get(`${API_URL}`);

const createProduct = async (data) => {
  
  const response = await api.post(`${API_URL}/`, data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

const ProductService = {
  getAll,
  createProduct,
};
export default ProductService;

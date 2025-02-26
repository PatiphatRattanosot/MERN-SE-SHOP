import api from "./api";
const API_URL = "/product";

const getAll = async () => await api.get(`${API_URL}`);

const createProduct = async (data) => {
  const response = await api.post(`${API_URL}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const deleteProduct = async (id) => await api.delete(`${API_URL}/${id}`);

const updateProduct = async (id, product) => {
  return await api.put(`${API_URL}/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getProductById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const ProductService = {
  getAll,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};
export default ProductService;

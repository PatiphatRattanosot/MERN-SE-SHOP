import api from "./api";
const API_URL = "";

const getAll = async () => await api.get(`${API_URL}/product.json`);

const ProductService = {
  getAll,
};
export default ProductService;

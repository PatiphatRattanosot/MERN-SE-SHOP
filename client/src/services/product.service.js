import api from "./api";
const API_URL = "/product";

const getAll = async () => await api.get(`${API_URL}`);

const ProductService = {
  getAll,
};
export default ProductService;

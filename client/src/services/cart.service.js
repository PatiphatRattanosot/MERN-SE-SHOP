import api from "./api";
const API_URL = "/cart";

const createCartItem = async (cartItem) =>
  await api.post(`${API_URL}/`, cartItem);

const getAllCartItem = async () => await api.get(`${API_URL}/`);

const getCartItemByEmail = async (email) =>
  await api.get(`${API_URL}/${email}`);

const updateCartItem = async (id) => await api.put(`${API_URL}/${id}`);

const deleteCartItem = async (id) => await api.delete(`${API_URL}/${id}`);

const clearCartByEmail = async (email) =>
  await api.delete(`${API_URL}/clear/${email}`);

const CartServices = {
  createCartItem,
  getAllCartItem,
  getCartItemByEmail,
  updateCartItem,
  deleteCartItem,
  clearCartByEmail,
};
export default CartServices;

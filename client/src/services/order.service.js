import api from './api'
const API_URL = "/order"

const getOrders = async () => await api.get(`${API_URL}`)

const getOrderById = async (id) => await api.get(`${API_URL}/${id}`)

const getOrderByEmail = async (email) => await api.get(`${API_URL}?email=${email}`)

const updateOrder = async (id, order) => await api.put(`${API_URL}/${id}`, order)

const deleteOrder = async (id) => await api.delete(`${API_URL}/${id}`)

const OrderServices = {
    getOrders,
    getOrderById,
    getOrderByEmail,
    updateOrder,
    deleteOrder
}

export default OrderServices;
import api from "./api";
const API_URL = "/stripe";

const createCheckoutSession = async (email, cart) => {
  return await api.post(`${API_URL}/create-checkout-session`, email, cart);
};

const StripeServices = {
  createCheckoutSession,
};

export default StripeServices;

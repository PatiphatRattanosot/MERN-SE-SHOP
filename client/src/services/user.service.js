import api from "./api";
const API_URL = "/user";

const sign = async (email) => {
  const response = await api.post(`${API_URL}/sign`, { email });
  return response;
};

const addUser = async (email) => await api.post(`${API_URL}/add`, { email });

const UserService = {
  sign,
  addUser,
};
export default UserService;

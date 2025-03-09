import api from "./api";
const API_URL = "/user";

const sign = async (email) => {
  const response = await api.post(`${API_URL}/sign`, { email });
  return response;
};

const addUser = async (email) => await api.post(`${API_URL}/add`, { email });

const getAllUsers = async () => await api.get(`${API_URL}/`);

const updateUser = async (id, user) => await api.put(`${API_URL}/${id}`, user);

const deleteUser = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }

}

const makeAdmin = async (email) => await api.patch(`${API_URL}/admin/${email}`);

const makeUser = async (email) => await api.patch(`${API_URL}/user/${email}`);

const UserService = {
  sign,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  makeAdmin,
  makeUser,
};
export default UserService;

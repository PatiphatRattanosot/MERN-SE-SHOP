import React from "react";
import UserService from "../../services/user.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await UserService.getAllUsers();
      setUsers(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async () => {};

  const handleToggleChange = async (e, email) => {
    if (e.target.checked) {
      await UserService.makeAdmin(email);
    }
    if (e.target.checked === false) {
      await UserService.makeUser(email);
    }
  };

  const handleEdit = (product) => {
    setCurrentUser(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.updateUser(currentUser._id, currentUser);
      const updatedProducts = users.map((user) =>
        user._id === user._id ? user : user
      );
      setUsers(updatedProducts);
      Swal.fire({
        icon: "success",
        title: "User updated successfully",
        timer: 1500,
      });
      handleModalClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };
  console.log(users);

  return (
    <div>
      <nav className="bg-gray-100 p-3 rounded mb-4">
        <ol className="list-reset flex text-grey-dark">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Manage Items</li>
        </ol>
      </nav>
      <h1 className="text-2xl font-semibold mb-4 text-center">Manage Users</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td className="flex items-center space-x-2">
                <span>User</span>
                <input
                  type="checkbox"
                  className="toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
                  defaultChecked={user.role === "admin"}
                  onClick={(e) => handleToggleChange(e, user?.email)}
                />
                <span>Admin</span>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit()}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleModalSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleModalChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description:</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={currentUser.description}
                  onChange={handleModalChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price:</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={currentUser.price}
                  onChange={handleModalChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category:</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleModalChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Users;

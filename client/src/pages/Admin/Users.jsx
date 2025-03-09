import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await UserService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await UserService.deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire("Deleted!", "User has been deleted successfully.", "success");
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire("Error!", "Failed to delete user.", "error");
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await UserService.updateUser(user._id, {
        email: user.email,
        role: newRole,
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? { ...u, role: newRole } : u))
      );
      Swal.fire("Updated!", `User role changed to ${newRole}.`, "success");
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error!", "Failed to update user role.", "error");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4 text-left">Manage Users</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          className="p-2 border border-gray-300 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-lg font-medium">Total Users: {filteredUsers.length}</span>
      </div>
      <table className="table w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">#</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Role</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id} className="border border-gray-300">
              <td className="p-2 border border-gray-300">{index + 1}</td>
              <td className="p-2 border border-gray-300">{user.email}</td>
              <td className="p-2 border border-gray-300 flex items-center space-x-2">
                <span>User</span>
                <input
                  type="checkbox"
                  className="toggle border-blue-500 bg-blue-500"
                  checked={user.role === "admin"}
                  onChange={() => handleToggleRole(user)}
                />
                <span>Admin</span>
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import OrderServices from "../../services/order.service";
import OrderDetailsModal from "../../components/OrderDetailModal";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await OrderServices.getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order); // ✅ เปิด Modal
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await OrderServices.deleteOrder(orderId);
        setOrders(orders.filter((order) => order._id !== orderId));
        Swal.fire("Deleted!", "Order has been deleted.", "success");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderServices.updateOrder(orderId, { delivery_status: newStatus });
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, delivery_status: newStatus }
                : order
            )
          );
          Swal.fire("Updated!", "Order status has been updated.", "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };


  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by email"
          className="border px-3 py-2 rounded w-80"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <FaSearch />
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Delivery Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border p-2">
                {order._id.slice(0, 4)}...{order._id.slice(-4)}
              </td>
              <td className="border p-2">{order.email}</td>
              <td className="border p-2">
                ฿{order.total ? (order.total / 100).toLocaleString() : "0.00"}
              </td>
              <td className="border p-2 font-bold text-white">
                <span
                  className={`px-3 py-1 rounded ${order.payment_status === "paid"
                    ? "bg-green-500"
                    : "bg-rose-600"
                    }`}
                >
                  {order.payment_status}
                </span>
              </td>
              <td className="border p-2">
                <select
                  className="border px-2 py-1 rounded"
                  value={order.delivery_status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>

              <td className="border p-2 flex justify-center gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleViewOrder(order)}
                >
                  <FaEye />
                </button>
                <button
                  className="bg-rose-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default ManageOrders;

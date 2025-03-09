import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const ManageItem = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getAll();
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (minPrice) {
      filtered = filtered.filter((item) => item.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((item) => item.price <= parseFloat(maxPrice));
    }

    setFilteredItems(filtered);
  }, [search, category, minPrice, maxPrice, items]);

  const handleDeleteItem = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ProductService.deleteProduct(id);
          Swal.fire("Deleted!", "Your item has been deleted.", "success");

          setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error?.message || "Error deleting item",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // ✅ ดึงหมวดหมู่ที่ไม่ซ้ำจาก items
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Items</h2>

      {/* ✅ Filter Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-full sm:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full sm:w-auto"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded w-full sm:w-auto"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded w-full sm:w-auto"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* ✅ Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">${item.price}</td>
                  <td className="px-4 py-2 border-b">{item.category}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => console.log("Edit item:", item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItem;

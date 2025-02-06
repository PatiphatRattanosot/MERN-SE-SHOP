import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import CartServices from "../../services/cart.service";
import useCart from "../../hooks/useCart";
import { FaTrashCan } from "react-icons";

const index = () => {
  const { user } = useContext(AuthContext);
  const handleClearCart = async () => {
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
        const response = await CartServices.clearCartByEmail(user?.email);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: response?.message,
        });
      }
    });
  };

  const handleDeleteItem = async () => {};

  const handleIncrease = async () => {};

  const handleDecrease = async () => {};
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-red font-semibold text-white">
            <th>#</th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {cart.length > 0 &&
            cart.map((cartItem, index) => (
              <tr key={cartItem.id || index}>
                <td>{index + 1}</td>
                <td>{cartItem.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            cartItem.image ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cartItem.name}</div>
                      <div className="text-sm opacity-50">
                        {cartItem.description}
                      </div>
                    </div>
                  </div>
                </td>
                <div className="flex items-center">
                  <button className="btn btn-xs" onClick={handleDecrease}>
                    -
                  </button>
                  <span className="mx-2">{cartItem.quantity}</span>
                  <button className="btn btn-xs" onClick={handleIncrease}>
                    +
                  </button>
                </div>
                <td>${cartItem.price}</td>
                <td>${cartItem.quantity * cartItem.price}</td>
                <button onClick={() => handleDeleteItem(cartItem)}>
                  <FaTrashCan />
                </button>
              </tr>
            ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default index;
